import simpleGit from 'simple-git';
import path from 'path';
import os from 'os';
import crypto from 'crypto';

const git = simpleGit();

/**
 * Clones a GitHub repository into a temporary directory.
 * @param {string} repoUrl - The URL of the repository to clone.
 * @returns {Promise<string>} - The path to the cloned repository.
 */
export const cloneRepo = async (repoUrl) => {
  try {
    // 1. Generate a unique ID for this folder to avoid collisions
    const uniqueId = crypto.randomBytes(4).toString('hex');
    
    // 2. Define the full path in the OS temp directory
    const tempPath = path.join(os.tmpdir(), `repoinsight-${uniqueId}`);

    console.log(`Cloning ${repoUrl} to ${tempPath}...`);

    // 3. Clone the repository
    await git.clone(repoUrl, tempPath);

    return tempPath;
  } catch (error) {
    console.error('Error cloning repo:', error);
    throw new Error('Failed to clone repository. Check the URL or your internet connection.');
  }
};
