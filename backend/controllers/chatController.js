const { GoogleGenAI } = require("@google/genai");
const Chat = require('../models/chat');

// Initialize Gemini
// NOTE: Make sure GEMINI_API_KEY is in your .env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const getSystemInstruction = (language) => `
You are "Bharat Samvidhan AI", a Senior Advocate of the Supreme Court of India with 20+ years of constitutional expertise. 

### ADVOCOATE'S OPERATING PROTOCOL:
1. PHASE 1: FACT GATHERING (The Intake)
   - If the user's problem is vague, DO NOT give legal advice yet. 
   - Instead, say: "To provide a precise constitutional assessment, I need to clarify a few details." 
   - Ask exactly 2-3 "Discovery Questions" to identify the parties involved (State vs. Private), the specific injury, and the timeline.

2. PHASE 2: CONSTITUTIONAL ANALYSIS (The IRAC Method)
   - Once facts are gathered, provide a solution using the IRAC structure:
     - ISSUE: Summarize the core legal conflict.
     - RULE: Cite the Article (e.g., Art. 14, 19, or 21) from the provided Constitution text.
     - ANALYSIS: Connect the law to the user's specific facts.
     - CONCLUSION: Suggest the legal remedy (e.g., Filing a Writ Petition under Art. 32 or Art. 226).

3. TONE & ETIQUETTE:
   - Use professional, authoritative, and grave language. 
   - Refer to the law as "The Supreme Law of the Land."
   - Never "guess." If the Constitution is silent on a matter, refer the user to specific Statutes or Acts (like IPC/BNS or CrPC).

4. LANGUAGE: Complete the consultation in ${language}.
`;



exports.sendMessage = async (req, res) => {
  const { message, language, sessionId } = req.body;
  const userId = req.user.id;

  try {
    // 1. Generate Content from Gemini
    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction: getSystemInstruction(language),
        tools: [{ googleSearch: {} }],
      },
    });

    const text = aiResponse.text || "I couldn't process that request.";
    const groundingChunks = aiResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Extract sources if available
    const sources = groundingChunks.map((chunk) => ({
      title: chunk.web?.title || 'Source',
      uri: chunk.web?.uri || '',
    })).filter((s) => s.uri !== '');

    // 2. Save to Database
    let chat;
    const userMsgObj = { role: 'user', content: message, timestamp: new Date() };
    const aiMsgObj = { role: 'assistant', content: text, sources, timestamp: new Date() };

    if (sessionId) {
      // Append to existing chat
      chat = await Chat.findOne({ _id: sessionId, userId });
      if (chat) {
        chat.messages.push(userMsgObj, aiMsgObj);
        chat.updatedAt = Date.now();
        await chat.save();
      }
    }

    // If no session existed or session not found, create new
    if (!chat) {
      chat = new Chat({
        userId,
        title: message.substring(0, 40) + '...',
        language,
        messages: [userMsgObj, aiMsgObj]
      });
      await chat.save();
    }

    res.json({ text, sources, sessionId: chat._id, chat });

  } catch (err) {
    console.error("Gemini/DB Error:", err);
    res.status(500).json({ msg: 'Error processing request' });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};