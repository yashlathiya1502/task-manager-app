import ListAltIcon from '@mui/icons-material/ListAlt';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../utils/authService';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };
  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogout = async () => {
    await AuthService.logout();
  };

  return (
    <header className='bg-primary text-white px-4 py-2'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center'>
          <ListAltIcon className='h-8 w-8 text-white' />
        </div>

        <div>
          {AuthService.isLoggedIn() ? (
            <button
              onClick={handleLogout}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 ml-2   rounded'
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className='bg-white text-primary font-bold py-1 px-4 ml-2   rounded'
              >
                Login
              </button>
              <button
                onClick={handleSignup}
                className=' text-white font-bold py-1 px-4 rounded ml-2'
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
