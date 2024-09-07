import { Card, CardContent, Container, Grid, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TabPanel from '../components/TabPanel';
import BusinesUserLogin from './BusinesUserLogin';
import NormalUserLogin from './NormalUserLogin';

const LoginPage: React.FC = () => {
    const { t } = useTranslation();
    const [tabValue, setTabValue] = useState<number>(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
            <Container component="main" maxWidth="xs">
                <Card>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab style={{ width: '50%' }} label={t('switch_to_user_login')} />
                        <Tab style={{ width: '50%' }} label={t('switch_to_business_login')} />
                    </Tabs>
                    <CardContent sx={{ p: 2 }}>
                        <TabPanel value={tabValue} index={0}>
                            <NormalUserLogin />
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <BusinesUserLogin />
                        </TabPanel>
                    </CardContent>
                </Card>
            </Container>
        </Grid>
    );
};

export default LoginPage;
