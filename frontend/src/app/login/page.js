'use client'
import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper
} from '@mui/material';
import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', email, password);
  };

  return (
    <>
      <Container component="main" maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw' }}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '400px',
            }}
          >
            <Paper elevation={0} sx={{ padding: 4, width: '100%', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
              <Typography fontWeight={600} component="h1" variant="h6" align="center">
                Log in to Autevi
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  variant="filled"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  variant="filled"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    height: '50px',
                    mt: 3,
                    mb: 2,
                    backgroundColor: "black",
                    '&:hover': {
                      backgroundColor: "grey",
                    },
                    fontSize: '0.875rem',
                  }}
                >
                  Log In
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
        <Footer />
      </Container>
    </>
  );
};

export default Login;
