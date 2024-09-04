import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (token) {
    return children; // User is authenticated, render children
  } else {
    return <Navigate to="/login" />; // User is not authenticated, redirect to login
  }
};

export default PrivateRoute;
