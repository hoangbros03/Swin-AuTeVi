'use client'

import React from 'react';
import { Box, Typography, TextField, Container, Stack, Button } from '@mui/material';
import Video from '../../models/Video';
import Input from '@/app/models/Input';
import { Delete } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const ViewVideo = () => {
    const router = useRouter();
    const video = router.query;
    const handleEdit = () => {

    }

    const handleDelete = () => {

    }
    return (
        <Container component="main" maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <video
                    width={500}
                    controls
                    src={`http://localhost:8080/api/videos/stream/data/${video.getUrl()}`}
                >
                    Your browser does not support the video tag.
                </video>
                <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    label="Video's prompt"
                    rows={2}
                    value={video.getInput().prompt}
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{ mt: 2 }}
                />
                <div style={{height: "20px"}} />
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                        variant="contained"
                        onClick={handleEdit}
                    >
                        Edit this video
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleDelete}
                        startIcon={<Delete />}
                    >
                        Delete video
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
};

export default ViewVideo;