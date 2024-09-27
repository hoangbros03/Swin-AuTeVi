import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        px: 2,
        mt: 'auto',
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        © 2024 Uranium 235 - The Swin Hackathon
      </Typography>
    </Box>
  );
};

export default Footer;
