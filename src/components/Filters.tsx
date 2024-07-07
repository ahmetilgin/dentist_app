// src/components/Filters.tsx
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import React from 'react';

const Filters: React.FC = () => {
    return (
        <Box sx={{ width: '20%', p: 2 }}>
            <Typography variant="h6">Ülke / Şehir / İlçe</Typography>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="İş Yerinde" />
                <FormControlLabel control={<Checkbox />} label="Uzaktan / Remote" />
                <FormControlLabel control={<Checkbox />} label="Hibrit" />
            </FormGroup>
            <Typography variant="h6">Tarih</Typography>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Bugünün ilanları" />
                <FormControlLabel control={<Checkbox />} label="Son 3 gün" />
                <FormControlLabel control={<Checkbox />} label="Son 7 gün" />
            </FormGroup>
            <Typography variant="h6">Sektör</Typography>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Bilişim" />
                <FormControlLabel control={<Checkbox />} label="Üretim" />
                <FormControlLabel control={<Checkbox />} label="Elektrik & Elektronik" />
            </FormGroup>
        </Box>
    );
};

export default Filters;
