'use client'
import React from 'react';
import { Box, Paper, Typography, IconButton, Stack, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';
import Footer from '../components/Footer';

const VideoCard = styled(Paper)(({ theme }) => ({
  height: 150,
  width: 150,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.grey[150]}`,
  //transition: 'all 0.3s ease-in-out',
  '&:hover': {
    border: `1px solid ${theme.palette.grey[200]}`,
  },
}));

const AddCard = styled(VideoCard)(({ theme }) => ({
  backgroundColor: 'transparent',
  border: `1px solid ${theme.palette.grey[200]}`,
}));


const VideoPage = () => {
  const [videos, setVideos] = React.useState([]);

  React.useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/api/videos');
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        const videoObjects = data.map(videoData => new Video(
          videoData.id,
          videoData.url,
          videoData.jsonObject,
          videoData.description,
          videoData.input
        ));
        setVideos(videoObjects);
      } catch (error) {
        console.error('Error fetching videos:', error);
        // Handle the error appropriately, e.g., show an error message to the user
      }
    };

    fetchVideos();
  }, []);

  return (
    <Container component="main" maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw' }}>
      <Box sx={{ flexGrow: 1, padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h2" gutterBottom>
          Autevi Videos
        </Typography>
        <Typography variant="subtitle1" color='grey[200]' gutterBottom>
          Create a new video or select an existing one to edit. <a href="/doc" style={{ textDecoration: 'none', color: 'blue' }}>Visit docs ↗</a>
        </Typography>
        <div style={{ height: 30 }} />
        <Stack direction="row" spacing={3} flexWrap="wrap" justifyContent="center" alignItems="center">
          <Box>
            <AddCard sx={{ height: 180, width: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton size="large" color="primary" href='video/create'>
                <AddIcon fontSize="large" />
              </IconButton>
              <Typography variant="h6">Create New Video</Typography>
            </AddCard>
          </Box>
          {videos.map((video) => (
            <Box key={video.getId()} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <VideoCard sx={{ height: 180, width: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6">{video.getInput().prompt.substring(0, 20)}...</Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {video.getId()}
                </Typography>
              </VideoCard>
            </Box>
          ))}
        </Stack>
      </Box>
      <Footer />
    </Container>
  );
};

export default VideoPage;
