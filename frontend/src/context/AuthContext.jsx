import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login as loginAction, logout as logoutAction } from '../store/authSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/check-auth', { withCredentials: true });
        setIsAuthenticated(response.data.isAuthenticated);
        setIsAuthenticated(true);
        dispatch(loginAction());
      } catch (error) {
        
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (formData) => {
    try {
      const response = await axios.post('http://localhost:4000/register/owner/login', formData, { withCredentials: true });
      setIsAuthenticated(true);
      dispatch(loginAction());
      return response.data;
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.get('http://localhost:4000/register/logout', { withCredentials: true });
      setIsAuthenticated(false);
      dispatch(logoutAction());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
