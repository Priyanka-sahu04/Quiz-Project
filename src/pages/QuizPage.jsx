// src/pages/QuizPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedQuiz = localStorage.getItem('quizData');
    if (storedQuiz) {
      const parsedQuiz = JSON.parse(storedQuiz);
      setQuizData(parsedQuiz);
      const options = shuffleOptions(parsedQuiz[0]);
      setShuffledOptions(options);
    }
  }, []);

  const shuffleOptions = (question) => {
    const options = [...question.incorrect_answers, question.correct_answer];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setShuffledOptions(shuffleOptions(quizData[nextIndex]));
    } else {
      // Save selected answers
      localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));

      // Calculate score
      const totalQuestions = quizData.length;
      let correctCount = 0;
      quizData.forEach((question, index) => {
        if (selectedAnswers[index] === question.correct_answer) {
          correctCount++;
        }
      });

      const percentage = ((correctCount / totalQuestions) * 100).toFixed(2);
      localStorage.setItem('quizResult', JSON.stringify({ correctCount, totalQuestions, percentage }));

      // Navigate to result
      navigate('/result');
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
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Quiz</h2>

      {quizData.length === 0 ? (
        <p>No quiz data found. Please go back and generate a quiz.</p>
      ) : (
        <div className="p-4 border rounded-lg bg-gray-50 mb-4">
          <h3
            className="font-semibold"
            dangerouslySetInnerHTML={{
              __html: `${currentQuestionIndex + 1}. ${currentQuestion.question}`,
            }}
          />
          <ul className="mt-2 space-y-2">
            {shuffledOptions.map((option, idx) => (
              <li
                key={idx}
                onClick={() => handleSelectAnswer(currentQuestionIndex, option)}
                className={`border p-2 rounded cursor-pointer hover:bg-gray-100 transition-colors duration-200 select-none ${
                  currentSelected === option ? 'bg-blue-500 text-white border-blue-700' : 'bg-white'
                }`}
                dangerouslySetInnerHTML={{ __html: option }}
              ></li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded ${
                currentQuestionIndex === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              className={`px-4 py-2 rounded ${
                currentQuestionIndex >= quizData.length - 1
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
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
