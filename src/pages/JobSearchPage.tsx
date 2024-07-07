import {
    Box,
    Container
} from '@mui/material';
import React from 'react';
import Filters from '../components/Filters';
import JobList from '../components/JobList';

const JobSearchPage: React.FC = () => {
    return (<Container maxWidth="lg">
        <Box sx={{ display: 'flex' }}>
            <Filters />
            <JobList />
        </Box>
    </Container>
    );
};

export default JobSearchPage;