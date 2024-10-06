import { Routes, Route } from 'react-router-dom';
import Login from '../screen/login';
import Signup from '../screen/signup';
import TaskManager from '../screen/taskManager/TaskManager';
import ProtectedRoute from './ProtectedRoute';
import AuthRestrictedRoute from './AuthRestrictedRoute';
import AuthSuccess from '../screen/AuthSuccess.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthRestrictedRoute />}>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<TaskManager />} />
      </Route>

      <Route path='/auth/success' element={<AuthSuccess />} />
      
    </Routes>
  );
};

export default AppRoutes;
