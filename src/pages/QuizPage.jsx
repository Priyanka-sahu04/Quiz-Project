// src/pages/QuizPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120); // 5 minutes = 300 seconds
  const navigate = useNavigate();

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const shuffleOptions = (question) => {
    const options = [...question.incorrect_answers, question.correct_answer];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  };

  useEffect(() => {
    const storedQuiz = localStorage.getItem('quizData');
    if (storedQuiz) {
      const parsedQuiz = JSON.parse(storedQuiz);
      setQuizData(parsedQuiz);
      const options = shuffleOptions(parsedQuiz[0]);
      setShuffledOptions(options);
    }
  }, []);

  useEffect(() => {
    if (quizData.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          finishQuiz(selectedAnswers); // ✅ Pass the latest answers
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizData, selectedAnswers]); // ✅ include selectedAnswers to get latest state

  // ✅ Accept selectedAnswers as parameter
  const finishQuiz = (finalAnswers = selectedAnswers) => {
    localStorage.setItem('selectedAnswers', JSON.stringify(finalAnswers));

    const totalQuestions = quizData.length;
    let correctCount = 0;
    quizData.forEach((question, index) => {
      if (finalAnswers[index] === question.correct_answer) {
        correctCount++;
      }
    });

    const percentage = ((correctCount / totalQuestions) * 100).toFixed(2);
    localStorage.setItem('quizResult', JSON.stringify({ correctCount, totalQuestions, percentage }));

    navigate('/result');
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setShuffledOptions(shuffleOptions(quizData[nextIndex]));
    } else {
      finishQuiz(); // Manual finish
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      setShuffledOptions(shuffleOptions(quizData[prevIndex]));
    }
  };

  const handleSelectAnswer = (questionIndex, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const currentQuestion = quizData[currentQuestionIndex];
  const currentSelected = selectedAnswers[currentQuestionIndex];

  return (
    <div className="p-6 mt-30 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Take the Quiz</h2>

      {/* Timer */}
      <div className="text-center mb-4">
        <span className="text-lg font-semibold bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full shadow">
          Time Left: {formatTime(timeLeft)}
        </span>
      </div>

      {quizData.length === 0 ? (
        <p className="text-center text-red-600">No quiz data found. Please go back and generate a quiz.</p>
      ) : (
        <div className="p-6 border rounded-2xl bg-gradient-to-br from-white to-gray-100 shadow-lg">
          <div className="mb-4 text-lg text-gray-600">
            <span className="mr-3">
              <strong>Difficulty:</strong> {currentQuestion.difficulty?.toUpperCase()}
            </span>
            <span>
              <strong>Topic:</strong> {currentQuestion.category}
            </span>
          </div>

          <h3
            className="font-semibold text-xl text-gray-800 mb-4"
            dangerouslySetInnerHTML={{
              __html: `${currentQuestionIndex + 1}. ${currentQuestion.question}`,
            }}
          />

          <ul className="space-y-3">
            {shuffledOptions.map((option, idx) => (
              <li
                key={idx}
                onClick={() => handleSelectAnswer(currentQuestionIndex, option)}
                className={`border rounded-xl px-4 py-2 cursor-pointer transition duration-200 select-none text-base font-medium ${
                  currentSelected === option ? 'bg-blue-600 text-white border-blue-700' : 'bg-white hover:bg-blue-100'
                }`}
                dangerouslySetInnerHTML={{ __html: option }}
              ></li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`px-5 py-2 rounded-lg font-semibold ${
                currentQuestionIndex === 0
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-700 to-purple-500 text-white hover:bg-blue-700'
              }`}
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              className={`px-5 py-2 rounded-lg font-semibold ${
                currentQuestionIndex >= quizData.length - 1
                  ? 'bg-gradient-to-r from-purple-500 to-blue-700 text-white'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-700 text-white'
              }`}
            >
              {currentQuestionIndex >= quizData.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
