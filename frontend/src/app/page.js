'use client'

import React from "react";
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import Link from 'next/link';
import { DocumentScannerOutlined } from "@mui/icons-material";
import Footer from "./components/Footer";


export default function Page() {
  return (
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
        <Typography variant="h1" component="h1" gutterBottom>
          Autevi: AI-Powered Video Generation
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontFamily: 'var(--font-geist-mono)', color: 'grey.800' }}>
          Create stunning videos with the power of artificial intelligence
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 4 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<MovieIcon />}
            component={Link}
            href="/video/create"
            sx={{
              height: '55px',
              padding: '8px 32px',
            }}
          >
            Create Video
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<DocumentScannerOutlined />}
            component={Link}
            href="/video/document"
            sx={{
              height: '55px',
              padding: '8px 32px',
            }}
          >
            Documentation
          </Button>
        </Box>
      </Box>
    <Footer />
    </Container>
  );
}
