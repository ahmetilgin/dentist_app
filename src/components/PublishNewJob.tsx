import { Button, Card, CardContent, CardHeader, Container, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRootService } from '../providers/context_provider/ContextProvider';

const PublishNewJob = () => {
    const [job, setJob] = useState({
        jobTitle: '',
        description: '',
        requirements: '',
        location: '',
        salaryRange: '',
        employmentType: '',
        datePosted: new Date().getTime(), // convert to timestamp
        applicationDeadline: new Date().getTime(), // convert to timestamp
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setJob({ ...job, [name]: value });
    };

    const handleDateChange = (name: any, newValue: any) => {
        const timestamp = new Date(newValue).getTime(); // convert to timestamp
        setJob({ ...job, [name]: timestamp });
    };

    const { t } = useTranslation();


    const { jobService } = useRootService()

    return (
        <Container maxWidth="sm">
            <Card>
                <CardHeader title={t("post_new_job_header")} />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Job Title"
                                name="jobTitle"
                                value={job.jobTitle}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                multiline
                                rows={4}
                                value={job.description}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Requirements"
                                name="requirements"
                                multiline
                                rows={4}
                                value={job.requirements}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Location"
                                name="location"
                                value={job.location}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Salary Range"
                                name="salaryRange"
                                value={job.salaryRange}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Employment Type"
                                name="employmentType"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}> {/* Date picker for deadline */}
                            <TextField
                                fullWidth
                                label="Application Deadline"
                                type="date"
                                name="applicationDeadline"
                                onChange={(e) => handleDateChange('applicationDeadline', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={
                                () => {
                                    jobService.publishJob(job)
                                }
                            }>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>

            </Card>
        </Container>
    );
};

export default PublishNewJob;