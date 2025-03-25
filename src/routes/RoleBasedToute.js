import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';  // No need to destructure, use directly

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem('jwtToken');  // Get token from localStorage
  if (!token) {
    return <Navigate to="/login" replace />;  // Redirect if no token
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    // Check if the user has one of the allowed roles
    if (allowedRoles.includes(userRole)) {
      return children;  // Render the component if the role matches
    } else {
      return <Navigate to="/login" replace />;  // Redirect if role doesn't match
    }
  } catch (error) {
    console.error('Invalid token', error);
    return <Navigate to="/login" replace />;  // Redirect if token is invalid
  }
};

export default RoleBasedRoute;
