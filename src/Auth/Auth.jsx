import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Fade,
  CircularProgress,
  Snackbar,
  Alert,
  Divider,
  Avatar,
  Stack,
} from '@mui/material';
import { Visibility, VisibilityOff, Google } from '@mui/icons-material';
import JoyButton from '@mui/joy/Button';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const Auth = () => {
  const [mode, setMode] = useState('login'); // login | register | 2fa | forgot
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    code: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [step, setStep] = useState(0); // for multi-step register

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/auth/login/`, {
        username: form.username,
        password: form.password,
      });
      if (res.data && res.data.requires_2fa) {
        setMode('2fa');
        handleSnackbar('Enter your 2FA code', 'info');
      } else if (res.data && res.data.access) {
        sessionStorage.setItem('token', res.data.access);
        handleSnackbar('Login successful!', 'success');
        window.location.href = '/dashboard';
      } else {
        handleSnackbar('Login failed', 'error');
      }
    } catch (err) {
      handleSnackbar('Invalid credentials', 'error');
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/auth/register/`, {
        username: form.username,
        email: form.email,
        password: form.password,
        confirm_password: form.confirmPassword,
      });
      if (res.data && res.data.access) {
        sessionStorage.setItem('token', res.data.access);
        handleSnackbar('Registration successful!', 'success');
        window.location.href = '/dashboard';
      } else {
        handleSnackbar(res.data.message || 'Registration failed', 'error');
      }
    } catch (err) {
      handleSnackbar('Registration failed', 'error');
    }
    setLoading(false);
  };

  const handle2FA = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/auth/verify-2fa/`, {
        username: form.username,
        code: form.code,
      });
      if (res.data && res.data.access) {
        sessionStorage.setItem('token', res.data.access);
        handleSnackbar('2FA successful!', 'success');
        window.location.href = '/dashboard';
      } else {
        handleSnackbar('Invalid 2FA code', 'error');
      }
    } catch (err) {
      handleSnackbar('2FA verification failed', 'error');
    }
    setLoading(false);
  };

  const handleSocialLogin = async () => {
    // Placeholder for Google OAuth
    handleSnackbar('Google login coming soon!', 'info');
  };

  const handleForgot = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/auth/password-reset/`, {
        email: form.email,
      });
      if (res.data && res.data.status === 'ok') {
        handleSnackbar('Password reset email sent!', 'success');
        setMode('login');
      } else {
        handleSnackbar('Failed to send reset email', 'error');
      }
    } catch (err) {
      handleSnackbar('Failed to send reset email', 'error');
    }
    setLoading(false);
  };

  // Animated background
  const bgStyle = {
    minHeight: '100vh',
    width: '100vw',
    background: 'linear-gradient(135deg, #6366f1 0%, #10b981 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  };

  return (
    <Box sx={bgStyle}>
      {/* Glassmorphism Card */}
      <Fade in>
        <Paper elevation={24} sx={{
          p: 5,
          borderRadius: 6,
          minWidth: 350,
          maxWidth: 400,
          backdropFilter: 'blur(16px)',
          background: 'rgba(255,255,255,0.15)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255,255,255,0.18)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Avatar sx={{ width: 64, height: 64, mb: 2, bgcolor: '#6366f1', boxShadow: 3 }}>₹</Avatar>
          <Typography variant="h4" fontWeight={700} mb={2} color="#fff">
            {mode === 'login' && 'Sign In'}
            {mode === 'register' && 'Sign Up'}
            {mode === '2fa' && '2FA Verification'}
            {mode === 'forgot' && 'Reset Password'}
          </Typography>
          <Stack spacing={2} sx={{ width: '100%' }}>
            {(mode === 'login' || mode === '2fa') && (
              <TextField
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                fullWidth
                autoFocus
                variant="outlined"
                sx={{ input: { color: '#fff' } }}
              />
            )}
            {mode === 'login' && (
              <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ input: { color: '#fff' } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((s) => !s)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
            {mode === 'register' && (
              <>
                <TextField
                  label="Username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  sx={{ input: { color: '#fff' } }}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  sx={{ input: { color: '#fff' } }}
                />
                <TextField
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  sx={{ input: { color: '#fff' } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((s) => !s)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  sx={{ input: { color: '#fff' } }}
                />
              </>
            )}
            {mode === '2fa' && (
              <TextField
                label="2FA Code"
                name="code"
                value={form.code}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ input: { color: '#fff' } }}
              />
            )}
            {mode === 'forgot' && (
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ input: { color: '#fff' } }}
              />
            )}
            <Fade in={loading} unmountOnExit>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress color="secondary" />
              </Box>
            </Fade>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 2, borderRadius: 3, fontWeight: 600, fontSize: '1.1rem', boxShadow: 3, background: 'linear-gradient(90deg, #6366f1 0%, #10b981 100%)' }}
              onClick={
                mode === 'login' ? handleLogin :
                mode === 'register' ? handleRegister :
                mode === '2fa' ? handle2FA :
                handleForgot
              }
              disabled={loading}
            >
              {mode === 'login' && 'Sign In'}
              {mode === 'register' && 'Sign Up'}
              {mode === '2fa' && 'Verify'}
              {mode === 'forgot' && 'Send Reset Email'}
            </Button>
            <Divider sx={{ my: 2, color: '#fff' }}>or</Divider>
            <JoyButton
              variant="soft"
              color="neutral"
              fullWidth
              startDecorator={<Google />}
              onClick={handleSocialLogin}
              sx={{ borderRadius: 3, fontWeight: 600, fontSize: '1.1rem', background: 'rgba(255,255,255,0.2)', color: '#fff', boxShadow: 2 }}
            >
              Continue with Google
            </JoyButton>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              {mode !== 'login' && (
                <Button color="secondary" onClick={() => setMode('login')}>Sign In</Button>
              )}
              {mode !== 'register' && (
                <Button color="secondary" onClick={() => setMode('register')}>Sign Up</Button>
              )}
              {mode !== 'forgot' && mode === 'login' && (
                <Button color="secondary" onClick={() => setMode('forgot')}>Forgot?</Button>
              )}
            </Box>
          </Stack>
        </Paper>
      </Fade>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Auth; 