// SavedQuizzes.jsx
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
    setQuizData(quiz.quizData); // 👈 inject the full quiz data
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
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Saved Quizzes</h2>

      {savedQuizzes.length === 0 ? (
        <p className="text-center text-gray-500">No quizzes saved yet!</p>
      ) : (
        <ul className="space-y-4">
          {savedQuizzes.map((quiz, index) => (
            <li key={index} className="p-4 border rounded hover:bg-gray-50">
              <p><strong>Topic:</strong> {quiz.topic}</p>
              <p><strong>Difficulty:</strong> {quiz.difficulty}</p>
              <p><strong>Number of Questions:</strong> {quiz.questionCount}</p>
              <p className="text-sm text-gray-500">
                <strong>Saved At:</strong> {new Date(quiz.timestamp).toLocaleString()}
              </p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleStartQuiz(quiz)}
                  className="flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-700"
                >
                  Start Quiz
                </button>

                <button
                  onClick={() => handleRemoveQuiz(index)}
                  className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedQuizzes;
