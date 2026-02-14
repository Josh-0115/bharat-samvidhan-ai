# 🇮🇳⚖️ Bharat Samvidhan AI — Constitutional Legal Assistant

Bharat Samvidhan AI is a MERN-based AI legal assistant that helps users understand Indian constitutional and statutory laws through structured AI responses.

The application allows users to ask legal queries, receive guided legal insights, and view their query history after authentication.

This project demonstrates full-stack development + AI integration + prompt engineering.

## 🚀 Project Overview
Bharat Samvidhan AI provides:

AI-powered legal consultation

Structured legal reasoning based on Indian law

User authentication and query history

Constitutional rights awareness

Practical legal action recommendations

The system uses custom prompt engineering to simulate a professional legal consultation experience.

## 🧠 Prompt Engineering (Key Innovation)

The AI is guided using a customized system prompt where it behaves as:

“Bharat Samvidhan AI” — Senior Advocate of the Supreme Court of India

AI Response Structure

### The AI follows a structured consultation process:

✅ Client Understanding

Acknowledges user situation

Uses simple and clear language

✅ Legal Analysis

Statutory Framework → IPC, CrPC, CPC, Contract Law, etc.

Constitutional Perspective → Fundamental Rights (Articles 14, 19, 21)

Strategic Roadmap → FIR, legal notice, civil suit, writ petition

### This ensures:

Consistent responses

Better accuracy

Clear legal guidance

Real-world usability

## ✨ Features

🤖 AI legal query system

⚖️ Constitutional and statutory law guidance

🔐 User signup & login

🕘 Query history tracking

🧠 Prompt-engineered AI responses

📱 Responsive UI

## 🛠 Tech Stack
Frontend

React (Vite)
TailwindCSS

Backend

Node.js
Express.js
Database
MongoDB

AI Integration

Google Gemini API

### 📁 Project Structure
```
bharat-samvidhan-ai
│
├── backend        → Express server + API routes
├── frontend       → React UI (Vite + Tailwind)
└── README.md
```
## ⚙️ Run Project Locally

Follow these steps to run the project on your system.

✅ Prerequisites

Install:
```
Node.js (v18+)

npm

MongoDB (local or Atlas)

Git
```
1️⃣ Clone Repository
```
git clone https://github.com/Josh-0115/bharat-samvidhan-ai.git
cd bharat-samvidhan-ai
```
2️⃣ Install Dependencies
Backend
```
cd backend
npm install
```
Frontend
```
cd ../frontend
npm install 
```
3️⃣ Setup Environment Variables

Create .env inside backend folder.
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_api_key
JWT_SECRET=your_secret
```
4️⃣ Start Application
Start Backend
```
cd backend
npm run dev
```
Start Frontend
```
cd frontend
npm run dev
```
5️⃣ Open in Browser
http://localhost:5173

## 🎯 Learning Outcomes

Prompt engineering for domain-specific AI

MERN stack architecture

Gemini API integration

Authentication systems

AI-driven user experience design

## 🚧 Future Improvements

Multi-language support

Voice-based legal queries

Case law database integration

RAG-based legal search

Deployment (AWS / Docker)

Admin dashboard

## ⚠️ Disclaimer

This project provides general legal information for educational purposes only and does not replace professional legal advice.

## 🤝 Contributing

Contributions and feedback are welcome.
```
fork → clone → create branch → commit → push → pull request
```
## ⭐ Support

If you like this project, give it a ⭐ on GitHub.
