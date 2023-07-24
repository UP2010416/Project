/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider.js';

const PrivateRoute = ({ children }) => {
  const { loggedIn, loading } = useContext(AuthContext);

  console.log('PrivateRoute - loading:', loading, 'loggedIn:', loggedIn);

  if (loading) {
    return <div>Loading...</div>;
  }

  return loggedIn ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
