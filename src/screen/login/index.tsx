import React, { useState } from 'react';
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginUser } from '../../api/auth/authApi';
import AuthService from '../../utils/authService';
import { useNavigate } from 'react-router-dom';
import LoginWithGoogle from '../../components/common/LoginWithGoogle';

interface ILoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<ILoginData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<ILoginData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validate = (): boolean => {
    let formErrors: Partial<ILoginData> = {};

    if (!loginData.email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      formErrors.email = 'Email format is invalid';
    }
    if (!loginData.password) {
      formErrors.password = 'Password is required';
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      e.preventDefault();

      if (validate()) {
        const res = await loginUser(loginData);
        if (res.success && res?.data) {
          const { accessToken, refreshToken } = res.data;
          AuthService.setTokens(accessToken, refreshToken);
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        maxWidth: '440px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px',
      }}
    >
      <p className='font-bold text-[30px] text-primary text-left w-full mb-2'>
        Login
      </p>
      <Box
        sx={{ border: '1px solid grey', borderRadius: '10px', padding: '20px' }}
      >
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label='Email'
            name='email'
            value={loginData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            margin='normal'
            size='small'
          />

          <FormControl fullWidth variant='outlined' margin='normal'>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              size='small'
              name='password'
              value={loginData.password}
              onChange={handleChange}
              error={!!errors.password}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
            {errors.password && (
              <FormHelperText error>{errors.password}</FormHelperText>
            )}
          </FormControl>

          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 2, textTransform: 'none' }}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Login
          </Button>
        </form>

        <Typography variant='body1' align='center' sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Button component='a' href='/signup' sx={{ textTransform: 'none' }}>
            Signup
          </Button>
        </Typography>

        <LoginWithGoogle title="Login" />
      </Box>
    </Box>
  );
};

export default Login;
