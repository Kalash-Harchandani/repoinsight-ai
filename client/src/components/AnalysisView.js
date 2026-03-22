import React from 'react';

const AnalysisView = ({ question, setQuestion, handleQuery, querying, answer }) => {
  return (
    <div className="query-container animate">
      <h1>Ask your codebase.</h1>
      <p style={{ marginBottom: '4rem' }}>Your repository is indexed and ready. What exactly would you like to know?</p>

      <div className="card">
        <input 
          type="text" 
          placeholder="Ask a technical question..." 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button 
          className="btn-primary" 
          style={{ marginTop: '1.5rem', width: 'auto' }} 
          onClick={() => handleQuery()}
          disabled={querying}
        >
          {querying ? 'Searching...' : 'Ask AI'}
        </button>

        <div className="pill-container">
          {['General Overview', 'Installation Guide', 'Architecture Flow', 'API Endpoints'].map((q) => (
            <div key={q} className="pill" onClick={() => handleQuery(q)}>{q}</div>
          ))}
        </div>
      </div>

      {answer && (
        <div className="answer-box animate">
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', color: '#fff', letterSpacing: '1px' }}>AI RESPONSE</h3>
          <div style={{ whiteSpace: 'pre-wrap' }}>{answer}</div>
        </div>
      )}
    </div>
  );
};

export default AnalysisView;
