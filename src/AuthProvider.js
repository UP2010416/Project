/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// New Context created (this is shared for the entire react component tree)
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  // hooks to manage login state, these states are changed depending on validity from server (below)
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // On component load, check auth status with server (localhost:5000)
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
