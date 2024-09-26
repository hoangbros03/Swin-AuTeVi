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

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [organization, setOrganization] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle sign up logic here
    console.log('Sign up attempt with:', email, password, username, organization);
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
                Sign up for Autevi
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  variant="filled"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                  autoComplete="new-password"
                  variant="filled"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="organization"
                  label="Organization"
                  name="organization"
                  autoComplete="organization"
                  value={organization}
                  variant="filled"
                  onChange={(e) => setOrganization(e.target.value)}
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
                  Sign Up
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

export default SignUp;
