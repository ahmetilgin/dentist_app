import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Card, CardActions, CardContent, Chip, Collapse, IconButton, Skeleton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TypeJob } from '../DataTypes';
import { useRootStore } from '../providers/context_provider/ContextProvider';

type JobCardProps = {
    job: TypeJob;
    handleApply: (job: TypeJob) => void;
    isMobile: boolean;
    t: (key: string) => string;
};

const JobList: React.FC = observer(() => {
    const { t } = useTranslation();
    const { jobStore } = useRootStore();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const handleApply = (job: TypeJob) => {
        if (job) {
            navigate('/job_detail', { state: { job: Object.assign({}, job) } });
        }
        // Burada başvuru işlemi için gerekli fonksiyonu çağırabilirsiniz
        console.log(`Applying for job with ID: ${job}`);
    };

    if (jobStore.jobs.length === 0) {
        return <JobListSkeleton />;
    }

    return (
        <Stack spacing={2} sx={{ width: '100%', padding: theme.spacing(2) }}>
            {jobStore.jobs.map((job: TypeJob) => (
                <JobCard key={job.UserID} job={job} handleApply={handleApply} isMobile={isMobile} t={t} />
            ))}
        </Stack>
    );
});

const JobCard: React.FC<JobCardProps> = ({ job, handleApply, isMobile, t }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant={isMobile ? 'h6' : 'h5'} component="div" gutterBottom>
                    {job.JobTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {job.Location}
                </Typography>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Typography variant="body2" paragraph>
                        {job.Description}
                    </Typography>
                </Collapse>
                {!expanded && (
                    <Typography variant="body2" paragraph>
                        {job.Description.length > 100 ? `${job.Description.substring(0, 100)}...` : job.Description}
                    </Typography>
                )}
                <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                    <Chip label={t(`employmentTypes.${job.EmploymentType}`)} color="primary" size={isMobile ? 'small' : 'medium'} />
                    <Typography variant="body2" sx={{ mt: isMobile ? 1 : 0 }}>
                        {t('jobList.salary')}: {job.SalaryRange}
                    </Typography>
                </Box>
                <Box mt={2}>
                    <Typography variant="caption" display="block">
                        {t('jobList.postedOn')}: {job.DatePosted}
                    </Typography>
                    <Typography variant="caption" display="block">
                        {t('jobList.applicationDeadline')}: {job.ApplicationDeadline}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <IconButton onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
                <Button variant="outlined" color="primary" onClick={() => handleApply(job)} size={isMobile ? 'small' : 'medium'}>
                    {t('apply')}
                </Button>
            </CardActions>
        </Card>
    );
};

const JobListSkeleton: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Stack spacing={2} sx={{ width: '100%', padding: theme.spacing(2) }}>
            {[1, 2, 3].map((index) => (
                <Card key={index}>
                    <CardContent>
                        <Skeleton variant="rectangular" animation="wave" width="60%" height={isMobile ? 30 : 40} />
                        <Skeleton variant="rectangular" animation="wave" width="40%" />
                        <Skeleton variant="rectangular" animation="wave" />
                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} flexWrap="wrap">
                            <Skeleton variant="rectangular" width={80} height={isMobile ? 24 : 32} />
                            <Skeleton variant="text" width="30%" />
                        </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end', padding: theme.spacing(2) }}>
                        <Skeleton variant="rectangular" width={100} height={isMobile ? 30 : 36} />
                    </CardActions>
                </Card>
            ))}
        </Stack>
    );
};

export default JobList;
