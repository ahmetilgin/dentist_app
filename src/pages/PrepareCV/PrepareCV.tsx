import { Box, Container, Grid, Paper } from '@mui/material';
import React, { useState } from 'react';
import ToolbarComponent from '../../components/Toolbar';
import CVPreview from './CVPreview';
import Education from './EducationComponent';
import PersonalInfo from './PersonalInfo';
import Projects from './Projects';
import Skills from './Skills';
import WorkExperience from './WorkExperience';

const PrepareCV: React.FC = () => {
    const [cvData, setCVData] = useState({
        personalInfo: {},
        education: [],
        workExperience: [],
        skills: [],
        projects: [],
    });

    const updateCVData = (section: string, data: any) => {
        setCVData((prevData) => ({
            ...prevData,
            [section]: data,
        }));
    };
    return (
        <Grid>
            <ToolbarComponent />
            <Container>
                <Box flex={1} mr={2}>
                    <Paper elevation={3} sx={{ m: 2, p: 2 }}>
                        <PersonalInfo updateData={(data) => updateCVData('personalInfo', data)} />
                    </Paper>
                    <Paper elevation={3} sx={{ m: 2, p: 2 }}>
                        <WorkExperience updateData={(data) => updateCVData('workExperience', data)} />
                    </Paper>
                    <Paper elevation={3} sx={{ m: 2, p: 2 }} >
                        <Skills updateData={(data) => updateCVData('skills', data)} />
                    </Paper>
                    <Paper elevation={3} sx={{ m: 2, p: 2 }}>
                        <Education updateData={(data) => updateCVData('education', data)} />
                    </Paper>
                    <Paper elevation={3} sx={{ m: 2, p: 2 }} >
                        <Projects updateData={(data) => updateCVData('projects', data)} />
                    </Paper>
                    <Paper elevation={3} sx={{ m: 2, p: 2 }}>
                        <CVPreview data={cvData} />
                    </Paper>
                </Box>
            </Container>
        </Grid>
    );
};

export default PrepareCV;