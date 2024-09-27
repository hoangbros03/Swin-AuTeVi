'use client'
import React, { useState } from 'react';
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Stack
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Footer from '../../components/Footer';

const EditVideo = () => {
    const [prompt, setPrompt] = useState('');
    const [files, setFiles] = useState([]);

    const handlePromptChange = (event) => {
        setPrompt(event.target.value);
    };

    const handleFileUpload = (event) => {
        setFiles([...files, ...event.target.files]);
    };

    const handleEdit = () => {
        // Handle video creation logic here
        console.log('Creating video with prompt:', prompt);
        console.log('Uploaded files:', files);
    };

    const handleCancel = () => {
        // Handle cancellation logic here
        console.log('Cancelled video creation');
    };

    const handleRemoveFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    return (
        <Container component="main" maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw' }}>
            <Box sx={{ flexGrow: 1, padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Paper elevation={0} sx={{ padding: 4, width: '100%', maxWidth: '800px', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Edit Video
                    </Typography>
                    <Typography variant="subtitle1" color='grey[200]' gutterBottom>
                       Modify your prompt to edit this video. <a href="/doc" style={{ textDecoration: 'none', color: 'blue' }}>Visit docs ↗</a>
                    </Typography>
                    <div style={{ height: 30 }} />
                    <TextField
                        fullWidth
                        multiline
                        rows={6}
                        variant="outlined"
                        label="Your prompt"
                        value={prompt}
                        onChange={handlePromptChange}
                        sx={{ mb: 3 }}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        sx={{ mb: 3 }}
                    >
                        Upload Files
                        <input
                            type="file"
                            hidden
                            multiple
                            onChange={handleFileUpload}
                        />
                    </Button>
                    {files.length > 0 && (
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                Files selected:
                            </Typography>
                            {files.map((file, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="body2" sx={{ flexGrow: 1, fontStyle: 'italic' }}>
                                        {file.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <Button size="small" onClick={() => handleRemoveFile(index)}>
                                            Remove
                                        </Button>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button
                            variant="outlined"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleEdit}
                        >
                            Edit
                        </Button>
                    </Stack>
                </Paper>
            </Box>
            <Footer />
        </Container>
    );
};

export default EditVideo;
