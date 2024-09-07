    import { Grid, Typography } from '@mui/material';
    import React, { useState } from 'react';
    import { useTranslation } from 'react-i18next';
    import EditableImage from '../../components/EditableImage';
    import EditableInput from '../../components/EditableTextField';

    interface PersonalInfoProps {
        updateData: (data: any) => void;
    }

    const PersonalInfo: React.FC<PersonalInfoProps> = ({ updateData }) => {
        const { t } = useTranslation();

        const [personalInfo, setPersonalInfo] = useState({
            fullName: '',
            email: "",
            phone: '',
            address: '',
            photo: '',
        });

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            updateData(personalInfo);
        };

        const handleInfoUpdate = (field: string) => (value: string) => {
            setPersonalInfo((prevInfo) => ({
                ...prevInfo,
                [field]: value,
            }));
        };

        return (
            <form onSubmit={handleSubmit}>
                <Typography variant="h6" gutterBottom>
                    {t('personal_information')}
                </Typography>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                        <EditableImage
                            initialImage={personalInfo.photo}
                            onSave={handleInfoUpdate('photo')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={9} lg={10}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <EditableInput
                                    initialValue={personalInfo.fullName}
                                    label={t('name_surname')}
                                    onSave={handleInfoUpdate('fullName')}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <EditableInput
                                    initialValue={personalInfo.email}
                                    label={t('email')}
                                    onSave={handleInfoUpdate('email')}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <EditableInput
                                    initialValue={personalInfo.phone}
                                    label={t('phone_number')}
                                    onSave={handleInfoUpdate('phone')}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <EditableInput
                                    initialValue={personalInfo.address}
                                    label={t('address')}
                                    onSave={handleInfoUpdate('address')}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        );
    };

    export default PersonalInfo;