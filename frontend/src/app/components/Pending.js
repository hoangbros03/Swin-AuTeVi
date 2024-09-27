'use client'
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const PendingPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <img src="/loading.gif" alt="Loading" height={300} width={300} />
      <Typography variant="h5" align="center" style={{ marginTop: '30px' }}>
        Please wait for Autevi to work its magic!
      </Typography>
    </Box>
  );
};

export default PendingPage;
