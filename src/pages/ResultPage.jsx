// src/pages/ResultPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem('quizResult'));
    const questions = JSON.parse(localStorage.getItem('quizData'));
    const answers = JSON.parse(localStorage.getItem('selectedAnswers'));

    if (result) {
      setScore(result.correctCount);
      setTotal(result.totalQuestions);
    }

    if (questions && answers) {
      setQuizData(questions);
      setUserAnswers(answers);
    }
  }, []);

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">Quiz Result</h2>
      <p className="text-xl mb-2">Correct Answers: <span className="font-semibold">{score}</span></p>
      <p className="text-xl mb-2">Total Questions: <span className="font-semibold">{total}</span></p>
      <p className="text-xl mb-4">
        Your Score: <span className="font-semibold text-green-600">{((score / total) * 100).toFixed(2)}%</span>
      </p>
      <button
        onClick={handleBackToHome}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Back to Home
      </button>

      <button
        onClick={() => setShowAnswers(!showAnswers)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
      >
        {showAnswers ? 'Hide Answers' : 'View Answers'}
      </button>

      {showAnswers && (
        <div className="mt-6 text-left bg-gray-100 p-4 rounded shadow">
          <h3 className="text-2xl font-semibold mb-4">Your Answers</h3>
          {quizData.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correct_answer;

            return (
              <div key={index} className="mb-4 border-b pb-2">
                <p className="font-medium">
                  Q{index + 1}: {question.question}
                </p>
                <p>
                  Your Answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                    {userAnswer || 'No Answer'}
                  </span>
                </p>
                {!isCorrect && (
                  <p>
                    Correct Answer: <span className="text-green-600">{question.correct_answer}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ResultPage;
