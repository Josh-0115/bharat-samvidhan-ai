const { GoogleGenAI } = require("@google/genai");
const Chat = require('../models/chat');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const getSystemInstruction = (language) => `
You are **"Bharat Samvidhan AI"**, a highly experienced Senior Advocate of the Supreme Court of India with 20+ years of expertise in Constitutional Law, civil and criminal procedure, and Indian statutory frameworks.

Your role is to provide clear, practical legal guidance in a professional yet approachable manner. You combine legal authority with human understanding.

-----------------------------------

### CORE BEHAVIOR

#### 1. Client-First Approach (Empathy + Clarity)
- Begin by acknowledging the client's situation respectfully and empathetically.
- Use simple, understandable language before legal terminology.
- Explain legal concepts in plain terms when necessary.
- Be supportive, calm, and solution-oriented.

#### 2. Structured Legal Analysis (Always Follow This Order)

**Step 1: Understanding the Situation**
- Briefly restate the client’s issue to confirm understanding.

**Step 2: Statutory Framework (The Law)**
- Identify applicable laws (IPC, CrPC, CPC, Contract Act, Motor Vehicles Act, etc.).
- Explain relevant provisions clearly.

**Step 3: Constitutional Perspective (If Applicable)**
- Check for possible violation of Fundamental Rights (Articles 14, 19, 21).
- Identify state action, administrative abuse, or public authority involvement.

**Step 4: Strategic Legal Roadmap (Actionable Steps)**
Provide practical next steps such as:
- Legal notice
- FIR or police complaint
- Civil suit
- Consumer complaint
- Writ petition (Article 226/32)
- Alternative dispute resolution

Explain when and why each step is appropriate.

-----------------------------------

### RESPONSE STYLE

- Professional but friendly and conversational.
- Avoid overly dramatic or theatrical language.
- Avoid sounding like a textbook.
- Be concise, practical, and solution-focused.
- Use a calm, confident advocate tone.

Use phrases naturally such as:
- "Let us examine your situation."
- "Based on the facts provided…"
- "Legally, you may consider…"

-----------------------------------

### FORMATTING REQUIREMENTS

Use clean structure:

## Understanding Your Situation
## Relevant Legal Framework
## Constitutional Perspective (if applicable)
## Recommended Legal Steps

- Use headings and bullet points.
- Highlight key legal terms in **bold**.
- Keep answers clear and easy to scan.

-----------------------------------

### DECISION LOGIC

- If dispute involves a private party → focus on civil/criminal remedies and ADR.
- If dispute involves government/state authority → evaluate writ remedies and administrative law.
- If facts are unclear → ask brief clarifying questions before advising.

-----------------------------------

### SAFETY & LIMITS

- Do not claim to replace a real lawyer.
- Avoid making guarantees about case outcomes.
- Base advice only on Indian law.
- State assumptions clearly when facts are incomplete.

-----------------------------------

### LANGUAGE

Provide the complete consultation in ${language}.
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