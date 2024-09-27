'use client'

import React from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import { styled } from '@mui/system';
import Footer from '../components/Footer';


const DocumentPage = () => {
    return (
        <Container component="main" maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw' }}>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'start',
                    marginLeft: "400px",
                    marginRight: "400px",
                    marginTop: "150px"
                }}>
                <Typography variant='h2'>
                    Introduction
                </Typography>
                <div style={{height: "20px"}} />
                <Typography variant='body1' style={{ lineHeight: "30px" }}>
                    The application is an innovative video generation tool that allows users to create custom videos simply by providing a text prompt. Utilizing advanced AI algorithms, the app transforms user input into dynamic visual content, tailoring the video to reflect the themes, styles, or specific scenes described in the prompt. Whether for storytelling, marketing, or creative projects, this tool empowers users to generate high-quality, engaging videos without the need for technical expertise in video production.
                </Typography>
                <div style={{height: "30px"}} />
                <Divider flexItem  />
                <div style={{height: "30px"}} />
                <Typography variant='h3'>
                    Meet the team
                </Typography>
                <div style={{height: "20px"}} />
                <Typography variant='body1' style={{ lineHeight: "30px" }}>
                We are united by a shared passion for coding and innovating cutting-edge solutions. Hailing from two of Vietnam's universities, the University of Engineering and Technology (UET-VNU) and FPT University, we are driven by curiosity and a commitment to solving real-world challenges through technology. Each member brings a unique skill set, from software development to creative problem-solving, making them a dynamic force in their field. Together, we strive to push boundaries, harnessing the power of technology to create impactful and transformative solutions for the future.                </Typography>
            </Box>
            <Footer />
        </Container>
    );
};

export default DocumentPage;
