/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await axios.get('/login');
        if (response.status === 200 && response.data.loggedIn === true) {
          setLoggedIn(true);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error during authentication check', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchAuthStatus();
  }, [navigate]);

  useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn]);

  return (
        <AuthContext.Provider value = {{ loggedIn, loading, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
  );
}
