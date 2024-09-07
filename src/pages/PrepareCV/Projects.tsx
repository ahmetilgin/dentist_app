import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

interface ProjectsProps {
    updateData: (data: any) => void;
}

interface Project {
    name: string;
    description: string;
    technologies: string;
    link: string;
}

const Projects: React.FC<ProjectsProps> = ({ updateData }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProject] = useState<Project>({
        name: '',
        description: '',
        technologies: '',
        link: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentProject((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedProjects = [...projects, currentProject];
        setProjects(updatedProjects);
        setCurrentProject({
            name: '',
            description: '',
            technologies: '',
            link: '',
        });
        updateData(updatedProjects);
    };

    const handleDelete = (index: number) => {
        const updatedProjects = projects.filter((_, i) => i !== index);
        setProjects(updatedProjects);
        updateData(updatedProjects);
    };

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Projeler
            </Typography>
            {projects.map((project, index) => (
                <Grid container spacing={2} key={index} style={{ marginBottom: '20px' }}>
                    <Grid item xs={10}>
                        <Typography variant="subtitle1">{project.name}</Typography>
                        <Typography variant="body2">{project.description}</Typography>
                        <Typography variant="body2">Teknolojiler: {project.technologies}</Typography>
                        "<Typography variant="body2">
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                Proje Linki
                            </a>
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
                            label="Proje Adı"
                            name="name"
                            value={currentProject.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Açıklama"
                            name="description"
                            multiline
                            rows={3}
                            value={currentProject.description}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Kullanılan Teknolojiler"
                            name="technologies"
                            value={currentProject.technologies}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Proje Linki"
                            name="link"
                            value={currentProject.link}
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

export default Projects;