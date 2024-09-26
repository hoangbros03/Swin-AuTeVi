import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Navbar = () => {
  return (
    <AppBar 
      position="fixed"
      color="transparent" 
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        transition: 'background-color 0.3s ease',
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
          <img src="/logo.png" alt="Logo" style={{ height: '35px' }} />
        </Box>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button disableRipple color="inherit" href="/">Home</Button>
          <Button disableRipple color="inherit" href="/campaign">Campaign</Button>
          <Button disableRipple color="inherit" href="/video">Video</Button>
          <Button disableRipple color="inherit" href="/about">Documentation</Button>
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" href="/login">Log In</Button>
          <Button 
            variant="contained"   
            href="/signup"
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
