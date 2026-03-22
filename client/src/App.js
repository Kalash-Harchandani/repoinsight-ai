import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import AnalysisView from './components/AnalysisView';
import Footer from './components/Footer';

function App() {
  const [view, setView] = useState('home');
  const [repoUrl, setRepoUrl] = useState('');
  const [indexing, setIndexing] = useState(false);
  const [indexed, setIndexed] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [querying, setQuerying] = useState(false);

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
        alert('Error: ' + data.error);
      }
    } catch (err) {
      alert('Failed to connect to backend.');
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
      
      // Add AI response to history
      const aiMessage = { role: 'ai', content: data.answer };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      alert('Failed to query backend.');
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
    </div>
  );
}

export default App;
