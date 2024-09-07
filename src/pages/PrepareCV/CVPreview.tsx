import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

interface CVPreviewProps {
    data: {
        personalInfo: any;
        education: any[];
        workExperience: any[];
        skills: string[];
        projects: any[];
    };
}

const CVPreview: React.FC<CVPreviewProps> = ({ data }) => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                {data.personalInfo.fullName}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {data.personalInfo.email} | {data.personalInfo.phone}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {data.personalInfo.address}
            </Typography>

            <Divider style={{ margin: '20px 0' }} />

            <Typography variant="h5" gutterBottom>
                Eğitim
            </Typography>
            {data.education.map((edu, index) => (
                <Box key={index} mb={2}>
                    <Typography variant="subtitle1">
                        {edu.school} - {edu.degree}
                    </Typography>
                    <Typography variant="body2">
                        {edu.fieldOfStudy} | {edu.startDate} - {edu.endDate}
                    </Typography>
                </Box>
            ))}

            <Divider style={{ margin: '20px 0' }} />

            <Typography variant="h5" gutterBottom>
                İş Deneyimi
            </Typography>
            {data.workExperience.map((exp, index) => (
                <Box key={index} mb={2}>
                    <Typography variant="subtitle1">
                        {exp.position} at {exp.company}
                    </Typography>
                    <Typography variant="body2">
                        {exp.startDate} - {exp.endDate}
                    </Typography>
                    <Typography variant="body2">{exp.description}</Typography>
                </Box>
            ))}

            <Divider style={{ margin: '20px 0' }} />

            <Typography variant="h5" gutterBottom>
                Yetenekler
            </Typography>
            <Typography variant="body1">
                {data.skills.join(', ')}
            </Typography>

            <Divider style={{ margin: '20px 0' }} />

            <Typography variant="h5" gutterBottom>
                Projeler
            </Typography>
            {data.projects.map((project, index) => (
                <Box key={index} mb={2}>
                    <Typography variant="subtitle1">{project.name}</Typography>
                    <Typography variant="body2">{project.description}</Typography>
                    <Typography variant="body2">Teknolojiler: {project.technologies}</Typography>
                    <Typography variant="body2">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            Proje Linki
                        </a>
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default CVPreview;