import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizForm from './pages/QuizForm';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import SavedQuizzes from './pages/SavedQuizzes';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz-form" element={<QuizForm />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/saved-quizzes" element={<SavedQuizzes />} />
      </Routes>
    </Router>
  );
}

export default App;
