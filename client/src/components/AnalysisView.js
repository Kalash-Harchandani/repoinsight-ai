import React, { useEffect, useState } from 'react';

const Typewriter = ({ text, speed = 15 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <div style={{ whiteSpace: 'pre-wrap' }}>
      {displayedText}
      {index < text.length && <span className="typewriter-cursor"></span>}
    </div>
  );
};

const AnalysisView = ({ repoUrl, question, setQuestion, handleQuery, querying, answer }) => {
  const [summaryRequested, setSummaryRequested] = useState(false);

  const getRepoName = (url) => {
    if (!url) return '';
    const parts = url.replace(/\/$/, '').split('/');
    if (parts.length >= 2) {
      return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
    }
    return url;
  };

  const repoName = getRepoName(repoUrl);

  useEffect(() => {
    if (repoUrl && !answer && !querying && !summaryRequested) {
      setSummaryRequested(true);
      handleQuery('Give me a high-level technical summary of this repository, its architecture, and main purpose.');
    }
  }, [repoUrl, answer, querying, summaryRequested, handleQuery]);

  return (
    <div className="analysis-layout animate">
      {/* Left Panel: AI Responses */}
      <div className="chat-panel">
        <div className="message-bubble message-ai">
          <h3 style={{ marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--primary)', letterSpacing: '1px' }}>
            {repoUrl ? `ANALYSIS: ${repoName}` : 'SYSTEM'}
          </h3>
          {querying ? (
            <div className="animate">Thinking...</div>
          ) : answer ? (
            <Typewriter text={answer} />
          ) : (
            <div>{repoUrl ? 'Initializing analysis...' : 'Please link a repository on the Home page to begin.'}</div>
          )}
        </div>
      </div>

      {/* Right Panel: User Input */}
      <div className="query-panel">
        <div className="card">
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Ask anything</h2>
          <input 
            type="text" 
            placeholder="Search code logic..." 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
          />
          <button 
            className="btn-primary" 
            style={{ marginTop: '1.5rem', width: '100%' }} 
            onClick={() => handleQuery()}
            disabled={querying || !repoUrl}
          >
            {querying ? 'Searching...' : 'Ask AI'}
          </button>

          <div className="pill-container" style={{ marginTop: '2rem' }}>
            {['Architecture', 'API Flow', 'Tech Stack'].map((q) => (
              <div key={q} className="pill" onClick={() => handleQuery(q)}>{q}</div>
            ))}
          </div>
        </div>

        {!repoUrl && (
          <div className="card-minimal" style={{ textAlign: 'center', opacity: 0.7 }}>
            Link a repo to unlock indexing.
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisView;
