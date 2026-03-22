import { GoogleGenAI } from "@google/genai";
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

dotenv.config();

/**
 * =========================
 * 🔧 Initialize Clients
 * =========================
 */

// Gemini (NEW SDK)
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Pinecone
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

/**
 * =========================
 * 🧠 Generate Embedding
 * =========================
 * Uses Gemini embedding model
 */
export const generateEmbedding = async (text) => {
  try {
    const response = await genAI.models.embedContent({
      model: "gemini-embedding-001", // ✅ correct model
      contents: text,              // ✅ correct format
      config: {
        outputDimensionality: 768, // ✅ match Pinecone index dimension
      },
    });

    return response.embeddings[0].values;
  } catch (error) {
    console.error("❌ Error generating embedding:", error);
    throw new Error("Failed to generate embedding.");
  }
};

/**
 * =========================
 * 📦 Index Codebase
 * =========================
 * Push embeddings into Pinecone
 */
export const indexCodebase = async (
  files,
  indexName = process.env.PINECONE_INDEX || "repoinsight",
  namespace = "default"
) => {
  try {
    const index = pc.index(indexName);
    const vectors = [];

    console.log(`🚀 Generating embeddings for ${files.length} files in namespace: ${namespace}...`);

    for (const file of files) {
      if (!file.content || file.content.trim() === "") continue;

      // 🔹 Generate embedding
      const embedding = await generateEmbedding(file.content);

      // 🔹 Unique ID (base64 of file path)
      const id = Buffer.from(file.path).toString("base64");

      vectors.push({
        id,
        values: embedding,
        metadata: {
          path: file.path,
          content: file.content.substring(0, 1000), // preview
        },
      });

      // 🔹 Batch upsert (100 vectors)
      if (vectors.length === 100) {
        await index.namespace(namespace).upsert({ records: vectors });
        vectors.length = 0;
        console.log(`✅ Upserted batch of 100 vectors to namespace: ${namespace}...`);
      }
    }

    // 🔹 Final batch
    if (vectors.length > 0) {
      await index.namespace(namespace).upsert({ records: vectors });
    }

    console.log(
      `✅ Successfully indexed ${files.length} files in Pinecone index: ${indexName} (namespace: ${namespace})`
    );
  } catch (error) {
    console.error("❌ Error indexing codebase:", error);
    throw new Error(`Failed to index codebase: ${error.message}`);
  }
};