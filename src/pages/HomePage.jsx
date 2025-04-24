import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import quizImage from '../assets/quizImage.avif'

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
        <div className="md:w-1/2 w-full mt-10 md:mt-0 flex justify-center">
          <img
            src={quizImage}
            alt="Quiz Illustration"
            className="w-full max-w-2xl h-auto object-contain"
          />
        </div>

        {/* right Section */}
        <div className="text-center md:text-left md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Sharpen Your Knowledge
          </h1>
          <p className="text-gray-700 text-xl">
            Ready to test your brainpower? Explore a wide range of quizzes across topics like Science, History, Sports, Computers, and more. Whether you're a curious learner or a trivia enthusiast, there's something exciting for everyone. Play, learn, and level up your mind!
          </p>
          <button
            onClick={handleStart}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
          >
            TAKE QUIZ
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
