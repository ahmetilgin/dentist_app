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
    TextField,
    Toolbar,
    Typography,
    useMediaQuery
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import JobList from '../components/JobList';

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

const HomePage: React.FC = () => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { t } = useTranslation()

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
                        <Button color="inherit">{t("search_job")}</Button>
                        <Button color="inherit">{t("career_planning")}</Button>
                        <Button color="inherit">{t("career_guide")}</Button>
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
                    <TextField
                        label={t("search_position_or_company")}
                        variant="outlined"
                        color={"primary"}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        label={t("search_city_or_district")}
                        variant="outlined"
                        color={"primary"}

                        fullWidth
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
                {t("ÖNE ÇIKAN İLANLAR")}
            </Typography>
            <JobList />
        </Container>
    </Grid>
};

export default HomePage;