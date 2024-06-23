import { Container } from '@mui/material';
import React from 'react';
import Sidebar from '../components/Sidebar';


const Home: React.FC = () => {
    return (
        <Container component="main" maxWidth={false} style={{ padding: 0 }}>
            <Sidebar />
        </Container>
    );
};

export default Home;
