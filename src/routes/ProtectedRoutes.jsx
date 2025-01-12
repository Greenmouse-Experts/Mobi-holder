// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../helpers/tokenValidator';

const ProtectedRoute = ({ children }) => {
  if (!isTokenValid()) {
    return <Navigate to="/login" replace />; // Redirect to login if token is invalid
  }
  return children; // Render the protected content
};

export default ProtectedRoute;
