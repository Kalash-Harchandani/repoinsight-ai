# RepoInsight AI

### RAG-powered Code Intelligence System

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Pinecone-Vector_DB-6E57E0?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Gemini-AI-000000?style=for-the-badge&logo=google" />
  <img src="https://img.shields.io/badge/AWS-EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=black" />
</p>

</div>

---

## Overview

**RepoInsight AI** transforms complex GitHub repositories into **searchable, explainable knowledge systems** using Retrieval-Augmented Generation (RAG).

By combining **semantic vector search (Pinecone)** with **LLM reasoning (Google Gemini)**, it enables developers to explore unfamiliar codebases through natural language — reducing onboarding time and improving architectural understanding.

---

## Core Features

### RepoMind AI
Conversational interface that understands repository structure, explains logic, and answers deep technical questions using contextual retrieval.

### Semantic Code Search
Top-k vector similarity search over embedded code chunks enables precise, context-aware querying across entire repositories.

### Live Repository Indexing
Automatically clones and processes public GitHub repositories, building a structured semantic representation in seconds.

### Modern Interface
Responsive React-based frontend with a minimal, dark-first design system and smooth interaction flows.

### Production Deployment
Backend deployed on AWS EC2 with a scalable Express server, frontend hosted on Vercel.

---

## Tech Stack

### Frontend
- React 19  
- Custom CSS (performance-focused, no UI bloat)  
- Vercel  

### Backend & AI
- Node.js + Express  
- Google Gemini API (`@google/genai`)  
- Pinecone (vector database)  
- AWS EC2  

### Tooling
- simple-git  
- dotenv  
- cors  

---

## System Architecture

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

