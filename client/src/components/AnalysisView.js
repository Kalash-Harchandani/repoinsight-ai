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
    <div className="repomind-chat-container animate">
      {/* Scrollable Chat Area */}
      <div className="chat-scroll-area">
        <div className="message-bubble message-ai">
          <div className="bubble-header">
            {repoUrl ? `RepoMind AI : ${repoName}` : 'RepoMind AI'}
          </div>
          <div className="bubble-content">
            {querying ? (
              <div className="animate">RepoMind is thinking...</div>
            ) : answer ? (
              <Typewriter text={answer} />
            ) : (
              <div>{repoUrl ? 'RepoMind AI is ready. What would you like to know about this codebase?' : 'Please link a repository on the Home page to start using RepoMind AI.'}</div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Input Bar */}
      <div className="chat-input-wrapper">
        <div className="chat-input-container">
          <input 
            type="text" 
            placeholder="Ask RepoMind AI about the code..." 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
          />
          <button 
            className="chat-send-btn" 
            onClick={() => handleQuery()}
            disabled={querying || !repoUrl}
          >
            {querying ? '...' : '→'}
          </button>
        </div>
        {!repoUrl && (
          <div className="input-hint">Link a repository to enable analysis.</div>
        )}
      </div>
    </div>
  );
};

export default AnalysisView;
