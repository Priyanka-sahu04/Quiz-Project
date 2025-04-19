import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizForm from './pages/QuizForm';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizForm />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
