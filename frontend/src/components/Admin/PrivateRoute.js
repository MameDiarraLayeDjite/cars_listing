import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default PrivateRoute;
