import { Box, Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRootStore } from '../providers/context_provider/ContextProvider';

const RegisterPage: React.FC = () => {
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { userStore } = useRootStore();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        userStore.registerUser(username, password, email)
    };

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
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 2 }}
                                >
                                    {t('register')}
                                </Button>
                            </form>
                        </CardContent>
                    </Box>
                </Card>
            </Container>
        </Grid>
    );
};

export default RegisterPage;
