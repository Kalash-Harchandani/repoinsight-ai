import { cloneRepo } from './services/githubService.js';
import { crawlRepo } from './services/crawlerService.js';

const testUrl = 'https://github.com/Kalash-Harchandani/repoinsight-ai';

async function runFullRepoFlow() {
  try {
    console.log('--- 🚀 Starting Full Repository Flow ---');
    
    // 1. Clone the repo
    console.log(`1. Cloning repository: ${testUrl}...`);
    const repoPath = await cloneRepo(testUrl);
    console.log('✅ Clone Success! Path:', repoPath);

    // 2. Crawl the repo
    console.log('\n2. Crawling repository for relevant files...');
    const files = await crawlRepo(repoPath);
    console.log(`✅ Crawl Success! Extracted ${files.length} files.`);

    // 3. Show a sample of the results
    console.log('\n--- Sample of Extracted Files ---');
    files.slice(0, 5).forEach((f, idx) => {
      console.log(`${idx + 1}. [${f.path}] (${f.content.length} characters)`);
    });

    console.log('\n--- ✅ All Tests Passed! RepoInsight is ready for the RAG phase. ---');

  } catch (err) {
    console.error('\n❌ Flow Failed:', err.message);
  }
}

runFullRepoFlow();
