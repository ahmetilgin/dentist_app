import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
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

    return (
        <Grid>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>kariyer.net</Typography>
                    {isMobile ? (
                        <Button color="inherit">
                            <MenuIcon />
                        </Button>
                    ) : (
                        <>
                            <Button color="inherit">İş Ara</Button>
                            <Button color="inherit">Kariyer Planlaması</Button>
                            <Button color="inherit">Kariyer Rehberi</Button>
                            <Button variant="contained" color="secondary">Giriş Yap / Üye Ol</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom color="primary">
                    Kariyer Fırsatlarını Keşfet
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    74.481 iş ilanı on binlerce şirket
                </Typography>

                <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            label="Muhaseb"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            label="Şehir veya ilçe ara"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            size="large"
                            startIcon={<SearchIcon />}
                            sx={{ height: '56px' }}
                        >
                            İŞ BUL
                        </Button>
                    </Grid>
                </Grid>

                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                    POPÜLER ARAMALAR
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {['Finans Uzmanı', 'Dijital Pazarlama Uzmanı', 'Yazılım Geliştirme Uzmanı', 'Proje Yöneticisi', 'İK Uzmanı', 'İstanbul (Avrupa)', 'İstanbul (Asya)', 'Ankara', 'İzmir', 'Bursa', 'İstanbul'].map((item) => (
                        <Chip key={item} label={item} clickable color="primary" variant="outlined" />
                    ))}
                </Box>

                <Card sx={{ display: 'flex', mb: 4, boxShadow: 3, flexDirection: isMobile ? 'column' : 'row' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: isMobile ? '100%' : 200, height: isMobile ? 200 : 'auto' }}
                        image="/path-to-amazon-image.jpg"
                        alt="Amazon job ad"
                    />
                    <CardContent>
                        <Typography variant="h5" component="div" color="primary">
                            İstanbul Tuzla'daki merkezde Depo Operatörü olabilirsin!
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Alacağın eğitimle lojistiği burada öğrenebilir, aylık 26.790 TL'ye* kadar brüt maaş kazanabilirsin
                        </Typography>
                        <Button variant="contained" color="secondary" sx={{ mt: 2 }}>Hemen Başvur</Button>
                    </CardContent>
                </Card>

                <Typography variant="h5" gutterBottom color="primary">
                    ÖNE ÇIKAN İLANLAR
                </Typography>
                {/* Burada öne çıkan ilanları listeleyebilirsiniz */}
            </Container>
        </Grid>
    );
};

export default HomePage;