import InboxIcon from "@mui/icons-material/Inbox";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {
    AppBar,
    Avatar,
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    Chip,
    CircularProgress,
    Container,
    createTheme,
    Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle, Divider,
    FormControlLabel,
    FormLabel,
    Grid,
    LinearProgress,
    Link,
    List, ListItem, ListItemText,
    MenuItem,
    Paper,
    Radio, RadioGroup,
    Select,
    Slider,
    Switch,
    Tab,
    Tabs,
    TextField,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

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
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Grid>
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
                            {/* <ThemeLanguageSelector /> */}
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
                <Grid container spacing={3} sx={{ mt: 10 }}>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="div" gutterBottom>
                            Theme
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>Buttons</Typography>
                            <Button variant="contained" color="primary">Primary</Button>
                            <Button variant="outlined" color="secondary" sx={{ ml: 2 }}>Secondary</Button>
                            <Button variant="text" sx={{ ml: 2 }}>Text</Button>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>Text Fields</Typography>
                            <TextField label="Standard" variant="standard" sx={{ mr: 2 }} />
                            <TextField label="Filled" variant="filled" sx={{ mr: 2 }} />
                            <TextField label="Outlined" variant="outlined" />
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>Selection Controls</Typography>
                            <FormControlLabel control={<Checkbox />} label="Checkbox" />
                            <FormControlLabel control={<Switch />} label="Switch" sx={{ ml: 2 }} />
                            <FormLabel component="legend">Radio Group</FormLabel>
                            <RadioGroup row>
                                <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                                <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                                <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
                            </RadioGroup>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>Select</Typography>
                            <Select defaultValue="" displayEmpty>
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>Sliders</Typography>
                            <Slider defaultValue={30} aria-label="Default" valueLabelDisplay="auto" />
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>Progress</Typography>
                            <CircularProgress sx={{ mr: 2 }} />
                            <LinearProgress />
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>Card</Typography>
                            <Card>
                                <CardContent>
                                    <Typography color="text.secondary" gutterBottom>Word of the Day</Typography>
                                    <Typography variant="h5" component="div">be•nev•o•lent</Typography>
                                    <Typography color="text.secondary">adjective</Typography>
                                    <Typography variant="body2">well meaning and kindly.</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>List</Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="Item 1" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Item 2" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Item 3" />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>Tabs</Typography>
                            <Tabs value={0} aria-label="basic tabs example">
                                <Tab label="Item One" />
                                <Tab label="Item Two" />
                                <Tab label="Item Three" />
                            </Tabs>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>Avatar</Typography>
                            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>A</Avatar>
                            <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}><InboxIcon /></Avatar>
                            <Avatar src="https://via.placeholder.com/40" />
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>Breadcrumbs</Typography>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" href="/">Home</Link>
                                <Link color="inherit" href="/getting-started/installation/">Installation</Link>
                                <Typography color="text.primary">Components</Typography>
                            </Breadcrumbs>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>Dialog</Typography>
                            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                Open Dialog
                            </Button>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Subscribe</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        To subscribe to this website, please enter your email address here. We will send updates occasionally.
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Email Address"
                                        type="email"
                                        fullWidth
                                        variant="standard"
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handleClose}>Subscribe</Button>
                                </DialogActions>
                            </Dialog>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>Divider</Typography>
                            <Divider />
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Divider content
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>Tooltip</Typography>
                            <Tooltip title="Delete">
                                <Button>Delete</Button>
                            </Tooltip>
                        </Paper>
                    </Grid>
                </Grid>
                {/* <Typography variant="h5" gutterBottom color="primary">
                    {t("ÖNE ÇIKAN İLANLAR")}
                </Typography> */}
            </Container>
        </Grid>
    );
};

export default HomePage;