'use client'
import React, { useState } from 'react';
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Stack,
    Radio
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Footer from '../../components/Footer';
import LanguageDetect from 'languagedetect';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import PendingPage from '@/app/components/Pending';

const CreateVideo = () => {
    const [prompt, setPrompt] = useState('');
    const [files, setFiles] = useState([]);
    const [lang, setLang] = useState("English");
    const [slide, setSlide] = useState(false);
    const [document, setDocument] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [name, setName] = useState('');
    const detector = new LanguageDetect();
    const router = useRouter();

    const handlePromptChange = (event) => {
        setPrompt(event.target.value);
        const detectedLang = detector.detect(event.target.value);
        const englishScore = detectedLang.find(lang => lang[0].toLowerCase() === 'english')?.[1] || 0;
        const vietnameseScore = detectedLang.find(lang => lang[0].toLowerCase() === 'vietnamese')?.[1] || 0;
        setLang(englishScore >= vietnameseScore ? "English" : "Vietnamese");
    };

    const handleFileUpload = (event) => {
        setFiles([...files, ...event.target.files]);
    };

    const handleCreate = async () => {
        setIsPending(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('prompt', prompt);
        formData.append('language', lang);
        formData.append('slide', slide.toString());
        formData.append('document', document.toString());
        files.forEach((file, index) => {
            formData.append(`files`, file);
        });

        try {
            console.log(formData);
            const response = await axios.post(`http://127.0.0.1:8080/api/videos`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const video = response.data;
            console.log('Video created:', JSON.stringify(video));
            router.push({
                pathname: '/video/view',
                query: { video: JSON.stringify(video) },
            });
        } catch (error) {
            console.error('Error creating video:', error);
            setIsPending(false);
            // Handle the error appropriately
        }
    };

    const handleCancel = () => {
        // Handle cancellation logic here
        console.log('Cancelled video creation');
    };

    const handleRemoveFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    if (isPending) {
        return <PendingPage />;
    }

    return (
        <Container component="main" maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw' }}>
            <Box sx={{ flexGrow: 1, padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Paper elevation={0} sx={{ padding: 4, width: '100%', maxWidth: '800px', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Create New Video
                    </Typography>
                    <Typography variant="subtitle1" color='grey[200]' gutterBottom>
                       Enter your prompt to create a video. <a href="/doc" style={{ textDecoration: 'none', color: 'blue' }}>Visit docs ↗</a>
                    </Typography>
                    <div style={{ height: 30 }} />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Video Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={6}
                        variant="outlined"
                        label="Enter your prompt"
                        value={prompt}
                        onChange={handlePromptChange}
                        sx={{ mb: 3 }}
                    />
                    <Button
                        variant="outlined"
                        sx={{ mb: 3, mr: 2 }}
                    >
                        Language: {lang}
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ mb: 3, mr: 2 }}
                        onClick={() => setSlide(!slide)}
                        startIcon={<Radio checked={slide} />}
                    >
                        Make Slide
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ mb: 3, mr: 2 }}
                        onClick={() => setDocument(!document)}
                        startIcon={<Radio checked={document} />}
                    >
                        Make Document
                    </Button>
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
                            onClick={handleCreate}
                        >
                            Create
                        </Button>
                    </Stack>
                </Paper>
            </Box>
            <Footer />
        </Container>
    );
};

export default CreateVideo;
