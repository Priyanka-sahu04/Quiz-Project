import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizForm from './pages/QuizForm';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import SavedQuizzes from './pages/SavedQuizzes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizForm />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/quiz-form" element={<QuizForm />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/saved-quizzes" element={<SavedQuizzes />} />
      </Routes>
    </Router>
  );
}

export default App;
