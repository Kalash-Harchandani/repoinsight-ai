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
  const [querying, setQuerying] = useState(false);
  const [answer, setAnswer] = useState('');

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
        setTimeout(() => setView('query'), 1500);
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

  const handleQuery = async (pilledQuestion) => {
    const q = pilledQuestion || question;
    if (!repoUrl || !q) return;
    setQuerying(true);
    try {
      const response = await fetch('http://localhost:5005/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl, question: q }),
      });
      const data = await response.json();
      setAnswer(data.answer);
    } catch (err) {
      alert('Failed to query backend.');
    } finally {
      setQuerying(false);
    }
  };

  return (
    <div className="App">
      {/* Background Octocat Watermark */}
      <svg className="bg-octocat" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>

      <Navbar view={view} setView={setView} />

      <main>
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
            question={question} 
            setQuestion={setQuestion} 
            handleQuery={handleQuery} 
            querying={querying} 
            answer={answer} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
