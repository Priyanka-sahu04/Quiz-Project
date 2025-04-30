// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import { PlayCircle, Save } from 'lucide-react';

// const QuizForm = () => {
//   const [formData, setFormData] = useState({
//     difficulty: 'easy',
//     topic: '18',
//     count: '5',
//   });

//   const [quizReady, setQuizReady] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const fetchQuiz = async () => {
//     const { difficulty, topic, count } = formData;
//     const url = `https://opentdb.com/api.php?amount=${count}&category=${topic}&difficulty=${difficulty}&type=multiple`;

//     try {
//       setLoading(true);
//       const response = await fetch(url);
//       const data = await response.json();

//       localStorage.setItem('quizData', JSON.stringify(data.results));
//       setQuizReady(true);
//     } catch (error) {
//       console.error('Failed to fetch quiz:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchQuiz();
//   };

//   const handleStartQuiz = () => {
//     navigate('/quiz');
//   };

//   const handleSaveQuiz = () => {
//     const quizData = JSON.parse(localStorage.getItem('quizData'));

//     if (!quizData || quizData.length === 0) {
//       alert('No quiz to save!');
//       return;
//     }

//     const savedQuiz = {
//       id: Date.now(),
//       timestamp: new Date().toISOString(),
//       difficulty: formData.difficulty,
//       topic: formData.topic,
//       count: formData.count,
//       questions: quizData,
//     };

//     const existing = JSON.parse(localStorage.getItem('savedQuizzes')) || [];
//     existing.push(savedQuiz);
//     localStorage.setItem('savedQuizzes', JSON.stringify(existing));

//     alert('Quiz saved successfully!');
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 flex items-center justify-center">
//         <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8">
//           <h1 className="text-4xl font-bold text-center text-teal-800 mb-6">Generate Your Quiz</h1>
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block font-semibold text-gray-700 mb-1">Difficulty</label>
//               <select
//                 name="difficulty"
//                 value={formData.difficulty}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-200"
//               >
//                 <option value="easy">Easy</option>
//                 <option value="medium">Medium</option>
//                 <option value="hard">Hard</option>
//               </select>
//             </div>

//             <div>
//               <label className="block font-semibold text-gray-700 mb-1">Topic (Category)</label>
//               <select
//                 name="topic"
//                 value={formData.topic}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-200"
//               >
//                 <option value="18">Science: Computers</option>
//                 <option value="9">General Knowledge</option>
//                 <option value="21">Sports</option>
//                 <option value="23">History</option>
//                 <option value="17">Science & Nature</option>
//                 <option value="22">Geography</option>
//                 <option value="11">Film</option>
//                 <option value="12">Music</option>
//                 <option value="15">Video Games</option>
//                 <option value="19">Science: Mathematics</option>
//               </select>
//             </div>

//             <div>
//               <label className="block font-semibold text-gray-700 mb-1">Number of Questions</label>
//               <input
//                 type="number"
//                 name="count"
//                 value={formData.count}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-200"
//                 min="1"
//                 max="20"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white text-lg font-semibold transition ${
//                 loading
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-gradient-to-r from-blue-500 to-purple-600 text-xl'
//               }`}
//             >
//               {loading && (
//                 <svg
//                   className="w-5 h-5 animate-spin text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v8z"
//                   ></path>
//                 </svg>
//               )}
//               {loading ? 'Generating...' : 'Generate Quiz'}
//             </button>
//           </form>

//           {quizReady && (
//             <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
//               <button
//                 onClick={handleStartQuiz}
//                 className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-700 text-white px-6 py-2 rounded-xl hover:bg-teal-700 transition text-lg"
//               >
//                 <PlayCircle size={22} /> Start Quiz
//               </button>
            
//               <button
//                 onClick={handleSaveQuiz}
//                 className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-700 to-emerald-500 text-white px-6 py-2 rounded-xl hover:bg-teal-700 transition text-lg"
//               >
//                 <Save size={22} /> Save Quiz
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default QuizForm;











// QuizForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizForm = ({ setQuizData }) => {
	const [topic, setTopic] = useState("");
	const [difficulty, setDifficulty] = useState("easy");
	const [questionCount, setQuestionCount] = useState(5);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [isQuizGenerated, setIsQuizGenerated] = useState(false); // 👈 new state
	const [quizTime, setQuizTime] = useState(2);
  const [generatedQuiz, setGeneratedQuiz] = useState([]);

	const navigate = useNavigate();

	const handleGenerateQuiz = async () => {
		setLoading(true);
		setError("");
		setIsQuizGenerated(false); // Reset

		const apiUrl = "https://api.cohere.ai/v1/generate";
		const headers = {
			Authorization: "Bearer g8kP7bewlDnAqhb7Xtn9U8jixSZpVIGvvwioS259",
			"Content-Type": "application/json",
		};

		const body = {
			model: "command",
			prompt: `Generate a quiz on the topic "${topic}" with ${difficulty} difficulty and ${questionCount} questions.
Each question should be an object with:
- a "question" (the question text),
- an "options" array with 4 choices,
- and an "answer" which is the correct option.
Respond only with a pure JSON array of objects, without any extra text.`,
			max_tokens: questionCount * 150,
			stop_sequences: [],
		};

		try {
			const response = await fetch(apiUrl, {
				method: "POST",
				headers: headers,
				body: JSON.stringify(body),
			});
			const data = await response.json();

			if (response.ok) {
				let rawText = data.generations[0].text.trim();
				const startIdx = rawText.indexOf("[");
				const endIdx = rawText.lastIndexOf("]") + 1;
				const jsonString = rawText.substring(startIdx, endIdx);
				const quizData = JSON.parse(jsonString);

				setQuizData(quizData);
        setGeneratedQuiz(quizData);
				setIsQuizGenerated(true); // 👈 Set true after successful generation
			} else {
				setError("Error generating quiz: " + (data.message || "Unknown error"));
			}
		} catch (err) {
			console.error("API call error:", err);
			setError("Failed to generate quiz. Please try again.");
		}

		setLoading(false);
	};

	const handleStartQuiz = () => {
		navigate("/quiz", {
			state: {
				topic,
				difficulty,
				quizTime,
			},
		});
	};

	const handleSaveQuiz = () => {
		const savedQuizzes = JSON.parse(localStorage.getItem("savedQuizzes")) || [];
		savedQuizzes.push({
			topic,
			difficulty,
			questionCount,
			quizTime,
			timestamp: new Date().toISOString(),
			quizData: JSON.parse(JSON.stringify(generatedQuiz)), // Save full quiz content
		});
		localStorage.setItem("savedQuizzes", JSON.stringify(savedQuizzes));
		alert("Quiz saved successfully!");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 flex items-center justify-center">
		<div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8">
		<h2 className="text-4xl font-bold text-center text-teal-800 mb-6">Generate Your Quiz</h2>

			<div className="mb-4">
			<label className="block font-semibold text-gray-700 mb-1">Topic</label>
				<input
					type="text"
					value={topic}
					onChange={(e) => setTopic(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-200"
					placeholder="Enter topic, e.g., HTML"
				/>
			</div>

			<div className="mb-4">
			<label className="block font-semibold text-gray-700 mb-1">Difficulty</label>
				<select
					value={difficulty}
					onChange={(e) => setDifficulty(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-200"
				>
					<option value="easy">Easy</option>
					<option value="medium">Medium</option>
					<option value="hard">Hard</option>
				</select>
			</div>

			<div className="mb-4">
			<label className="block font-semibold text-gray-700 mb-1">Number of Questions</label>
				<input
					type="number"
					value={questionCount}
					onChange={(e) => setQuestionCount(Number(e.target.value))}
					className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-200"
					min="1"
					max="20"
				/>
			</div>

			<div className="mb-4">
			<label className="block font-semibold text-gray-700 mb-1">Timer (minutes)</label>
				<input
					type="number"
					value={quizTime}
					onChange={(e) => setQuizTime(Number(e.target.value))}
					className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-teal-200"
					min="1"
					max="15"
				/>
			</div>

			<button
				onClick={handleGenerateQuiz}
				disabled={loading}
				className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white bg-gradient-to-r from-blue-500 to-purple-600 text-xl font-semibold transition"
			>
				{loading ? "Generating..." : "Generate Quiz"}
			</button>

			{error && <div className="mt-4 text-red-500">{error}</div>}

			{/* Show buttons only when quiz is generated */}
			{isQuizGenerated && !loading && !error && (
				<div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
					<button
						onClick={handleStartQuiz}
						className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-700 text-white px-6 py-2 rounded-xl hover:bg-teal-700 transition text-lg"
					>
						Start Quiz
					</button>

					<button
						onClick={handleSaveQuiz}
						className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-700 to-emerald-500 text-white px-6 py-2 rounded-xl hover:bg-teal-700 transition text-lg"
					>
						Save Quiz
					</button>
				</div>
			)}
		</div>
		</div>
	);
};

export default QuizForm;
