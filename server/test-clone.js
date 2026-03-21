import { cloneRepo } from './services/githubService.js';

const testUrl = 'https://github.com/Kalash-Harchandani/repoinsight-ai'; // Testing with your own repo!

async function runTest() {
  try {
    console.log('--- Starting Clone Test ---');
    const path = await cloneRepo(testUrl);
    console.log('✅ Success! Repo cloned to:', path);
    console.log('Check if the directory exists and has files.');
  } catch (err) {
    console.error('❌ Test Failed:', err.message);
  }
}

runTest();
