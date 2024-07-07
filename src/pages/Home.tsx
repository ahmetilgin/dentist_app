import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {
    AppBar,
    Box,
    Button,
    Chip,
    Container,
    createTheme,
    Grid,
    Toolbar,
    Typography,
    useMediaQuery
} from '@mui/material';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import JobList from '../components/JobList';
import SearchComponent from '../components/SearchComponent';
import { QueryResult } from '../DataTypes';
import { useRootService } from '../providers/context_provider/ContextProvider';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4CAF50',
        },
        secondary: {
            main: '#2196F3',
        },
    },
});

const HomePage = observer(() => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { t } = useTranslation()
    const { httpService, jobService } = useRootService()
    const [selectedProfession, setSelectedProfession] = useState<string>("");
    const [selectedRegion, setSelectedRegion] = useState<string>("");
    const navigate = useNavigate();

    return <Grid>
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>{t("logo")}</Typography>
                {isMobile ? (
                    <Button color="inherit">
                        <MenuIcon />
                    </Button>
                ) : (
                    <>
                        <Button color="inherit" onClick={() => {
                            navigate("/publish_new_job")
                        }} >{t("publish_job")}</Button>
                        <Button variant="outlined" color="secondary">{t("login_signup")}</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom color="text">
                {t("discover_career_opportunities")}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                74.481 {t("job_postings_thousands_of_companies")}
            </Typography>

            <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
                <Grid item xs={12} sm={5}>
                    <SearchComponent
                        label='search_position_or_company'
                        fetchOptions={(input) => httpService.get<QueryResult>(`/public/jobs/search_professions?query=${input}`)}
                        onSelect={(selectedItem) => {
                            if (selectedItem != null) {
                                setSelectedProfession(selectedItem)
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <SearchComponent
                        label='search_city_or_district'
                        fetchOptions={(input) => httpService.get<QueryResult>(`/public/region?query=${input}`)}
                        onSelect={(selectedItem) => {
                            if (selectedItem != null) {
                                setSelectedRegion(selectedItem)
                            }
                        }
                        }
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
                            navigate("/search_result")
                        }}
                    >
                        {t("find_job")}
                    </Button>
                </Grid>
            </Grid>

            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                {t("popular_searches")}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {[
                    t("financial_expert"),
                    t("digital_marketing_expert"),
                    t("software_development_expert"),
                    t("project_manager"),
                    t("hr_expert"),
                    t("istanbul"),
                    t("ankara")
                ].map((item) => (
                    <Chip key={item} label={item} clickable color="secondary" variant="outlined" />
                ))}
            </Box>
            <Typography variant="h5" gutterBottom color="primary">
                {t("featuredJobs")}
            </Typography>
            <JobList />
        </Container>
    </Grid>
});

export default HomePage;