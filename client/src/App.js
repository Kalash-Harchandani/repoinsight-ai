import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import AnalysisView from './components/AnalysisView';
import Footer from './components/Footer';

const ErrorAlert = ({ message, onClose }) => (
  <div className="custom-alert-overlay">
    <div className="custom-alert-box animate-pop">
      <div className="alert-icon">⚠️</div>
      <div className="alert-title">Attention</div>
      <div className="alert-message">{message}</div>
      <button className="alert-close-btn" onClick={onClose}>Got it</button>
    </div>
  </div>
);

function App() {
  const [view, setView] = useState('home');
  const [repoUrl, setRepoUrl] = useState('');
  const [indexing, setIndexing] = useState(false);
  const [indexed, setIndexed] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [querying, setQuerying] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    document.title = view === 'home' ? 'RepoInsight | Index Repository' : 'RepoInsight | Codebase Analysis';
  }, [view]);

  const handleViewChange = (newView) => {
    if (newView === 'home' && (view === 'query' || indexed)) {
      setRepoUrl('');
      setIndexed(false);
      setQuestion('');
      setMessages([]);
    }
    setView(newView);
  };

  const handleIndex = async () => {
    if (!repoUrl) return;
    setIndexing(true);
    try {
      const response = await fetch('http://localhost:5005/api/index', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl }),
      });
      if (response.ok) {
        setIndexed(true);
        // Auto-redirect to analysis after 1 second
        setTimeout(() => setView('query'), 1000);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to index repository.');
      }
    } catch (err) {
      setError('Failed to connect to backend.');
    } finally {
      setIndexing(false);
    }
  };

  const handleQuery = async (pilledQuestion, isHidden = false) => {
    const q = pilledQuestion || question;
    if (!repoUrl || !q) return;

    // Add user message to history
    const userMessage = { role: 'user', content: q, hidden: isHidden };
    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setQuerying(true);

    try {
      const response = await fetch('http://localhost:5005/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl, question: q }),
      });
      const data = await response.json();
      
      if (response.ok) {
        // Add AI response to history
        const aiMessage = { role: 'ai', content: data.answer };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        setError(data.error || 'The AI failed to generate a response.');
      }
    } catch (err) {
      setError('Failed to query backend. Please check your connection.');
    } finally {
      setQuerying(false);
    }
  };

  return (
    <div className="App">
      <Navbar view={view} setView={handleViewChange} />

      <main className={`main-container ${view === 'home' ? 'view-home' : 'view-analysis'}`}>
        {view === 'home' ? (
          <HomeView 
            repoUrl={repoUrl} 
            setRepoUrl={setRepoUrl} 
            handleIndex={handleIndex} 
            indexing={indexing} 
            indexed={indexed} 
          />
        ) : (
          <AnalysisView 
            repoUrl={repoUrl}
            question={question} 
            setQuestion={setQuestion} 
            handleQuery={handleQuery} 
            querying={querying} 
            messages={messages} 
          />
        )}
      </main>

      <Footer />
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
    </div>
  );
}

export default App;
