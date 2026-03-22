import { cloneRepo } from '../services/githubService.js';
import { crawlRepo } from '../services/crawlerService.js';
import { indexCodebase } from '../services/embeddingService.js';
import { queryCodebase } from '../services/queryService.js';
import crypto from 'crypto';

/**
 * Helper to generate a consistent namespace from a repo URL
 */
const getNamespace = (repoUrl) => {
  return crypto.createHash('sha256').update(repoUrl).digest('hex').substring(0, 16);
};

/**
 * POST /api/index
 * Body: { repoUrl }
 */
export const indexRepository = async (req, res) => {
  const { repoUrl } = req.body;

  if (!repoUrl) {
    return res.status(400).json({ error: 'repoUrl is required' });
  }

  try {
    const namespace = getNamespace(repoUrl);
    
    // 1. Clone
    const repoPath = await cloneRepo(repoUrl);
    
    // 2. Crawl
    const files = await crawlRepo(repoPath);
    
    // 3. Index
    await indexCodebase(files, undefined, namespace);

    res.status(200).json({
      message: 'Repository indexed successfully',
      namespace,
      fileCount: files.length
    });
  } catch (error) {
    console.error('Indexing Error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/query
 * Body: { repoUrl, question }
 */
export const askQuestion = async (req, res) => {
  const { repoUrl, question } = req.body;

  if (!repoUrl || !question) {
    return res.status(400).json({ error: 'repoUrl and question are required' });
  }

  try {
    const namespace = getNamespace(repoUrl);
    const answer = await queryCodebase(question, namespace);

    res.status(200).json({ answer });
  } catch (error) {
    console.error('Query Error:', error);
    res.status(500).json({ error: error.message });
  }
};
