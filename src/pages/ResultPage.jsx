// src/pages/ResultPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

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
    navigate('/home');
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <div className="p-6 border rounded-2xl bg-gradient-to-br from-white to-gray-100 shadow-lg text-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">Your Result</h2>
          <p className="text-lg mb-2">Correct Answers: <span className="font-semibold">{score}</span></p>
          <p className="text-lg mb-2">Total Questions: <span className="font-semibold">{total}</span></p>
          <p className="text-lg mb-4">
            Your Score: <span className="font-semibold text-green-600">{((score / total) * 100).toFixed(2)}%</span>
          </p>

          <div className="flex justify-center flex-wrap gap-4 mt-4">
            <button
              onClick={handleBackToHome}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Back to Home
            </button>

            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="bg-gradient-to-r from-emerald-500 to-teal-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              {showAnswers ? 'Hide Answers' : 'View Answers'}
            </button>
          </div>
        </div>

        {showAnswers && (
          <div className="mt-8 bg-white border rounded-2xl shadow p-6">
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">Your Answers</h3>
            {quizData.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === question.correct_answer;

              return (
                <div key={index} className="mb-6 pb-4 border-b">
                  <p
                    className="text-lg font-medium text-gray-800 mb-2"
                    dangerouslySetInnerHTML={{ __html: `Q${index + 1}: ${question.question}` }}
                  />
                  <p className='text-lg'>
                    Your Answer: <span className={isCorrect ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                      {userAnswer || 'No Answer'}
                    </span>
                  </p>
                  {!isCorrect && (
                    <p className='text-lg'>
                      Correct Answer: <span className="text-green-700 font-semibold">{question.correct_answer}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
