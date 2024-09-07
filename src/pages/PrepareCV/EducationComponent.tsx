
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

interface EducationProps {
    updateData: (data: any) => void;
}

interface Education {
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
}

const EducationComponent: React.FC<EducationProps> = ({ updateData }) => {
    const [educations, setEducations] = useState<Education[]>([]);
    const [currentEducation, setCurrentEducation] = useState<Education>({
        school: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentEducation((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setEducations([...educations, currentEducation]);
        setCurrentEducation({
            school: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
        });
        updateData([...educations, currentEducation]);
    };

    const handleDelete = (index: number) => {
        const updatedEducations = educations.filter((_, i) => i !== index);
        setEducations(updatedEducations);
        updateData(updatedEducations);
    };

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Eğitim Bilgileri
            </Typography>
            {educations.map((edu, index) => (
                <Grid container spacing={2} key={index} style={{ marginBottom: '20px' }}>
                    <Grid item xs={10}>
                        <Typography variant="subtitle1">
                            {edu.school} - {edu.degree} - {edu.fieldOfStudy}
                        </Typography>
                        <Typography variant="body2">
                            {edu.startDate} - {edu.endDate}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton onClick={() => handleDelete(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Okul"
                            name="school"
                            value={currentEducation.school}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Derece"
                            name="degree"
                            value={currentEducation.degree}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Çalışma Alanı"
                            name="fieldOfStudy"
                            value={currentEducation.fieldOfStudy}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Başlangıç Tarihi"
                            name="startDate"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={currentEducation.startDate}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Bitiş Tarihi"
                            name="endDate"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={currentEducation.endDate}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Ekle
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default EducationComponent;