import React from 'react';

const HomeView = ({ repoUrl, setRepoUrl, handleIndex, indexing, indexed }) => {
  return (
    <div className="home-grid animate">
      <div>
        <h1>Understand any codebase at a glance.</h1>
        <p style={{ marginBottom: '4rem', maxWidth: '600px' }}>
          Stop digging through thousands of lines of code. Let AI index your repository
          and answer your most complex technical questions instantly.
        </p>

        <div className="card">
          <h2>Connect Repository</h2>
          {indexed && <div className="status-badge">✅ Repository synced successfully</div>}
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter GitHub Repository URL"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
            />
            <button className="btn-primary" onClick={handleIndex} disabled={indexing}>
              {indexing ? 'Syncing...' : 'Link Repository'}
            </button>
          </div>
        </div>
      </div>

      <div className="card" style={{ alignSelf: 'center' }}>
        <h2>How it helps</h2>
        <div className="info-item">
          <h3>1. Sync your repo</h3>
          <p>Paste any GitHub link. We'll crawl every folder and file to understand the architecture.</p>
        </div>
        <div className="info-item">
          <h3>2. AI Analysis</h3>
          <p>We build a secure, private brain for your repository that understands logic, not just text.</p>
        </div>
        <div className="info-item">
          <h3>3. Chat & Ask</h3>
          <p>Switch to Analysis and ask anything from "How do I add a new route?" to "Explain the auth flow."</p>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
