import React, { useState, useEffect } from 'react';

const HomeView = ({ repoUrl, setRepoUrl, handleIndex, indexing, indexed }) => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Understand any codebase at a glance.";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-grid animate">
      <div>
        <h1 className="typing-cursor">{displayText}</h1>
        <p style={{ maxWidth: '550px' }}>
          Stop digging through thousands of lines of code. Let AI index your repository 
          and answer your most complex technical questions instantly.
        </p>
        
        <div className="input-section">
          <input 
            type="text" 
            placeholder="GitHub Repository URL" 
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
          />
          <button className="btn-primary" onClick={handleIndex} disabled={indexing}>
            {indexing ? 'Syncing...' : 'Link Repo'}
          </button>
        </div>
        {indexed && <div className="status-badge" style={{ marginTop: '1.5rem' }}>✅ Repository synced successfully</div>}
      </div>

      <div className="card">
        <h2>How it helps</h2>
        <div className="info-item">
          <h3>Sync your repo</h3>
          <p>Paste any GitHub link. We'll crawl every folder and file to understand the architecture.</p>
        </div>
        <div className="info-item">
          <h3>AI Analysis</h3>
          <p>We build a secure, private brain for your repository that understands logic, not just text.</p>
        </div>
        <div className="info-item">
          <h3>Chat & Ask</h3>
          <p>Switch to Analysis and ask anything from "How do I add a new route?" to "Explain the auth flow."</p>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
