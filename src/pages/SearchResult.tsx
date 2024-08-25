import {
    Box,
    Container
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Filters from '../components/Filters';
import JobList from '../components/JobList';
import { useRootService } from '../providers/context_provider/ContextProvider';

const JobSearchPage: React.FC = () => {
    let { keyword, region } = useParams();
    const { jobService } = useRootService();
    const navigate = useNavigate();

    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => {
            return jobService.searchJobs(keyword || '-', region || '-')
        }
    })

    if (isPending) {
        return <div className={"loader"}></div>
    }

    if (error) {
        navigate('/error');
    }


    return (<Container maxWidth="lg">
        <Box sx={{ display: 'flex' }}>
            <Filters />
            <JobList jobList={data} />
        </Box>
    </Container>
    );
};

export default JobSearchPage;