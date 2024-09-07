import GoogleIcon from '@mui/icons-material/Google';
import { Button, Divider, Grid, useMediaQuery, useTheme } from '@mui/material';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Request } from 'superagent';
import { useRootService } from '../providers/context_provider/ContextProvider';

interface User {
    id: string;
    name: string;
    email: string;
    picture?: string;
}

const SocialMediaLogin: React.FC = () => {
    const { t } = useTranslation();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { httpService } = useRootService();

    const fetchGoogleUserInfo = async (accessToken: string) => {
        const googleReq = (request: Request) => {
            request.set('Authorization', `Bearer ${accessToken}`);
        };
        const response = await httpService.get<any>('https://www.googleapis.com/oauth2/v3/userinfo', googleReq);

        if (!response.ok) {
            throw new Error('Failed to fetch user information');
        }

        const data = await response.json();
        return {
            id: data.sub,
            name: data.name,
            email: data.email,
            picture: data.picture,
        };
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse: Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>) => {
            console.log('Google Login Success:', tokenResponse);
            try {
                const userInfo = await fetchGoogleUserInfo(tokenResponse.access_token);
                setUser(userInfo);
                setError(null);
                console.log('User Info:', user);
            } catch (error) {
                console.error('Error fetching user info:', error);
                setError('Failed to fetch user information');
            }
        },
        onError: (error) => {
            console.log('Google Login Failed:', error);
            setError('Google login failed');
        },
    });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Grid container direction="column" spacing={isMobile ? 0 : 1}>
            <Grid item>
                <Button style={{ padding: 1 }} fullWidth color="secondary" variant="outlined" startIcon={<GoogleIcon />} onClick={() => googleLogin()}>
                    Google
                </Button>
                {error && <p>{error}</p>}
            </Grid>
            <Grid item>
                <Divider>{t('or')}</Divider>
            </Grid>
        </Grid>
    );
};

export default SocialMediaLogin;
