import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthService from '../utils/authService';

const AuthRestrictedRoute = () => {
  const location = useLocation();
  if (AuthService.isLoggedIn()) {
    return <Navigate to={location.pathname} />;
  }
  return <Outlet />; // Render child routes
};

export default AuthRestrictedRoute;
