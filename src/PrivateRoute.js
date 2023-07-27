/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider.js';

// Private Route wrapper which wraps components/pages
// Only authorised users are allowed to access and view private route content
const PrivateRoute = ({ children }) => {
  const { loggedIn, loading } = useContext(AuthContext);

  console.log('PrivateRoute - loading:', loading, 'loggedIn:', loggedIn);

  // if loading, no content is shown
  if (loading) {
    return <div>Loading...</div>;
  }

  // if the user is logged in, then child components are rendered, otherwise back to the login page
  return loggedIn ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
