import React from 'react';

const HomeView = ({ repoUrl, setRepoUrl, handleIndex, indexing, indexed }) => {
  return (
    <div className="content-wrapper animate">
      <svg className="bg-octocat" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
      </svg>
      
      <div className="home-grid">
        <div>
          <h1>Understand any codebase at a glance.</h1>
          <p style={{ maxWidth: '580px' }}>
            Stop digging through thousands of lines of code. Let AI index your repository 
            and answer your most complex technical questions instantly.
          </p>
          
          <div className="card" style={{ marginTop: '3rem', maxWidth: '480px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Connect Repository</h2>
            {indexed && <div className="status-badge" style={{ color: '#10b981', marginBottom: '1rem', fontSize: '0.9rem' }}>✓ Repository Synced</div>}
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

        <div className="card">
          <h2 style={{ fontSize: '1.4rem', marginBottom: '2rem' }}>How it helps</h2>
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#fff' }}>1. Sync your repo</h3>
            <p style={{ fontSize: '1rem' }}>We crawl every folder and file to understand the architecture.</p>
          </div>
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#fff' }}>2. AI Analysis</h3>
            <p style={{ fontSize: '1rem' }}>We build a secure, private brain for your repository that understands logic.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#fff' }}>3. Chat & Ask</h3>
            <p style={{ fontSize: '1rem' }}>Ask complex technical questions and get instant, accurate logic.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
