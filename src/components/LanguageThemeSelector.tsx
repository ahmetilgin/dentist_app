import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LanguageIcon from '@mui/icons-material/Language';
import { Button, Grid, IconButton, Menu, MenuItem, Switch, Tooltip } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Theme } from '../DataTypes';
import { useRootStore } from '../providers/context_provider/ContextProvider';
import { useCustomTheme } from '../providers/theme_provider/ThemeProvider';
import { ALFlag, TRFlag, USFlag } from './Flags';

const languages = [
    { code: 'en', name: 'english', flag: USFlag },
    { code: 'tr', name: 'turkish', flag: TRFlag },
    { code: 'sq', name: 'albanian', flag: ALFlag },
];

const LanguageThemeSelector: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { setTheme, mode } = useCustomTheme();
    const { userStore } = useRootStore();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleThemeChange = useCallback(() => {
        const newTheme: Theme = mode === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        userStore.setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }, [mode, setTheme, userStore]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, [setTheme]);

    const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLanguageMenuClose = () => {
        setAnchorEl(null);
    };

    const changeLanguage = useCallback(
        (lang: string) => {
            i18n.changeLanguage(lang);
            handleLanguageMenuClose();
        },
        [i18n]
    );

    return (
        <div>
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                            <IconButton aria-label={t('enableLightMode')}>
                                <Brightness7Icon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Switch checked={mode === 'dark'} onChange={handleThemeChange} color="default" aria-label={t('toggleThemeSwitch')} />
                        </Grid>
                        <Grid item>
                            <IconButton aria-label={t('enableDarkMode')}>
                                <Brightness4Icon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Tooltip title={t('changeLanguage')}>
                        <Button aria-controls="language-menu" aria-haspopup="true" onClick={handleLanguageMenuOpen} startIcon={<LanguageIcon />}>
                            {t('language')}
                        </Button>
                    </Tooltip>
                </Grid>

                <Menu id="language-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleLanguageMenuClose}>
                    {languages.map((lang) => (
                        <MenuItem key={lang.code} onClick={() => changeLanguage(lang.code)}>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <lang.flag />
                                </Grid>
                                <Grid item>{t(lang.name)}</Grid>
                            </Grid>
                        </MenuItem>
                    ))}
                </Menu>
                <Grid item>
                    <Button variant="contained" color="secondary" onClick={() => navigate('/publish_new_job')}>
                        {t('publish_job')}
                    </Button>
                </Grid>
                {!userStore.isAuthenticated && (
                    <Grid item>
                        <Button variant="outlined" color="inherit" onClick={() => navigate('/login')}>
                            {t('login_signup')}
                        </Button>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default React.memo(LanguageThemeSelector);
