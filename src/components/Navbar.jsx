import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-teal-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-yellow-300">
          Quiz App
        </Link>
        <div className="space-x-4 text-lg">
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>
          <Link to="/quiz-form" className="hover:text-yellow-300 transition">
            create quiz
          </Link>
          <Link to="/saved-quizzes" className="text-white px-4 py-2 hover:underline">
            Saved Quizzes
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
