import ShareIcon from '@mui/icons-material/Share';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Collapse,
    Container,
    Divider,
    Grid,
    IconButton,
    Link,
    styled,
    Typography,
    useTheme
} from '@mui/material';
import { observer } from 'mobx-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { TypeJob } from '../DataTypes';


const JobDetailCard = styled(Card)(({ theme }) => ({
    margin: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        width: '720px',
    },
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
    borderRadius: '3px',
    minHeight: '180px',
    padding: '16px',
}));

const CompanyDetailCard = styled(Card)(({ theme }) => ({
    margin: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        width: '300px',
    },
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
    borderRadius: '3px',
    minHeight: '180px',
    padding: '8px',
}));


const JobDetail: React.FC = observer(() => {
    const { t } = useTranslation();
    const location = useLocation();
    const job = location.state.job as TypeJob;
    const theme = useTheme();
    const [expanded, setExpanded] = React.useState(false);
    const jobDescription = job.Description
    const maxDescriptionLength = 300; // Gösterilecek maksimum karakter sayısı

    const isLongDescription = jobDescription.length > maxDescriptionLength;
    const shortDescription = jobDescription.substring(0, maxDescriptionLength);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Container maxWidth="lg">
            <Grid container>
                <Grid item xs={8}>
                    <Box>
                        <JobDetailCard>
                            <CardHeader
                                sx={{ paddingTop: '0px' }}
                                title={job.JobTitle}
                                titleTypographyProps={{ fontWeight: 'bolder' }}
                                subheader={'Firma İsmi*'}
                                subheaderTypographyProps={{ color: 'black' }}
                                action={
                                    <div>
                                        <Button sx={{ marginRight: 1 }} variant="contained" color="primary">
                                            {t("apply")}
                                        </Button>
                                        <IconButton aria-label="share">
                                            <ShareIcon />
                                        </IconButton>
                                    </div>
                                }
                            />
                            <Grid container>
                                <Grid item xs={6}>
                                    <CardHeader
                                        sx={{ paddingTop: 0 }}
                                        subheader={job.Location + ' - remote/iş yerinde*'}
                                        subheaderTypographyProps={{ variant: 'body2' }}
                                    />
                                </Grid>
                                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                    <CardHeader sx={{ paddingTop: 0 }} subheader={'5 gün önce güncellendi*'} subheaderTypographyProps={{ variant: 'body2' }} />
                                </Grid>
                            </Grid>
                            <CardContent style={{ backgroundColor: theme.palette.grey[100], minHeight: '50px', padding: '16px' }}>
                                <Grid container direction="row" justifyContent="space-around" alignItems="center">
                                    <Grid item direction={'column'}>
                                        <Typography variant="body2" color={'GrayText'}>
                                            Çalışma Şekli
                                        </Typography>
                                        <Typography variant="body2" fontWeight={'bold'}>
                                            Tam Zamanlı*
                                        </Typography>
                                    </Grid>
                                    <Grid item direction={'column'}>
                                        <Typography variant="body2" color={'GrayText'}>
                                            Tecrübe
                                        </Typography>
                                        <Typography variant="body2" fontWeight={'bold'}>
                                            Tecrübeli / Tecrübesiz*
                                        </Typography>
                                    </Grid>
                                    <Grid item direction={'column'}>
                                        <Typography variant="body2" color={'GrayText'}>
                                            Departman
                                        </Typography>
                                        <Typography variant="body2" fontWeight={'bold'}>
                                            Bilgi Teknolojileri / IT*
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" color={'GrayText'}>
                                            Başvuru Sayısı
                                        </Typography>
                                        <Typography variant="body2" fontWeight={'bold'}>
                                            313 başvuru*
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </JobDetailCard>
                    </Box>
                    <Box>
                        <JobDetailCard sx={{ paddingBottom: '0px' }}>
                            <CardHeader
                                sx={{ paddingTop: '0px' }}
                                titleTypographyProps={{ variant: 'h6', fontWeight: 'bolder' }}
                                title={'GENEL NİTELİKLER VE İŞ TANIMI'}
                            />
                            <CardContent sx={{ paddingTop: '0px' }}>{job.Description}</CardContent>
                            <CardContent sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
                                <CardHeader
                                    sx={{ paddingTop: '0px', paddingLeft: '0px' }}
                                    titleTypographyProps={{ variant: 'h6', fontWeight: 'bolder' }}
                                    title={'Genel Nitelikler'}
                                />
                                <Typography sx={{ lineHeight: '25px' }} variant="body2" component="div">
                                    {isLongDescription ? shortDescription : jobDescription}
                                    {isLongDescription && (
                                        <span>
                                            {!expanded && '...'}
                                            <Collapse in={expanded}>
                                                <span>{jobDescription.substring(maxDescriptionLength)}</span>
                                            </Collapse>
                                        </span>
                                    )}
                                </Typography>
                                {isLongDescription && (
                                    <div style={{ paddingTop: '10px', paddingBottom: '0px' }}>
                                        <Divider></Divider>
                                        <Button
                                            sx={{
                                                textAlign: 'center',
                                                width: '100%',
                                                paddingTop: '10px',
                                                color: theme.palette.info.main,
                                                ':hover': {
                                                    backgroundColor: 'transparent',
                                                    boxShadow: 'none',
                                                },
                                            }}
                                            onClick={handleExpandClick}
                                        >
                                            {expanded ? 'Daha Az Göster' : 'Daha Fazla Göster'}
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </JobDetailCard>
                    </Box>
                    <Box>
                        <JobDetailCard>
                            <CardHeader
                                sx={{ paddingTop: '0px', paddingBottom: '8px' }}
                                titleTypographyProps={{ variant: 'h6', fontWeight: 'bolder' }}
                                title={'Aday Kriterleri'}
                            />
                            <CardHeader
                                sx={{ paddingTop: '0px' }}
                                titleTypographyProps={{ variant: 'h6', fontWeight: 'bolder' }}
                                title={'Eğitim Seviyesi:'}
                                subheader={'Üniversite(Mezun), Yüksek Lisans(Öğrenci), Yüksek Lisans(Mezun), Doktora(Öğrenci), Doktora(Mezun)*'}
                            />
                            <CardHeader
                                sx={{ paddingTop: '0px' }}
                                titleTypographyProps={{ variant: 'h6', fontWeight: 'bolder' }}
                                title={'Yabancı Dil:'}
                                subheader={'İngilizce(Okuma : İyi, Yazma : İyi, Konuşma : İyi)*'}
                            />
                            <CardHeader
                                sx={{ paddingTop: '0px' }}
                                titleTypographyProps={{ variant: 'h6', fontWeight: 'bolder' }}
                                title={'Ehliyet:'}
                                subheader={'B sınıfı*'}
                            />
                            <CardHeader
                                sx={{ paddingTop: '0px' }}
                                titleTypographyProps={{ variant: 'h6', fontWeight: 'bolder' }}
                                title={'Özel Kriterler:'}
                                subheader={'Falan Filan*'}
                            />
                        </JobDetailCard>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <CompanyDetailCard>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: theme.palette.info.dark }} aria-label="recipe">
                                    F
                                </Avatar>
                            }
                            title={'Firma İsmi*'}
                            titleTypographyProps={{ fontWeight: 'bolder', paddingLeft: '0px' }}
                            subheader={'Firma Sektörü*'}
                        />
                        <CardHeader
                            sx={{ paddingTop: '0px' }}
                            titleTypographyProps={{ variant: 'body2', fontWeight: 'bolder' }}
                            title={'Hakkımızda'}
                            subheaderTypographyProps={{ color: 'black', variant: 'body2' }}
                            subheader={
                                'İş ve tarım makinaları sektörlerinde birbirinden faydalı modelleriyle Falan Filan Holding çatısı altında faaliyet gösteren Satış Pazarlama'
                            }
                        />
                        <CardHeader
                            sx={{ paddingTop: '0px' }}
                            subheader={
                                <Link sx={{ color: theme.palette.info.main, fontSize: '15px' }} href="#" underline="none">
                                    {'Şirket Sayfasına Git'}
                                </Link>
                            }
                        />
                        <Divider />
                        <CardHeader
                            title={'Yan Haklar*'}
                            titleTypographyProps={{ variant: 'body2', fontWeight: 'bolder' }}
                            subheaderTypographyProps={{ color: 'black', variant: 'body2' }}
                            subheader={'Servis, Yemekhane, Hayat Sigortası.'}
                        />
                    </CompanyDetailCard>
                </Grid>
            </Grid>
        </Container>
    );
});
export default JobDetail;
