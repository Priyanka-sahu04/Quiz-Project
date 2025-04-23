import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizForm from './pages/QuizForm';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import SavedQuizzes from './pages/SavedQuizzes';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="home" element={<HomePage />} />
        <Route path="/" element={<AuthPage />} />
        <Route path="/quiz-form" element={<QuizForm />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/saved-quizzes" element={<SavedQuizzes />} />
      </Routes>
    </Router>
  );
}

export default App;
