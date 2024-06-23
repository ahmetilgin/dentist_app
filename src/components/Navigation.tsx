import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Avatar, Button, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useRootStore } from '../providers/context_provider/ContextProvider';
import { useCustomTheme } from '../providers/theme_provider/ThemeProvider';

const Navigation: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorElLanguage, setAnchorElLanguage] = useState<null | HTMLElement>(null);
    const { t, i18n } = useTranslation();
    const { setTheme, mode } = useCustomTheme()
    const { userStore } = useRootStore()
    

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        handleLanguageMenuClose();
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageMenuClose = () => {
        setAnchorElLanguage(null);
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        handleLanguageMenuClose();
        handleMenuClose();
    };

    const handleThemeChange = () => {
        let theme = mode === "light" ? "dark" : "light";
        setTheme(theme);
        userStore.setTheme(theme)
    };

    return (
        <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
                <Typography variant="h6" component="div">

                </Typography>
            </Grid>
            <Grid item>
                <Button component={Link} to="/" color="inherit">{t("home")}</Button>
                <Button component={Link} to="/about" color="inherit">{t("about")}</Button>
                <Button component={Link} to="/contact" color="inherit">{t("contact")}</Button>
                <IconButton onClick={handleAvatarClick}>
                    <Avatar alt="User Name" src="/static/images/avatar/1.jpg" />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose}>{t("profile")}</MenuItem>
                    <MenuItem onClick={handleMenuClose}>{t("my_account")}</MenuItem>
                    <MenuItem onClick={(e) => setAnchorElLanguage(e.currentTarget)} >
                        {t("language")}
                        <Menu
                            anchorOrigin={{ vertical: "top", horizontal: "left" }}
                            anchorEl={anchorElLanguage}
                            open={Boolean(anchorElLanguage)}
                            onClose={handleLanguageMenuClose}
                        >
                            <MenuItem value="en" onClick={() => changeLanguage("en")}>{t('english')}</MenuItem>
                            <MenuItem value="tr" onClick={() => changeLanguage("tr")}>{t('turkish')}</MenuItem>
                            <MenuItem value="sq" onClick={() => changeLanguage("sq")}>{t('albanian')}</MenuItem>
                        </Menu>

                    </MenuItem>
                    <MenuItem onClick={handleThemeChange}>
                        {mode === 'light' ? t("dark_theme") : t("light_theme")}
                        <IconButton >
                            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                        </IconButton>
                    </MenuItem>
                    <MenuItem onClick={() => { 
                        userStore.setAuthenticated(false);
                    }}
                        >{t("log_out")}</MenuItem>
                </Menu>
            </Grid>
        </Grid >
    );
};

export default Navigation;
