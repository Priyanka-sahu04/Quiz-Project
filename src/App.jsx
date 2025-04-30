import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from "react";
import QuizForm from './pages/QuizForm';
import QuizPage from './pages/QuizPage';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import Navbar from './components/Navbar';
import SavedQuizzes from './pages/SavedQuizzes';

function App() {
  const [quizData, setQuizData] = useState([]);
  return (
    <Router>
      <div>
        <Navbar />
      <Routes>
        <Route path="home" element={<HomePage />} />
        <Route path="/" element={<AuthPage />} />
        <Route path="/quiz-form" element={<QuizForm setQuizData={setQuizData} />} />
        <Route path="/quiz" element={<QuizPage quizData={quizData} />} /> 
        <Route path="/saved-quizzes" element={<SavedQuizzes setQuizData={setQuizData} />} />       
      </Routes>
      </div>
    </Router>
  );
}

export default App;
