import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../utils/authService';

const AuthSuccess = () => {
    const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');

    if (accessToken && refreshToken) {
      AuthService.setTokens(accessToken, refreshToken);
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return <div>Logging you in...</div>;
};

export default AuthSuccess;
