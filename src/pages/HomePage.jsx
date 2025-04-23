import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/quiz-form'); // Change route as needed
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white px-6 md:px-20">
        {/* left Section */}
        <div className="md:w-1/2 w-full mt-10 md:mt-0">
          <img
            src="https://img.freepik.com/premium-vector/student-chooses-correct-answer-test-online-quiz-e-learning-distance-education-concept-horizontal_48369-47035.jpg"
            alt="Quiz Illustration"
            className="w-170 h-140 mx-auto"
          />
        </div>
        
        {/* right Section */}
        <div className="text-center md:text-left md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-purple-700">
            Level Up Your Skills
          </h1>
          <p className="text-gray-700 text-xl">
            Are you ready to put your programming prowess to the test? Whether you're a seasoned developer or just starting your coding journey, our quiz game is the perfect way to challenge yourself and have fun while learning.
          </p>
          <button
            onClick={handleStart}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
          >
            TAKE QUIZ
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
