import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../utils/authService';

const ProtectedRoute = () => {
  if (!AuthService.isLoggedIn()) {
    return <Navigate to='/login' />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
