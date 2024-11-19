'use client';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';

import { useLoading, useRequest } from '@/components/App';
import { SuspenseLoader } from '@/components/App/Loader';
import { KEYPAIR, REQUEST } from '@/types/interfaces';
import { toastr, validateAuthentication } from '@/utils/helpers';

const initialValues = {
  email: '',
  password: '',
  rememberme: false,
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(100, 'Too Long!').required('Required'),
});

function Index() {
  const router = useRouter();
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const [viewPassword, setViewPassword] = useState(false);

  const validateToken = useCallback(() => {
    if (validateAuthentication()) {
      if (Cookies.get('rememberme') === '1') return router.push('/settings/accounts');
    }
  }, [router]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  const handleSubmit = async (values: KEYPAIR) => {
    console.log(values);
    try {
      const { data, status, message } = (await request('LoginUser', { ...values, userid: values.email })) as {
        data: any;
        status: boolean;
        message: string;
      };
      console.log('🚀 ~ handleSubmit ~ status:', status);
      if (status) {
        Cookies.set('accessToken', data?.authTokens?.accessToken);
        Cookies.set('refreshToken', data?.authTokens?.refreshToken);
        return router.push('/dashboard');
      } else {
        toastr('Login Failed', 'error', 'Login');
      }
    } catch (error) {
      console.log('🚀 ~ handleSubmit ~ error:', error);
      throw error;
    }
  };

  if (validateAuthentication()) {
    if (Cookies.get('rememberme') === '1') return <SuspenseLoader />;
  }

  return (
    <Box
      sx={{
        overflow: 'hidden',
        minHeight: '100vh',
        backgroundColor: '#070C27',
        display: 'flex',
        color: 'rgba(203, 204, 210, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#111633',
          width: '40%',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
        }}
      >
        <Typography sx={{ marginBottom: '21px' }} variant="h3" gutterBottom>
          LogIn
        </Typography>

        <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between', marginBottom: '40px' }}>
          <Button fullWidth startIcon={<GoogleIcon />} variant="contained">
            Login With Google
          </Button>
          <Button fullWidth startIcon={<AppleIcon />} variant="contained">
            Login With Apple
          </Button>
        </Box>

        <Divider sx={{ color: '#aeb9cb', margin: '40px 0' }}>
          <span>or Login with</span>
        </Divider>

        <Formik
          initialValues={initialValues}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, errors, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Box sx={{ marginBottom: '16px' }}>
                <FormControl fullWidth>
                  <TextField
                    label="Email or Username"
                    variant="outlined"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={values.email}
                    error={!!errors.email && touched.email}
                    helperText={errors.email && touched.email && errors.email}
                    fullWidth
                  />
                </FormControl>
              </Box>

              <Box sx={{ marginBottom: '16px' }}>
                <FormControl fullWidth>
                  <TextField
                    label="Password"
                    variant="outlined"
                    name="password"
                    type={viewPassword ? 'text' : 'password'}
                    onChange={handleChange}
                    error={!!errors.password && touched.password}
                    helperText={errors.password && touched.password && errors.password}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setViewPassword(!viewPassword)} edge="end">
                            {viewPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  color: 'rgba(203, 204, 210, 0.7)',
                }}
              >
                <FormControlLabel
                  control={<Checkbox name="rememberme" checked={values.rememberme} onChange={handleChange} />}
                  label="Remember me"
                />
                <Link href="/forgot-password" style={{ color: '#bf2fcc' }}>
                  Forgot password
                </Link>
              </Box>

              <Button variant="contained" sx={{ marginBottom: '30px' }} type="submit" fullWidth>
                {loading?.LoginUser_LOADING ? ButtonLoader() : 'Submit'}
              </Button>
            </form>
          )}
        </Formik>

        <Typography variant="body2" color="textSecondary">
          Don't have an Account?{' '}
          <Link href="/register" style={{ color: '#bf2fcc' }}>
            Signup
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Index;
