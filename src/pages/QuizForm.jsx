import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { PlayCircle, Save } from 'lucide-react';

const QuizForm = () => {
  const [formData, setFormData] = useState({
    difficulty: 'easy',
    topic: '18',
    count: '5',
  });

  const [quizReady, setQuizReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchQuiz = async () => {
    const { difficulty, topic, count } = formData;
    const url = `https://opentdb.com/api.php?amount=${count}&category=${topic}&difficulty=${difficulty}&type=multiple`;

    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      localStorage.setItem('quizData', JSON.stringify(data.results));
      setQuizReady(true);
    } catch (error) {
      console.error('Failed to fetch quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchQuiz();
  };

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  const handleSaveQuiz = () => {
    const quizData = JSON.parse(localStorage.getItem('quizData'));

    if (!quizData || quizData.length === 0) {
      alert('No quiz to save!');
      return;
    }

    const savedQuiz = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      difficulty: formData.difficulty,
      topic: formData.topic,
      count: formData.count,
      questions: quizData,
    };

    const existing = JSON.parse(localStorage.getItem('savedQuizzes')) || [];
    existing.push(savedQuiz);
    localStorage.setItem('savedQuizzes', JSON.stringify(existing));

    alert('Quiz saved successfully!');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 flex items-center justify-center">
        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center text-teal-800 mb-6">Generate Your Quiz</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-200"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Topic (Category)</label>
              <select
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-200"
              >
                <option value="18">Science: Computers</option>
                <option value="9">General Knowledge</option>
                <option value="21">Sports</option>
                <option value="23">History</option>
                <option value="17">Science & Nature</option>
                <option value="22">Geography</option>
                <option value="11">Film</option>
                <option value="12">Music</option>
                <option value="15">Video Games</option>
                <option value="19">Science: Mathematics</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Number of Questions</label>
              <input
                type="number"
                name="count"
                value={formData.count}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-200"
                min="1"
                max="20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white text-lg font-semibold transition ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-xl'
              }`}
            >
              {loading && (
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              )}
              {loading ? 'Generating...' : 'Generate Quiz'}
            </button>
          </form>

          {quizReady && (
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleStartQuiz}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-700 text-white px-6 py-2 rounded-xl hover:bg-teal-700 transition text-lg"
              >
                <PlayCircle size={22} /> Start Quiz
              </button>
            
              <button
                onClick={handleSaveQuiz}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-700 to-emerald-500 text-white px-6 py-2 rounded-xl hover:bg-teal-700 transition text-lg"
              >
                <Save size={22} /> Save Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizForm;
