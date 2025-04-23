import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = auth.currentUser;
  const email = user?.email || '';
  const firstLetter = email.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert('👋 Logged out successfully!');
      navigate('/');
    } catch (error) {
      console.error('Logout Error:', error.message);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-teal-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-yellow-300">
          Quiz App
        </Link>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 text-lg items-center">
            <Link to="/home" className="hover:text-yellow-300 transition">
              Home
            </Link>
            <Link to="/quiz-form" className="hover:text-yellow-300 transition">
              Create Quiz
            </Link>
            <Link to="/saved-quizzes" className="hover:text-yellow-300 transition">
              Saved Quizzes
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-teal-600 px-6 py-2 rounded-md font-semibold shadow hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>

          {/* Profile Circle (Always visible) */}
          <div className="w-10 h-10 bg-white text-teal-600 font-bold flex items-center justify-center rounded-full shadow">
            {firstLetter}
          </div>

          {/* Hamburger (only visible on mobile) */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link to="/home" onClick={toggleMenu} className="block hover:text-yellow-300">
            Home
          </Link>
          <Link to="/quiz-form" onClick={toggleMenu} className="block hover:text-yellow-300">
            Create Quiz
          </Link>
          <Link to="/saved-quizzes" onClick={toggleMenu} className="block hover:text-yellow-300">
            Saved Quizzes
          </Link>
          <button
            onClick={() => {
              handleLogout();
              toggleMenu();
            }}
            className="w-full bg-white text-teal-600 px-6 py-2 rounded-md font-semibold shadow hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
