import { Button, Chip, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

interface SkillsProps {
    updateData: (data: any) => void;
}

const Skills: React.FC<SkillsProps> = ({ updateData }) => {
    const [skills, setSkills] = useState<string[]>([]);
    const [currentSkill, setCurrentSkill] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentSkill(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentSkill.trim() !== '') {
            const updatedSkills = [...skills, currentSkill.trim()];
            setSkills(updatedSkills);
            setCurrentSkill('');
            updateData(updatedSkills);
        }
    };

    const handleDelete = (skillToDelete: string) => {
        const updatedSkills = skills.filter((skill) => skill !== skillToDelete);
        setSkills(updatedSkills);
        updateData(updatedSkills);
    };

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Yetenekler
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {skills.map((skill) => (
                        <Chip
                            key={skill}
                            label={skill}
                            onDelete={() => handleDelete(skill)}
                            style={{ margin: '0 5px 5px 0' }}
                        />
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={9}>
                                <TextField
                                    fullWidth
                                    label="Yetenek"
                                    value={currentSkill}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Button type="submit" variant="contained" color="primary">
                                    Ekle
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
};

export default Skills;