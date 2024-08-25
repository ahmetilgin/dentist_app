// src/pages/ErrorPage.tsx

import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Bir önceki sayfaya git
    };

    return (
        <Container
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: '#ff6b6b' }}>
                404
            </Typography>
            <Typography variant="h4" sx={{ marginBottom: '16px' }}>
                Page Not Found
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '24px' }}>
                The page you're looking for doesn't exist or has been moved.
            </Typography>
            <Box>
                <Button variant="contained" color="primary" onClick={handleGoBack} sx={{ marginRight: '8px' }}>
                    Go Back
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>
                    Go to Home
                </Button>
            </Box>
        </Container>
    );
};

export default ErrorPage;
