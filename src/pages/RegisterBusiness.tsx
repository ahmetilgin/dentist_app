import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Alert, Box, Button, Card, CardContent, Container, Grid, styled, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SearchComponent from '../components/SearchComponent';
import { QueryResult, RegisterBusinessUser } from '../DataTypes';
import { useRootService } from '../providers/context_provider/ContextProvider';



export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


const RegisterNormalUserPage = observer(() => {
    const { t, i18n } = useTranslation();

    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [email, setEmail] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [businessDescription, setBusinessDescription] = useState('');
    const [businessLocation, setBusinessLocation] = useState('');
    const [businessWebsite, setBusinessWebsite] = useState('');
    const [businessLogo, setBusinessLogo] = useState('');
    const { authService } = useRootService();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null); // State for error message
    const { httpService } = useRootService();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const businessUser: RegisterBusinessUser = {
            password,
            confirm_password,
            email,
            businessName,
            businessAddress,
            businessDescription,
            businessLocation,
            businessWebsite,
            businessLogo
        };

        if (password !== confirm_password) {
            setError(t("passwords_not_match"));
            return;
        }

        const result = await authService.registerBusiness(businessUser);
        if (result) {
            navigate('/login');
        } else {
            setError(t("register_error"));
        }

    }


    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Container component="main" maxWidth="xs">
                <Card>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h4" align="center" gutterBottom>
                            {t('register')}
                        </Typography>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label={t('email')}
                                    variant="outlined"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    margin="normal"
                                    type="email"
                                    required
                                />
                                <TextField
                                    label={t('password')}
                                    variant="outlined"
                                    fullWidth
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    margin="normal"
                                    type="password"
                                    required
                                />
                                <TextField
                                    label={t('confirm_password')}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="password"
                                    value={confirm_password}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <TextField
                                    label={t('business_name')}
                                    variant="outlined"
                                    fullWidth
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    margin="normal"
                                    type="text"
                                    required
                                />
                                <TextField
                                    label={t('business_address')}
                                    variant="outlined"
                                    fullWidth
                                    value={businessAddress}
                                    onChange={(e) => setBusinessAddress(e.target.value)}
                                    margin="normal"
                                    type="text"
                                    required
                                />
                                <TextField
                                    label={t('business_description')}
                                    variant="outlined"
                                    fullWidth
                                    value={businessDescription}
                                    onChange={(e) => setBusinessDescription(e.target.value)}
                                    margin="normal"
                                    type="text"
                                />
                                <SearchComponent
                                    label="business_location_"
                                    fetchOptions={(input) =>
                                        httpService.get<QueryResult>(
                                            `/public/country/${i18n.language}/${input}?`
                                        )
                                    }
                                    onSelect={(selectedItem) => {
                                        if (selectedItem != null) {
                                            setBusinessLocation(selectedItem);
                                        }
                                    }}
                                />
                                <TextField
                                    label={t('business_website')}
                                    variant="outlined"
                                    fullWidth
                                    value={businessWebsite}
                                    onChange={(e) => setBusinessWebsite(e.target.value)}
                                    margin="normal"
                                    type="text"
                                />
                                <input type="hidden" name="business_logo" value={businessLogo} />
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    {t('upload_logo')}
                                    <VisuallyHiddenInput
                                        onChange={(e) => {
                                            if (e.target.files === null) return;

                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.readAsDataURL(file);
                                                reader.onload = () => {
                                                    setBusinessLogo(reader.result as string);
                                                };
                                            }
                                        }}
                                        type="file" />
                                </Button>


                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        size="large"
                                    >
                                        {t('register')}
                                    </Button>
                                </Box>
                                {error && (
                                    <Alert severity="error" sx={{ marginTop: '1rem' }}>
                                        {error}
                                    </Alert>
                                )}
                            </form>
                        </CardContent>
                    </Box>
                </Card>
            </Container>
        </Grid>
    );
});


export default RegisterNormalUserPage;
