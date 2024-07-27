import { FacebookLoginClient, LoginResponse } from '@greatsumini/react-facebook-login';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, Divider, Grid } from "@mui/material";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
        }
        const response = await httpService.get<any>(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            googleReq
        );

        if (!response.ok) {
            throw new Error('Failed to fetch user information');
        }

        const data = await response.json();
        return {
            id: data.sub,
            name: data.name,
            email: data.email,
            picture: data.picture
        };
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => {
            console.log('Google Login Success:', tokenResponse);
            try {
                const userInfo = await fetchGoogleUserInfo(tokenResponse.access_token);
                setUser(userInfo);
                setError(null);
            } catch (error) {
                console.error('Error fetching user info:', error);
                setError('Failed to fetch user information');
            }
        },
        onError: (error) => {
            console.log('Google Login Failed:', error);
            setError('Google login failed');
        }
    });

    const facebookLogin = () => {
        FacebookLoginClient.login((response: LoginResponse) => {
            if (response.status === 'connected') {
                console.log('Facebook Login Success:', response);
                if (response && response.authResponse !== undefined) {
                    setUser({ id: response.authResponse.userID, name: '', email: '' });
                    setError(null);
                    FacebookLoginClient.getProfile((profile: any) => {
                        setUser({
                            id: response.authResponse?.userID || '',
                            name: profile.name,
                            email: profile.email,
                            picture: profile.picture?.data.url,
                        });
                    }, { fields: 'name,email,picture' });
                }

            } else {
                console.log('Facebook Login Failed:', response);
                setError('Facebook login failed');
            }
        }, {
            scope: 'public_profile,email',
        });
    };

    const appleLogin = () => {
        // Apple login işlevselliğini burada uygulayın
        console.log('Apple Login not implemented');
        setError('Apple login not implemented');
    };

    const handleSocialLogin = (provider: 'facebook' | 'google' | 'apple') => {
        switch (provider) {
            case 'facebook':
                facebookLogin();
                break;
            case 'google':
                googleLogin();
                break;
            case 'apple':
                appleLogin();
                break;
        }
    };

    const loadFB = async () => {
        FacebookLoginClient.clear();
        await FacebookLoginClient.loadSdk('en_US');
        FacebookLoginClient.init({ appId: "1136090037453915", version: 'v9.0' });
    };

    useEffect(() => {
        loadFB();
    }, []);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Grid container spacing={2}>
                    <Grid item xs={4} sm={4}>
                        <Button
                            fullWidth
                            color="secondary"
                            variant="outlined"
                            startIcon={<FacebookIcon />}
                            onClick={() => handleSocialLogin('facebook')}
                        >
                            Facebook
                        </Button>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <Button
                            fullWidth
                            color="secondary"
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            onClick={() => handleSocialLogin('google')}
                        >
                            Google
                        </Button>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <Button
                            fullWidth
                            color="secondary"
                            variant="outlined"
                            startIcon={<AppleIcon />}
                            onClick={() => handleSocialLogin('apple')}
                        >
                            Apple
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Divider>{t("or")}</Divider>
            </Grid>
            {error && (
                <Grid item>
                    <p style={{ color: 'red' }}>{error}</p>
                </Grid>
            )}
            {user && (
                <Grid item>
                    <h3>Logged in User Information:</h3>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    {user.picture && (
                        <img src={user.picture} alt="User profile" style={{ width: 50, height: 50, borderRadius: '50%' }} />
                    )}
                </Grid>
            )}
        </Grid>
    );
};

export default SocialMediaLogin;