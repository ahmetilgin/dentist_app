import {
    Box,
    Card,
    CardContent,
    Chip,
    Skeleton,
    Stack,
    Typography
} from '@mui/material';
import { observer } from 'mobx-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRootStore } from '../providers/context_provider/ContextProvider';

const JobList = observer(() => {
    const { t } = useTranslation();
    const { jobStore } = useRootStore();
    // const { jobService } = useRootService();

    // const fetchJobs = useCallback(() => {
    //     jobService.getJobs();
    // }, [jobService]);

    // useEffect(() => {
    //     fetchJobs();
    // }, [fetchJobs]);

    if (jobStore.jobs.length === 0) {
        return <JobListSkeleton />
    }
    return <Stack spacing={2}>
        {jobStore.jobs.map((job) => (
            <Card key={job.UserID}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        {job.JobTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        {job.Location}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {job.Description}
                    </Typography>
                    <Typography variant="body2" paragraph>
                        <strong>{t('jobList.requirements')}:</strong> {job.Requirements}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Chip label={t(`employmentTypes.${job.EmploymentType}`)} color="primary" />
                        <Typography variant="body2">
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
            </Card>
        ))}
    </Stack>;
});

const JobListSkeleton: React.FC = () => (
    <Stack spacing={2}>
        {[1, 2, 3].map((index) => (
            <Card key={index}>
                <CardContent>
                    <Skeleton variant="rectangular" animation="wave" width="60%" height={40} />
                    <Skeleton variant="rectangular" animation="wave" width="40%" />
                    <Skeleton variant="rectangular" animation="wave" />
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                        <Skeleton variant="rectangular" width={100} height={32} />
                        <Skeleton variant="text" width="30%" />
                    </Box>
                </CardContent>
            </Card>
        ))}
    </Stack>
);

export default JobList;