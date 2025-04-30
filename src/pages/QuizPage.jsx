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
			<div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">

				{!result ? (
					// Quiz Questions

					<div>
						<div className="mb-6 text-center">
							<p className="text-lg font-semibold">
								Time Left: <span className="text-red-600">{formatTime(timeLeft)}</span>
							</p>
							<div className="flex justify-between items-center mb-4">
								<p className="text-xl font-semibold">
									Topic: <span className="text-teal-600">{topic}</span>
								</p>
								<p className="text-xl font-semibold">
									Difficulty: <span className="text-teal-600 capitalize">{difficulty}</span>
								</p>
							</div>
						</div>

						<p className="text-md text-gray-600 mb-2">
							Question {currentQuestionIndex + 1} of {quizData.length}
						</p>

						<p className="text-xl font-semibold mb-4">
							{currentQuestionIndex + 1}. {quizData[currentQuestionIndex].question}
						</p>

						<ul className="space-y-3 mb-6">
							{quizData[currentQuestionIndex].options.map((option, idx) => {
								const isSelected = userAnswers[currentQuestionIndex] === option;
								return (
									<li key={idx}>
										<input
											type="radio"
											name={`question-${currentQuestionIndex}`}
											id={`question-${currentQuestionIndex}-option-${idx}`}
											value={option}
											onChange={() => handleOptionChange(currentQuestionIndex, option)}
											checked={isSelected}
											className="hidden"
										/>
										<label
											htmlFor={`question-${currentQuestionIndex}-option-${idx}`}
											className={`block cursor-pointer border text-lg rounded-lg px-4 py-2 transition-all duration-200
              									${isSelected
													? "bg-blue-600 text-white border-blue-600"
													: "bg-white text-gray-800 border-gray-300 hover:bg-blue-50 hover:border-blue-400"}`}
										>
											{option}
										</label>
									</li>
								);
							})}
						</ul>

						<div className="flex justify-between gap-4">
							<button
								onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
								className="flex-1 p-2 bg-gradient-to-r from-blue-700 to-purple-500 text-white text-lg font-semibold rounded disabled:opacity-50"
								disabled={currentQuestionIndex === 0}
							>
								Previous
							</button>

							{currentQuestionIndex < quizData.length - 1 ? (
								<button
									onClick={handleNextQuestion}
									className="flex-1 p-2 bg-gradient-to-r from-emerald-500 to-teal-700 text-white text-lg font-semibold rounded disabled:opacity-50"
									disabled={!userAnswers[currentQuestionIndex]}
								>
									Next
								</button>
							) : (
								<button
									onClick={handleFinishQuiz}
									className="flex-1 p-2 bg-gradient-to-r from-emerald-500 to-teal-700 text-white rounded disabled:opacity-50"
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
						<h3 className="text-4xl text-teal-600 font-bold mb-2">Result</h3>
						<p className="text-xl text-gray-700">Total Questions: {result.total}</p>
						<p className="text-xl text-gray-700">Correct Answers: {result.correct}</p>
						<p className="text-xl text-gray-700">Wrong Answers: {result.wrong}</p>
						<p className="text-xl text-gray-800 font-semibold mt-2">Score: {result.percentage}%</p>

						<div className="flex justify-center flex-wrap gap-4 mt-4">
							<button
								onClick={handleGoBack}
								className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg px-5 py-2 rounded-lg font-semibold"
							>
								Back to Home
							</button>
							<button
								onClick={() => setShowAnswers((prev) => !prev)}
								className="bg-gradient-to-r from-emerald-500 to-teal-700 text-white text-lg px-5 py-2 rounded-lg font-semibold"
							>
								{showAnswers ? "Hide Answers" : "View Answers"}
							</button>
						</div>

						{/* Show Answers */}
						{showAnswers && (
							<div className="mt-6 text-left">
								<h4 className="text-xl text-gray-800 font-bold text-center mb-4">Your Answers</h4>
								{quizData.map((q, idx) => (
									<div key={idx} className="mb-4 border-b pb-4">
										<p className="font-medium text-lg text-gray-700">{`Q${idx + 1}: ${q.question}`}</p>
										<p className="text-md text-gray-700">
											Your Answer:{" "}
											<span className={userAnswers[idx] === q.answer ? "text-green-600" : "text-red-600"}>
												{userAnswers[idx]}
											</span>
										</p>
										{userAnswers[idx] !== q.answer && (
											<p className="text-md text-gray-700">
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
