import { queryCodebase } from '../services/queryService.js';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const testUrl = 'https://github.com/Kalash-Harchandani/repoinsight-ai';
const question = "How is the namespace generated for a repository?";

async function runQueryTest() {
  try {
    console.log('--- 🤖 Starting Query Test ---');

    // 1. Re-generate the same namespace ID from the URL
    const namespace = crypto.createHash('sha256').update(testUrl).digest('hex').substring(0, 16);
    console.log(`Targeting Namespace: ${namespace}`);

    // 2. Perform the query
    const answer = await queryCodebase(question, namespace);

    console.log('\n--- 📝 AI ANSWER ---');
    console.log(answer);
    console.log('\n--- ✅ Query Test Complete ---');

  } catch (err) {
    console.error('\n❌ Query Failed:', err.message);
  }
}

runQueryTest();
