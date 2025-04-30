import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useState } from "react";
import QuizForm from './pages/QuizForm';
import QuizPage from './pages/QuizPage';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import Navbar from './components/Navbar';
import SavedQuizzes from './pages/SavedQuizzes';

function AppWrapper() {
  const [quizData, setQuizData] = useState([]);
  const location = useLocation();

  // Don't show navbar on the login/auth page
  const hideNavbar = location.pathname === '/';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/quiz-form" element={<QuizForm setQuizData={setQuizData} />} />
        <Route path="/quiz" element={<QuizPage quizData={quizData} />} /> 
        <Route path="/saved-quizzes" element={<SavedQuizzes setQuizData={setQuizData} />} />       
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
