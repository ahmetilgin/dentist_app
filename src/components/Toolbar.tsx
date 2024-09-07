import { AppBar, Box, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../static/logo.png';
import LanguageThemeSelector from './LanguageThemeSelector';

const ToolbarComponent: React.FC = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar position="static" color="primary">
            <Toolbar
                sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: isMobile ? theme.spacing(1) : theme.spacing(0, 2),
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: isMobile ? theme.spacing(1) : 0,
                    }}
                >
                    <img
                        src={logo}
                        alt="logo"
                        style={{
                            width: '40px',
                            marginRight: theme.spacing(1),
                        }}
                    />
                    <Typography variant="h6" noWrap>
                        {t('karriere')}
                    </Typography>
                </Box>
                <LanguageThemeSelector />
            </Toolbar>
        </AppBar>
    );
};

export default ToolbarComponent;
