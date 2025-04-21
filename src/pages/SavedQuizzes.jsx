// // src/pages/SavedQuizzes.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const SavedQuizzes = () => {
//   const navigate = useNavigate();
//   const savedQuizzes = JSON.parse(localStorage.getItem('savedQuizzes')) || [];

//   const handleStart = (quiz) => {
//     localStorage.setItem('quizData', JSON.stringify(quiz.questions));
//     navigate('/quiz');
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Saved Quizzes</h2>
//       {savedQuizzes.length === 0 ? (
//         <p>No saved quizzes found.</p>
//       ) : (
//         <div className="space-y-4">
//           {savedQuizzes.map((quiz, idx) => (
//             <div key={quiz.id} className="border p-4 rounded bg-gray-50">
//               <p><strong>Quiz #{idx + 1}</strong></p>
//               <p>🧠 Topic: {quiz.topic}</p>
//               <p>🔥 Difficulty: {quiz.difficulty}</p>
//               <p>❓ Questions: {quiz.count}</p>
//               <p>🕒 Saved on: {new Date(quiz.timestamp).toLocaleString()}</p>
//               <button
//                 onClick={() => handleStart(quiz)}
//                 className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
//               >
//                 Start This Quiz
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SavedQuizzes;










// src/pages/SavedQuizzes.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Saved Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>No saved quizzes found.</p>
      ) : (
        <div className="space-y-4">
          {quizzes.map((quiz, idx) => (
            <div key={quiz.id} className="border p-4 rounded bg-gray-50">
              <p><strong>Quiz #{idx + 1}</strong></p>
              <p>🧠 Topic: {quiz.topic}</p>
              <p>🔥 Difficulty: {quiz.difficulty}</p>
              <p>❓ Questions: {quiz.count}</p>
              <p>🕒 Saved on: {new Date(quiz.timestamp).toLocaleString()}</p>
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => handleStart(quiz)}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Start This Quiz
                </button>
                <button
                  onClick={() => handleRemove(quiz.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Remove
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
