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
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth/authApi';

interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Partial<IFormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validate = (): boolean => {
    let formErrors: Partial<IFormData> = {};

    if (!formData.firstName) formErrors.firstName = 'First name is required';
    if (!formData.lastName) formErrors.lastName = 'Last name is required';
    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email format is invalid';
    }
    if (!formData.password) {
      formErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.confirmPassword !== formData.password) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      e.preventDefault();

      if (validate()) {
        const res = await registerUser(formData);

        if (res.success) {
          navigate('/login');
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
        Signup
      </p>
      <Box
        sx={{ border: '1px solid grey', borderRadius: '10px', padding: '20px' }}
      >
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label='First Name'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            fullWidth
            margin='normal'
            size='small'
          />

          <TextField
            label='Last Name'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
            fullWidth
            margin='normal'
            size='small'
          />

          <TextField
            label='Email'
            name='email'
            value={formData.email}
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
              value={formData.password}
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

          <FormControl fullWidth variant='outlined' margin='normal'>
            <InputLabel>Confirm Password</InputLabel>
            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              size='small'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle confirm password visibility'
                    onClick={handleClickShowPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Confirm Password'
            />
            {errors.confirmPassword && (
              <FormHelperText error>{errors.confirmPassword}</FormHelperText>
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
            Signup
          </Button>
        </form>

        <Typography variant='body1' align='center' sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Button component='a' href='/login' sx={{ textTransform: 'none' }}>
            Login
          </Button>
        </Typography>

        <Button
          type='button'
          variant='contained'
          color='primary'
          sx={{
            mt: 2,
            display: 'block',
            margin: '0 auto',
            textTransform: 'none',
          }}
        >
          Sign up with <span className='font-bold'>Google</span>
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
