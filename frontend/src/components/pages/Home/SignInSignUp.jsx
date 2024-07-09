import React, { useState } from 'react';
import { signInWithGoogle } from '../../../store/firebase';

const SignInSignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>
        <form className="space-y-6">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">or continue with</p>
          <button
            onClick={signInWithGoogle}
            className="mt-4 px-4 py-2 w-full flex justify-center items-center bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.6 0 6.3 1.2 8.3 3.1l6.2-6.2C34.4 2.4 29.7 0 24 0 14.9 0 7.1 5.5 3.7 13.4l7.5 5.8C12.9 13.2 18 9.5 24 9.5z"></path>
              <path fill="#34A853" d="M46.1 24.6c0-1.8-.2-3.6-.6-5.3H24v10.1h12.5c-.5 3-2.1 5.6-4.6 7.3l7.1 5.5C43.3 38.2 46.1 32 46.1 24.6z"></path>
              <path fill="#FBBC05" d="M10.8 28.9c-.7-2.1-1.1-4.3-1.1-6.6s.4-4.5 1.1-6.6L3.2 10c-2.2 4.3-3.4 9.1-3.4 14.3s1.2 10 3.4 14.3l7.6-5.7z"></path>
              <path fill="#4285F4" d="M24 48c6.5 0 12-2.1 16-5.7l-7.6-5.7c-2.1 1.4-4.7 2.3-7.4 2.3-5.8 0-10.7-3.9-12.5-9.2l-7.6 5.7C7.1 42.5 14.9 48 24 48z"></path>
            </svg>
            Google
          </button>
        </div>
        <p className="text-sm text-center text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={toggleForm}
            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInSignUp;
