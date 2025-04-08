// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../helpers/tokenValidator';

const AdminProtectedRoute = ({ children }) => {
  if (!isTokenValid()) {
    return <Navigate to="/admin" replace />; // Redirect to login if token is invalid
  }
  return children; // Render the protected content
};

export default AdminProtectedRoute;
