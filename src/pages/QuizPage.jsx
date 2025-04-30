// // src/pages/QuizPage.jsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const QuizPage = () => {
//   const [quizData, setQuizData] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [shuffledOptions, setShuffledOptions] = useState([]);
//   const [timeLeft, setTimeLeft] = useState(120); // 5 minutes = 300 seconds
//   const navigate = useNavigate();

//   const formatTime = (seconds) => {
//     const min = Math.floor(seconds / 60);
//     const sec = seconds % 60;
//     return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
//   };

//   const shuffleOptions = (question) => {
//     const options = [...question.incorrect_answers, question.correct_answer];
//     for (let i = options.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [options[i], options[j]] = [options[j], options[i]];
//     }
//     return options;
//   };

//   useEffect(() => {
//     const storedQuiz = localStorage.getItem('quizData');
//     if (storedQuiz) {
//       const parsedQuiz = JSON.parse(storedQuiz);
//       setQuizData(parsedQuiz);
//       const options = shuffleOptions(parsedQuiz[0]);
//       setShuffledOptions(options);
//     }
//   }, []);

//   useEffect(() => {
//     if (quizData.length === 0) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => {
//         if (prevTime <= 1) {
//           clearInterval(timer);
//           finishQuiz(selectedAnswers); // ✅ Pass the latest answers
//           return 0;
//         }
//         return prevTime - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [quizData, selectedAnswers]); // ✅ include selectedAnswers to get latest state

//   // ✅ Accept selectedAnswers as parameter
//   const finishQuiz = (finalAnswers = selectedAnswers) => {
//     localStorage.setItem('selectedAnswers', JSON.stringify(finalAnswers));

//     const totalQuestions = quizData.length;
//     let correctCount = 0;
//     quizData.forEach((question, index) => {
//       if (finalAnswers[index] === question.correct_answer) {
//         correctCount++;
//       }
//     });

//     const percentage = ((correctCount / totalQuestions) * 100).toFixed(2);
//     localStorage.setItem('quizResult', JSON.stringify({ correctCount, totalQuestions, percentage }));

//     navigate('/result');
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < quizData.length - 1) {
//       const nextIndex = currentQuestionIndex + 1;
//       setCurrentQuestionIndex(nextIndex);
//       setShuffledOptions(shuffleOptions(quizData[nextIndex]));
//     } else {
//       finishQuiz(); // Manual finish
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       const prevIndex = currentQuestionIndex - 1;
//       setCurrentQuestionIndex(prevIndex);
//       setShuffledOptions(shuffleOptions(quizData[prevIndex]));
//     }
//   };

//   const handleSelectAnswer = (questionIndex, answer) => {
//     setSelectedAnswers((prev) => ({
//       ...prev,
//       [questionIndex]: answer,
//     }));
//   };

//   const currentQuestion = quizData[currentQuestionIndex];
//   const currentSelected = selectedAnswers[currentQuestionIndex];

//   return (
//     <div className="p-6 mt-30 max-w-3xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Take the Quiz</h2>

//       {/* Timer */}
//       <div className="text-center mb-4">
//         <span className="text-lg font-semibold bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full shadow">
//           Time Left: {formatTime(timeLeft)}
//         </span>
//       </div>

//       {quizData.length === 0 ? (
//         <p className="text-center text-red-600">No quiz data found. Please go back and generate a quiz.</p>
//       ) : (
//         <div className="p-6 border rounded-2xl bg-gradient-to-br from-white to-gray-100 shadow-lg">
//           <div className="mb-4 text-lg text-gray-600">
//             <span className="mr-3">
//               <strong>Difficulty:</strong> {currentQuestion.difficulty?.toUpperCase()}
//             </span>
//             <span>
//               <strong>Topic:</strong> {currentQuestion.category}
//             </span>
//           </div>

//           <h3
//             className="font-semibold text-xl text-gray-800 mb-4"
//             dangerouslySetInnerHTML={{
//               __html: `${currentQuestionIndex + 1}. ${currentQuestion.question}`,
//             }}
//           />

//           <ul className="space-y-3">
//             {shuffledOptions.map((option, idx) => (
//               <li
//                 key={idx}
//                 onClick={() => handleSelectAnswer(currentQuestionIndex, option)}
//                 className={`border rounded-xl px-4 py-2 cursor-pointer transition duration-200 select-none text-base font-medium ${
//                   currentSelected === option ? 'bg-blue-600 text-white border-blue-700' : 'bg-white hover:bg-blue-100'
//                 }`}
//                 dangerouslySetInnerHTML={{ __html: option }}
//               ></li>
//             ))}
//           </ul>

//           <div className="mt-6 flex justify-between items-center">
//             <button
//               onClick={handlePrevious}
//               disabled={currentQuestionIndex === 0}
//               className={`px-5 py-2 rounded-lg font-semibold ${
//                 currentQuestionIndex === 0
//                   ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
//                   : 'bg-gradient-to-r from-blue-700 to-purple-500 text-white hover:bg-blue-700'
//               }`}
//             >
//               Previous
//             </button>

//             <button
//               onClick={handleNext}
//               className={`px-5 py-2 rounded-lg font-semibold ${
//                 currentQuestionIndex >= quizData.length - 1
//                   ? 'bg-gradient-to-r from-purple-500 to-blue-700 text-white'
//                   : 'bg-gradient-to-r from-emerald-500 to-teal-700 text-white'
//               }`}
//             >
//               {currentQuestionIndex >= quizData.length - 1 ? 'Finish' : 'Next'}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizPage;





















// QuizPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QuizPage = ({ quizData }) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [userAnswers, setUserAnswers] = useState({});
	const [result, setResult] = useState(null);
	const [showAnswers, setShowAnswers] = useState(false); // <-- NEW
	const navigate = useNavigate();
	const location = useLocation();

	const { topic, difficulty, quizTime } = location.state || {};
	const [timeLeft, setTimeLeft] = useState(quizTime * 60);

	useEffect(() => {
		if (!result && timeLeft > 0) {
			const timer = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
			}, 1000);

			return () => clearInterval(timer); // cleanup
		}

		if (timeLeft === 0 && !result) {
			handleFinishQuiz(); // auto-submit
		}
	}, [timeLeft, result]);

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	const handleOptionChange = (qIndex, selectedOption) => {
		setUserAnswers((prev) => ({
			...prev,
			[qIndex]: selectedOption,
		}));
	};

	const handleNextQuestion = () => {
		setCurrentQuestionIndex((prev) => prev + 1);
	};

	const handleFinishQuiz = () => {
		let correct = 0;
		let wrong = 0;

		quizData.forEach((q, idx) => {
			if (userAnswers[idx] === q.answer) {
				correct += 1;
			} else {
				wrong += 1;
			}
		});

		const total = quizData.length;
		const percentage = ((correct / total) * 100).toFixed(2);

		setResult({ correct, wrong, total, percentage });
	};

	const handleGoBack = () => {
		navigate("/home");
	};

	if (!quizData || quizData.length === 0) {
		return (
			<div className="text-center mt-20">
				<p>No quiz generated. Please go back and generate a quiz first.</p>
				<button
					onClick={handleGoBack}
					className="mt-4 p-2 bg-gradient-to-r from-blue-700 to-purple-500 text-white rounded"
				>
					Go Back
				</button>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 flex flex-col items-center justify-center">
			<h2 className="text-2xl font-bold text-center mb-4">Quiz</h2>
		<div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">

			{!result ? (
				// Quiz Questions

				<div>
					<div className="mb-6 text-center">
						<p className="text-lg font-semibold">
							Time Left: <span className="text-red-600">{formatTime(timeLeft)}</span>
						</p>
						<div className="flex justify-between items-center mb-4">
						<p className="text-lg font-semibold">Topic: <span className="text-blue-600">{topic}</span></p>
						<p className="text-lg font-semibold">Difficulty: <span className="text-purple-600 capitalize">{difficulty}</span></p>
						</div>
					</div>
					<p className="text-sm text-gray-600 mb-2">
						Question {currentQuestionIndex + 1} of {quizData.length}
					</p>
					<p className="font-medium mb-4">
						{currentQuestionIndex + 1}. {quizData[currentQuestionIndex].question}
					</p>

					<ul className="space-y-2 mb-6">
						{quizData[currentQuestionIndex].options.map((option, idx) => (
							<li key={idx} className="flex items-center">
								<input
									type="radio"
									name={`question-${currentQuestionIndex}`}
									id={`question-${currentQuestionIndex}-option-${idx}`}
									value={option}
									onChange={() =>
										handleOptionChange(currentQuestionIndex, option)
									}
									checked={userAnswers[currentQuestionIndex] === option}
									className="mr-2"
								/>
								<label htmlFor={`question-${currentQuestionIndex}-option-${idx}`}>
									{option}
								</label>
							</li>
						))}
					</ul>

					<div className="flex justify-between gap-4">
						<button
							onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
							className="flex-1 p-2 bg-gradient-to-r from-blue-700 to-purple-500 text-white rounded"
							disabled={currentQuestionIndex === 0}
						>
							Previous
						</button>

						{currentQuestionIndex < quizData.length - 1 ? (
							<button
								onClick={handleNextQuestion}
								className="flex-1 p-2 bg-gradient-to-r from-emerald-500 to-teal-700 text-white rounded"
								disabled={!userAnswers[currentQuestionIndex]}
							>
								Next
							</button>
						) : (
							<button
								onClick={handleFinishQuiz}
								className="flex-1 p-2 bg-gradient-to-r from-emerald-500 to-teal-700 text-white rounded"
								disabled={!userAnswers[currentQuestionIndex]}
							>
								Finish Quiz
							</button>
						)}
					</div>
				</div>
			) : (
				// Quiz Result
				<div className="text-center">
					<h3 className="text-3xl text-indigo-700 font-bold mb-2">Result</h3>
					<p>Total Questions: {result.total}</p>
					<p>Correct Answers: {result.correct}</p>
					<p>Wrong Answers: {result.wrong}</p>
					<p className="font-semibold mt-2">Score: {result.percentage}%</p>

					<div className="flex justify-center flex-wrap gap-4 mt-4">
						<button
							onClick={handleGoBack}
							className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-lg font-semibold"
						>
							Back to Home
						</button>
						<button
							onClick={() => setShowAnswers((prev) => !prev)}
							className="bg-gradient-to-r from-emerald-500 to-teal-700 text-white px-5 py-2 rounded-lg font-semibold"
						>
							{showAnswers ? "Hide Answers" : "View Answers"}
						</button>
					</div>

					{/* Show Answers */}
					{showAnswers && (
						<div className="mt-6 text-left">
							<h4 className="text-lg font-bold text-center mb-4">Your Answers</h4>
							{quizData.map((q, idx) => (
								<div key={idx} className="mb-4 border-b pb-4">
									<p className="font-medium">{`Q${idx + 1}: ${q.question}`}</p>
									<p>
										Your Answer:{" "}
										<span className={userAnswers[idx] === q.answer ? "text-green-600" : "text-red-600"}>
											{userAnswers[idx]}
										</span>
									</p>
									{userAnswers[idx] !== q.answer && (
										<p>
											Correct Answer:{" "}
											<span className="text-green-600">{q.answer}</span>
										</p>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
		</div>
	);
};

export default QuizPage;
