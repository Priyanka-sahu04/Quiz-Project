import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SavedQuizzes = ({ setQuizData }) => {
  const [savedQuizzes, setSavedQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const quizzesFromStorage = JSON.parse(localStorage.getItem("savedQuizzes")) || [];
    setSavedQuizzes(quizzesFromStorage);
  }, []);

  const handleRemoveQuiz = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this quiz?");
    if (confirmDelete) {
      const updatedQuizzes = savedQuizzes.filter((_, i) => i !== index);
      setSavedQuizzes(updatedQuizzes);
      localStorage.setItem("savedQuizzes", JSON.stringify(updatedQuizzes));
    }
  };

  const handleStartQuiz = (quiz) => {
    setQuizData(quiz.quizData);
    setTimeout(() => {
      navigate("/quiz", {
        state: {
          topic: quiz.topic,
          difficulty: quiz.difficulty,
          quizTime: quiz.quizTime,
        },
      });
    }, 100);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <h2 className="text-3xl font-bold text-center text-purple-800 mb-8">Saved Quizzes</h2>

      {savedQuizzes.length === 0 ? (
        <p className="text-center text-gray-500">No quizzes saved yet!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto gap-6 ">
          {savedQuizzes.map((quiz, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6 border border-purple-200"
            >
              <h3 className="text-xl font-semibold text-purple-700 mb-2">Quiz #{index + 1}</h3>

              <p className="mb-1 text-lg text-gray-700"><span className="mr-1">🧠</span><strong>Topic:</strong> {quiz.topic}</p>
              <p className="mb-1 text-lg text-gray-700"><span className="mr-1">🔥</span><strong>Difficulty:</strong> {quiz.difficulty}</p>
              <p className="mb-1 text-lg text-gray-700"><span className="mr-1">❓</span><strong>Questions:</strong> {quiz.questionCount}</p>
              <p className="mb-2 text-md text-gray-500">
                <span className="mr-1">🕒</span>
                <strong>Saved on:</strong> {new Date(quiz.timestamp).toLocaleString()}
              </p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleStartQuiz(quiz)}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-700 text-white py-2 rounded-xl font-semibold hover:scale-105 transition-transform duration-200"
                >
                  ▶ Start Quiz
                </button>

                <button
                  onClick={() => handleRemoveQuiz(index)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-xl font-semibold hover:scale-105 transition-transform duration-200"
                >
                  🗑 Remove
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
