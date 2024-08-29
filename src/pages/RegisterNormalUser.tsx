import { Alert, Box, Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useRootService } from '../providers/context_provider/ContextProvider';


const RegisterNormalUserPage = observer(() => {
    const { t } = useTranslation();
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const { authService } = useRootService();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null); // State for error message

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirm_password) {
            setError(t("passwords_not_match"));
            return;
        }

        const result = await authService.registerUser({ password, email });
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
