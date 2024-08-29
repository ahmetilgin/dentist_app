import { Button, Card, CardContent, CardHeader, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QueryResult } from '../DataTypes';
import { useRootService } from '../providers/context_provider/ContextProvider';
import SearchComponent from './SearchComponent';

export enum EmploymentType {
    NO_OPTION_SELECTED = "-",
    ON_SITE = "on_site",
    FULL_TIME = "full_time",
    PART_TIME = "part_time",
    REMOTE = "remote",
    HYBRID = "hybrid"
}


const PublishNewJob = () => {
    const [job, setJob] = useState({
        jobTitle: '',
        description: '',
        requirements: '',
        location: '-',
        salaryRange: '-',
        employmentType: EmploymentType.ON_SITE,
        datePosted: new Date().getTime(), // convert to timestamp
        applicationDeadline: new Date().getTime(), // convert to timestamp
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setJob({ ...job, [name]: value });
    };

    const handleDateChange = (name: any, newValue: any) => {
        const timestamp = new Date(newValue).getTime(); // convert to timestamp
        setJob({ ...job, [name]: timestamp });
    };

    const { t, i18n } = useTranslation();


    const { httpService, jobService } = useRootService()

    return (
        <Container maxWidth="sm">
            <Card>
                <CardHeader title={t("post_new_job_header")} />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label={t("job_title")}
                                name="jobTitle"
                                value={job.jobTitle}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label={t("job_description")}
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
                                label={t("job_requirements")}
                                name="requirements"
                                multiline
                                rows={4}
                                value={job.requirements}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SearchComponent
                                label="search_city_or_district"
                                fetchOptions={(input) =>
                                    httpService.get<QueryResult>(
                                        `/public/country/${i18n.language}/${input}?`
                                    )
                                }
                                onSelect={(selectedItem) => {
                                    if (selectedItem != null) {
                                        setJob({ ...job, "location": selectedItem });
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label={t("job_salary_range")}
                                name="salaryRange"
                                value={job.salaryRange}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel >{t("employment_type")}</InputLabel>
                                <Select
                                    value={job.employmentType}
                                    name="employmentType"
                                    label={t("employment_type")}
                                    onChange={(event: SelectChangeEvent<string>) => {
                                        handleChange(event)
                                    }}
                                >
                                    {Object.values(EmploymentType).map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {t(type)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label={t("application_deadline")}
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
                                {t("publish_job")}
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>

            </Card>
        </Container>
    );
};

export default PublishNewJob;