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


const CampaignPage = () => {
  const [campaigns, setCampaigns] = React.useState([]);

  React.useEffect(() => {
    // Mock campaign data
    const mockCampaigns = [
        {
            id: '1',
            name: 'Asia Geographic',
            description: 'Festive campaign for winter holidays',
            targetAudience: 'All demographics',
            status: '10.10'
          },
      {
        id: '1',
        name: 'Summer Sale',
        description: 'Promote our summer collection with special discounts',
        targetAudience: 'Young adults, 18-35',
        status: '12.09'
      },
      {
        id: '2',
        name: 'Back to School',
        description: 'Highlight our educational products for the new school year',
        targetAudience: 'Parents and students',
        status: '05.09'
      },
    ];

    setCampaigns(mockCampaigns);
  }, []);

  return (
    <Container component="main" maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw' }}>
      <Box sx={{ flexGrow: 1, padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h2" gutterBottom>
          Autevi Campaign
        </Typography>
        <Typography variant="subtitle1" color='grey[200]' gutterBottom>
          A targeted campaign to influence your key audiences more effectively. <a href="/doc" style={{ textDecoration: 'none', color: 'blue' }}>Visit docs ↗</a>
        </Typography>
        <div style={{ height: 30 }} />
        <Stack direction="row" spacing={3} flexWrap="wrap" justifyContent="center" alignItems="center">
          <Box>
            <AddCard sx={{ height: 180, width: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton size="large" color="primary" href='campaign/create'>
                <AddIcon fontSize="large" />
              </IconButton>
              <Typography variant="h6">Create Campaign</Typography>
            </AddCard>
          </Box>
          {campaigns.map((campaign) => (
            <Box key={campaign.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <VideoCard sx={{ height: 180, width: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6">{campaign.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {campaign.status}
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

export default CampaignPage;
