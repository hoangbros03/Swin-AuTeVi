import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  shadows: ["none"],
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#0070f3',
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans)',
    h1: {
      fontWeight: 800,
      fontSize: '3rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {  
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.8rem',
      lineHeight: 1.5,
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '0.5rem',
          padding: '0.5rem 1rem',
        },
        contained: {
          backgroundColor: '#000000',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
        },
        outlined: {
          borderColor: 'rgba(128, 128, 128, 0.2)',
          color: '#000000',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          borderBottom: '1px solid #eaeaea',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            fontSize: '0.875rem', // Smaller font size for TextField labels
          },
        },
      },
    },
  },
});

export default theme;
