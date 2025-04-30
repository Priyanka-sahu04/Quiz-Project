import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

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
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center md:justify-between">
        {/* Mobile View */}
        <div className="flex w-full items-center justify-between md:hidden relative">
          {/* Hamburger Left */}
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Centered Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img src={logo} className="h-20" alt="QuickThink Logo" />
          </div>

          {/* Profile Right */}
          <div className="w-10 h-10 bg-white text-teal-600 text-xl font-bold flex items-center justify-center rounded-full shadow">
            {firstLetter}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex justify-between items-center w-full">
          {/* Logo */}
          <img src={logo} className="h-20" alt="QuickThink Logo" />

          <div className="flex items-center space-x-4">
            <Link to="/home" className="hover:text-yellow-300 text-xl transition">
              Home
            </Link>
            <Link to="/quiz-form" className="hover:text-yellow-300 text-xl transition">
              Create Quiz
            </Link>
            <Link to="/saved-quizzes" className="hover:text-yellow-300 text-xl transition">
              Saved Quizzes
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-teal-600 px-6 py-2 rounded-md font-semibold shadow hover:bg-gray-100 transition"
            >
              Logout
            </button>

            <div className="w-10 h-10 bg-white text-teal-600 text-xl font-bold flex items-center justify-center rounded-full shadow">
              {firstLetter}
            </div>
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
