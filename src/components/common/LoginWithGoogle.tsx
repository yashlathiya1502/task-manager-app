import { Button } from '@mui/material';
import React from 'react';

interface PropsType {
    title: string;
}

const LoginWithGoogle = ({title}: PropsType) => {

    const loginWithGoogle = () => {
        window.open("http://localhost:8000/auth/google/callback", "_self")
    }

  return (
    <Button
      type='button'
      variant='contained'
      color='primary'
      sx={{
        mt: 2,
        display: 'block',
        margin: '0 auto',
        textTransform: 'none'
      }}
      onClick={loginWithGoogle}
    >
      {title} with <span className='font-bold'>Google</span>
    </Button>
  );
};

export default LoginWithGoogle;
