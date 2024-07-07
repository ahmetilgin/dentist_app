import { Box, Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useRootService } from '../providers/context_provider/ContextProvider';

interface BusinessUser {
    username: string;
    password: string;
    email: string;
    businessName: string;
    businessAddress: string;
}

const RegisterPage: React.FC = () => {
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isBusiness, setIsBusiness] = useState(false);
    const [businessName, setBusinessName] = useState('');
    const [email, setEmail] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const { authService } = useRootService();
    const location = useLocation();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isBusiness) {
            const businessUser: BusinessUser = {
                username,
                password,
                email,
                businessName,
                businessAddress
            };
            authService.registerBusiness(businessUser);
        } else {
            authService.registerUser(username, password, email);
        }
    };

    const queryParams = new URLSearchParams(location.search);
    const loginType = queryParams.get('type');
    useEffect(() => {
        setIsBusiness(loginType === 'business');
    }, [loginType]);

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
                                    label={t('username')}
                                    variant="outlined"
                                    fullWidth
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    margin="normal"
                                    type="text"
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
                                    label={t('email')}
                                    variant="outlined"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    margin="normal"
                                    type="email"
                                    required
                                />

                                {isBusiness && (
                                    <>
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
                                    </>
                                )}

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
                            </form>
                        </CardContent>
                    </Box>
                </Card>
            </Container>
        </Grid>
    );
};

export default RegisterPage;
