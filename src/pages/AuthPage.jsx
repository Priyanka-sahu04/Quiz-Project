import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // <-- NEW

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/home');
      } else {
        setLoading(false); // <-- Stop loading only if no user
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('✅ Sign-up successful!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert('✅ Login successful!');
      }
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return null; // <-- or a spinner/loading screen

  return (
    <div className="min-h-screen bg-gradient-to-br bg-teal-50 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">
          {isSignup ? 'Create an Account' : 'Login to Your Account'}
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
          {error && <p className="text-rose-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white font-bold py-2 rounded-md hover:bg-teal-700 transition"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setEmail('');
              setPassword('');
              setError('');
            }}
            className="text-teal-600 font-semibold hover:underline"
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
