import { GoogleGenAI } from "@google/genai";
import { Pinecone } from "@pinecone-database/pinecone";

// 🔹 Lazy initialization helpers
let genAI;
let pc;

const getGenAI = () => {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in environment variables.");
    }
    genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return genAI;
};

const getPC = () => {
  if (!pc) {
    if (!process.env.PINECONE_API_KEY) {
      throw new Error("PINECONE_API_KEY is not set in environment variables.");
    }
    pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  }
  return pc;
};

/**
 * Queries the codebase in Pinecone and generates an answer using Gemini.
 * @param {string} question - The user's question.
 * @param {string} namespace - The Pinecone namespace for the repository.
 * @returns {Promise<string>} - The generated answer from Gemini.
 */
export const queryCodebase = async (question, namespace = "default") => {
  try {
    const pinecone = getPC();
    const index = pinecone.index(process.env.PINECONE_INDEX || "repoinsight");
    const ai = getGenAI();

    console.log(`🔍 Querying codebase for: "${question}" in namespace: ${namespace}`);

    // 1. Generate embedding for the question
    const embedResponse = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: question,
      config: {
        outputDimensionality: 768,
      },
    });
    const questionEmbedding = embedResponse.embeddings[0].values;

    // 2. Search Pinecone for context
    const queryResponse = await index.namespace(namespace).query({
      vector: questionEmbedding,
      topK: 10,
      includeMetadata: true,
    });

    if (queryResponse.matches.length === 0) {
      return "I couldn't find any relevant code in this repository to answer your question.";
    }

    const context = queryResponse.matches
      .map((match) => `File: ${match.metadata.path}\nContent: ${match.metadata.content}`)
      .join('\n\n---\n\n');

    // 3. Generate the final answer using Gemini
    const chatModel = 'gemini-2.5-flash-lite';
    const prompt = `
      You are "RepoMind AI", an expert software engineer assistant.
      Use the provided code context below to answer the user's question about the repository.
      
      Rules:
      - If the answer isn't in the context, say "I don't have enough information in this codebase to answer that accurately."
      - Use markdown for code snippets and formatting.
      - Be concise but thorough.

      USER QUESTION: ${question}

      CODE CONTEXT:
      ${context}
    `;

    const result = await ai.models.generateContent({
      model: chatModel,
      contents: prompt
    });

    return result.candidates[0].content.parts[0].text;

  } catch (error) {
    console.error('❌ Error during query:', error);
    throw new Error(`Failed to query codebase: ${error.message}`);
  }
};
