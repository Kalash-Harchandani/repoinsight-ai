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

const AnalysisView = ({ repoUrl, question, setQuestion, handleQuery, querying, messages }) => {
  const [summaryRequested, setSummaryRequested] = useState(false);
  const scrollRef = React.useRef(null);

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
    if (repoUrl && messages.length === 0 && !querying && !summaryRequested) {
      setSummaryRequested(true);
      handleQuery('Provide a concise technical summary (max 150 words) of this repository. Use strong bullet points for architecture and purpose.', true);
    }
  }, [repoUrl, messages.length, querying, summaryRequested, handleQuery]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, querying]);

  return (
    <div className="repomind-chat-container animate">
      {/* Scrollable Chat Area */}
      <div className="chat-scroll-area" ref={scrollRef}>
        {messages.length === 0 && !querying && (
          <div className="message-bubble message-ai initial-msg">
            <div className="bubble-header">RepoMind AI</div>
            <div className="bubble-content">
              {repoUrl ? 'Initializing technical analysis...' : 'Please link a repository on the Home page to start using RepoMind AI.'}
            </div>
          </div>
        )}

        {messages.filter(m => !m.hidden).map((msg, idx, filtered) => (
          <div key={idx} className={`message-bubble ${msg.role === 'ai' ? 'message-ai' : 'message-user'}`}>
            <div className="bubble-header">
              {msg.role === 'ai' ? `RepoMind AI : ${repoName}` : 'YOU'}
            </div>
            <div className="bubble-content">
              {msg.role === 'ai' && idx === filtered.length - 1 ? (
                <Typewriter text={msg.content} />
              ) : (
                <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
              )}
            </div>
          </div>
        ))}

        {querying && (
          <div className="message-bubble message-ai thinking">
            <div className="bubble-header">RepoMind AI</div>
            <div className="bubble-content animate">RepoMind is thinking...</div>
          </div>
        )}
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
