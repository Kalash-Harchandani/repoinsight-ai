# RepoInsight AI: Agent Engineering (agents.md)

## 1. Overview
Stateless, retrieval-augmented intelligence pipeline transforming semantic vector search into accurate code explorations.

## 2. Pipeline
```text
[Input] Query → [RepoMind AI] → [Pinecone Top-K] → Context Window → [Gemini] → Response [Output]
```

## 3. Core Principles
- **Retrieval-First**: LLM generation strictly relies on retrieved Pinecone vector chunks. No hallucinated codebase knowledge.
- **Modular**: Embeddings, retrieval, and generation are decoupled services.
- **Stateless**: Maintains zero internal session state across generative queries; all context is newly retrieved or explicitly passed.

## 4. Key Design Decisions

| Decision | Pros | Cons |
| :--- | :--- | :--- |
| **Pinecone Vector DB** | Ultra-low latency top-K retrieval, fully managed, scalable. | Adds network dependency, pricing overhead at scale. |
| **Google Gemini API** | Strong code reasoning, large context windows (`@google/genai`). | Vendor lock-in, rate limiting. |
| **Intelligent Chunking** | Preserves semantic logic blocks during embedding. | Complex preprocessing logic required. |
| **Node.js/Express Server** | Native JS ecosystem integration, rapid iteration. | CPU bottlenecks during heavy file/text processing. |

## 5. Failure Modes & Fixes

| Failure Mode | Indicator | Fix / Mitigation |
| :--- | :--- | :--- |
| **Vector Search Miss** | Hallucinated / generic LLM response. | Increase `top-k`, tune embedding chunk size, verify Pinecone index freshness. |
| **Context Overflow** | Gemini API throws token limit error. | Summarize chunks before injection, strictly prune retrieved metadata. |
| **Rate Limiting (LLM)** | 429 Too Many Requests from Gemini/Pinecone. | Implement exponential backoff, cache frequent identical queries. |
| **Stale Indexing** | AI references outdated codebase logic. | Trigger async re-indexing process on repository synchronization. |

## 6. AI Instructions (Code Generation)
When generating or modifying code in this repository, strictly adhere to:
- **Architecture**: Enforce standard directory strictness (`Routes → Controllers → Services → Utils`).
- **Stack**: React (Frontend), Node/Express (Backend), Tailwind CSS. Target modern ES6+ / JSX syntax.
- **Logic**: Use functional programming patterns, early returns, semantic naming over excessive comments.
- **System Rules**: 
  - Fail loud and fast for missing API keys or DB abstractions.
  - Assume stateless backend environments (AWS EC2 deployment).
  - Never bypass vector search; inject all knowledge via explicit RAG retrieved context.

## 7. Light Agents

### Retrieval Agent
- **Role**: Query interpretation and semantic search execution.
- **Action**: Embeds prompt, fetches top `k` Pinecone matches. Returns sanitized context array.

### Response Agent
- **Role**: Context-aware synthesis.
- **Action**: Constructs augmented Gemini prompt. Strictly anchors output to provided semantic chunks. Rejects out-of-scope queries gracefully.
