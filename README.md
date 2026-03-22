![Untitled design](https://github.com/user-attachments/assets/53492140-0420-4fcf-9c77-b70435edda83)



# RepoInsight AI ⚡
### RAG-powered Code Intelligence System

<p>
  <img src="https://skillicons.dev/icons?i=react,nodejs,express,tailwind,docker,aws,vercel" />
</p>

<p>
  <img src="https://img.shields.io/badge/Pinecone-Vector_Search-111827?style=for-the-badge" />
  
</p>

</div>

---

## 🧠 Overview

**RepoInsight AI** is a high-performance, full-stack system that transforms GitHub repositories into **searchable, explainable knowledge systems** using **Retrieval-Augmented Generation (RAG)**.

By combining **semantic vector search (Pinecone)** with **LLM reasoning (Google Gemini)**, it enables developers to explore unfamiliar codebases through natural language — reducing onboarding time and improving architectural understanding.

---

## ✨ Key Features

### 🧩 RepoMind AI
- Conversational interface for interacting with repositories  
- Explains code logic, architecture, and relationships  
- Context-aware responses using retrieval + LLM reasoning  

### 🔍 Semantic Code Search
- Top-k similarity search over embedded code chunks  
- Accurate, context-rich answers across entire repositories  

### ⚡ Live Repository Indexing
- Clones and processes public GitHub repositories  
- Generates embeddings in seconds for instant querying  

### 🎯 Modern Interface
- Clean, responsive React frontend  
- Dark-first UI with smooth UX  

### 🚀 Production Deployment
- Backend hosted on AWS EC2  
- Frontend deployed via Vercel for global performance  

---

## 🚀 Technical Highlights

- **End-to-End RAG Pipeline**  
  Integrated Pinecone vector retrieval with Gemini-based reasoning for contextual outputs  

- **Optimized Embedding Pipeline**  
  Intelligent chunking strategy for improved semantic relevance  

- **Low-Latency Querying**  
  Fast top-k retrieval + efficient response generation  

- **Scalable Architecture**
  Routes → Controllers → Services → Utils


---

## ⚙️ Tech Stack

### Frontend
- React.js  
- Tailwind CSS  
- Vercel  

### Backend & AI
- Node.js  
- Express.js  
- Google Gemini API (`@google/genai`)  
- Pinecone (Vector Database)  
- AWS EC2  

### Tooling
- simple-git  
- dotenv  
- cors  

---

## 📊 System Architecture

```text
User Query
 ↓
RepoMind AI (Gemini)
 ↓
Retrieve Context (Pinecone Top-K)
 ↓
Augmented Prompt
 ↓
LLM Response (Context-aware)
