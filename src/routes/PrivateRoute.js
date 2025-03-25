import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('jwtToken');  // Check for the token

  return isAuthenticated ? (
    children  // Render the children (protected component) if authenticated
  ) : (
    <Navigate to="/login" replace />  // Redirect to login if not authenticated
  );
};

export default PrivateRoute;
