import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizForm = () => {
  const [formData, setFormData] = useState({
    difficulty: 'easy',
    topic: '18',
    count: '5',
  });

  const [quizReady, setQuizReady] = useState(false);
  const [loading, setLoading] = useState(false); // ⬅️ New loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchQuiz = async () => {
    const { difficulty, topic, count } = formData;
    const url = `https://opentdb.com/api.php?amount=${count}&category=${topic}&difficulty=${difficulty}&type=multiple`;
    try {
      setLoading(true); // ⬅️ Start loading
      const response = await fetch(url);
      const data = await response.json();
      localStorage.setItem('quizData', JSON.stringify(data.results));
      setQuizReady(true);
    } catch (error) {
      console.error('Failed to fetch quiz:', error);
    } finally {
      setLoading(false); // ⬅️ End loading
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchQuiz();
  };

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
        {/* Form Fields */}
        <div>
          <label className="block font-semibold">Difficulty:</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Topic (Category):</label>
          <select
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="18">Science: Computers</option>
            <option value="9">General Knowledge</option>
            <option value="21">Sports</option>
            <option value="23">History</option>
            <option value="17">Science & Nature</option>
            <option value="22">Geography</option>
            <option value="20">Mythology</option>
            <option value="11">Film</option>
            <option value="12">Music</option>
            <option value="15">Video Games</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Number of Questions:</label>
          <input
            type="number"
            name="count"
            value={formData.count}
            onChange={handleChange}
            className="w-full border rounded p-2"
            min="1"
            max="20"
          />
        </div>

        <button
          type="submit"
          disabled={loading} // ⬅️ Disable while loading
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded text-white ${
            loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
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
        <div className="mt-6 text-center">
          <button
            onClick={handleStartQuiz}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizForm;
