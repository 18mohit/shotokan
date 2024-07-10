import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const SignInSignUp = () => {
  const { role } = useParams();
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const roleText = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-center">
          {isSignUp ? 'Sign Up for ' : 'Sign In for '}
          <span className="text-yellow-500">{roleText}</span>
        </h2>
        <form className="space-y-6">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                name='fullname'
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
              name='email'
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
              name='password'
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="photo">
                Your Photo
              </label>
              <input
                type="file"
                id="photo"
                className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="certificate">
                Your BlackBelt certificate
              </label>
              <input
                type="file"
                id="certificate"
                className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
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
