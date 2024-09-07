// HomePage.tsx
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Chip, Container, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SearchComponent from '../components/SearchComponent';
import { QueryResult } from '../DataTypes';
import { useRootService, useRootStore } from '../providers/context_provider/ContextProvider';

const HomePage = observer(() => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'), {
        noSsr: true,
    });
    const { t, i18n } = useTranslation();
    const { httpService, jobService } = useRootService();
    const [selectedProfession, setSelectedProfession] = useState<string>('');
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const navigate = useNavigate();
    const { jobStore } = useRootStore();

    useEffect(() => {
        jobService.getPopularJobs();
    }, [jobService]);

    return (
        <Grid>
            <Container maxWidth="lg" sx={{ mt: 4 }} className="background">
                <Typography variant="h4" gutterBottom color="text">
                    {t('discover_career_opportunities')}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {t('job_postings_thousands_of_companies')}
                </Typography>

                <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
                    <Grid item xs={12} sm={5}>
                        <SearchComponent
                            label="search_position_or_company"
                            fetchOptions={(input) => httpService.get<QueryResult>(`/public/jobs/search_professions/${input}`)}
                            onSelect={(selectedItem) => {
                                if (selectedItem != null) {
                                    setSelectedProfession(selectedItem);
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <SearchComponent
                            label="search_city_or_district"
                            fetchOptions={(input) => httpService.get<QueryResult>(`/public/country/${i18n.language}/${input}?`)}
                            onSelect={(selectedItem) => {
                                if (selectedItem != null) {
                                    setSelectedRegion(selectedItem);
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            size="large"
                            startIcon={<SearchIcon />}
                            sx={{ height: '56px' }}
                            onClick={() => {
                                navigate(`/search_result/${selectedProfession || '-'}/${selectedRegion || '-'}`);
                            }}
                        >
                            {t('find_job')}
                        </Button>
                    </Grid>
                </Grid>
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                    {t('popular_searches')}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {jobStore.popularJobs.map((item) => (
                        <Chip
                            key={item}
                            label={item}
                            clickable
                            color="secondary"
                            variant="outlined"
                            onClick={() => {
                                setSelectedProfession(item);
                                navigate(`/search_result/${item}/${i18n.language}`);
                            }}
                        />
                    ))}
                </Box>
                {!isMobile && (
                    <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                        {/* {t('job_postings')} */}
                    </Typography>
                )}
            </Container>
        </Grid>
    );
});

export default HomePage;
