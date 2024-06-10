import { MenuItem, Select } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';


const ThemeLanguageSelector: React.FC = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Select
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value as string)}
                variant="standard"
                size="small"
            >
                <MenuItem value="en">{t('english')}</MenuItem>
                <MenuItem value="tr">{t('turkish')}</MenuItem>
                <MenuItem value="sq">{t('albanian')}</MenuItem>
            </Select>
        </div>
    );
};

export default ThemeLanguageSelector;
