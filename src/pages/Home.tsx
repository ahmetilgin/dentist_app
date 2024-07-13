import SearchIcon from '@mui/icons-material/Search';
import {
    AppBar,
    Box,
    Button,
    Chip,
    Container,
    Grid,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SearchComponent from '../components/SearchComponent';
import { QueryResult } from '../DataTypes';
import {
    useRootService,
    useRootStore,
} from '../providers/context_provider/ContextProvider';
import logo from '../static/logo.png';

const HomePage = observer(() => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'), {
        noSsr: true,
    });
    const { t } = useTranslation();
    const { httpService, jobService } = useRootService();
    const [selectedProfession, setSelectedProfession] = useState<string>('');
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const navigate = useNavigate();
    const { userStore, jobStore } = useRootStore();

    useEffect(() => {
        jobService.getPopularJobs();
    }, [jobService]);

    return (
        <Grid>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            flexGrow: 1,
                            textAlign: 'center',
                        }}
                    >
                        <img src={logo} alt="logo" style={{ width: '50px' }} />
                        <Typography variant="h6">{t('Karriere')}</Typography>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '20px',
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                navigate('/publish_new_job');
                            }}
                        >
                            {t('publish_job')}
                        </Button>
                        {userStore.isAuthenticated ? (
                            []
                        ) : (
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => {
                                    navigate('/login');
                                }}
                            >
                                {t('login_signup')}
                            </Button>
                        )}
                    </div>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
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
                            fetchOptions={(input) =>
                                httpService.get<QueryResult>(
                                    `/public/jobs/search_professions?query=${input}`
                                )
                            }
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
                            fetchOptions={(input) =>
                                httpService.get<QueryResult>(
                                    `/public/region?query=${input}`
                                )
                            }
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
                                jobService.searchJobs(
                                    selectedProfession,
                                    selectedRegion
                                );
                                navigate('/search_result');
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
                        />
                    ))}
                </Box>
                {isMobile ? (
                    <></>
                ) : (
                    <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                        {t('job_postings')}
                    </Typography>
                )}
            </Container>
        </Grid>
    );
});

export default HomePage;
