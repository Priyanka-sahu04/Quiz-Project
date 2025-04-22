// src/pages/SavedQuizzes.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Play } from 'lucide-react';

const SavedQuizzes = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState(
    JSON.parse(localStorage.getItem('savedQuizzes')) || []
  );

  const handleStart = (quiz) => {
    localStorage.setItem('quizData', JSON.stringify(quiz.questions));
    navigate('/quiz');
  };

  const handleRemove = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this quiz?');
    if (confirmDelete) {
      const updated = quizzes.filter((quiz) => quiz.id !== id);
      setQuizzes(updated);
      localStorage.setItem('savedQuizzes', JSON.stringify(updated));
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">📚 Saved Quizzes</h2>

      {quizzes.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No saved quizzes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz, idx) => (
            <div
              key={quiz.id}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 transition hover:shadow-xl"
            >
              <h3 className="text-xl font-bold text-indigo-600 mb-2">Quiz #{idx + 1}</h3>
              <p className="text-gray-700"><span className="font-semibold">🧠 Topic:</span> {quiz.topic}</p>
              <p className="text-gray-700"><span className="font-semibold">🔥 Difficulty:</span> {quiz.difficulty}</p>
              <p className="text-gray-700"><span className="font-semibold">❓ Questions:</span> {quiz.count}</p>
              <p className="text-gray-700"><span className="font-semibold">🕒 Saved on:</span> {new Date(quiz.timestamp).toLocaleString()}</p>

              <div className="mt-5 flex justify-between">
                <button
                  onClick={() => handleStart(quiz)}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  <Play size={18} /> Start Quiz
                </button>
                <button
                  onClick={() => handleRemove(quiz.id)}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  <Trash2 size={18} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedQuizzes;
