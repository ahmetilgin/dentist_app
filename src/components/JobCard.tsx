import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

interface JobCardProps {
    title: string;
    company: string;
    location: string;
    type: string;
}

const JobCard: React.FC<JobCardProps> = ({ title, company, location, type }) => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography color="textSecondary">{company}</Typography>
                <Typography color="textSecondary">{location}</Typography>
                <Typography color="textSecondary">{type}</Typography>
            </CardContent>
        </Card>
    );
};

export default JobCard;
