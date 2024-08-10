import { Alert, Button, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from "react-router-dom";
import { useRootService } from '../providers/context_provider/ContextProvider';

const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    let { token } = useParams();
    const { authService } = useRootService();
    const { t } = useTranslation();
    const [error, setError] = useState<string | null | undefined>(undefined);
    const navigate = useNavigate();
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const sendResetPassword = async () => {
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
        if (password !== confirmPassword) {
            setError(t("passwords_do_not_match"));
            return;
        }

        const result = await authService.resetPassword(token || "", password);
        if (result) {
            setError(t("password_reset_success"));
            navigate('/login');
        } else {
            setError(t("reset_password_error"));
        }
    };

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ margin: 'auto' }}
        >
            <Container component="main" maxWidth="xs">
                <TextField
                    type="password"
                    label={t("new_password")}
                    value={password}
                    onChange={handlePasswordChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    type="password"
                    label={t("confirm_password")}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button onClick={() => {
                    sendResetPassword()
                }} variant="contained" color="primary">
                    {t("reset_password")}
                </Button>
                {error == null && error !== undefined && <Alert severity="info">{error}</Alert>}
                {error != null && error !== undefined && <Alert severity="error">{error}</Alert>}
            </Container>

        </Grid>
    );
}

export default ResetPassword;
