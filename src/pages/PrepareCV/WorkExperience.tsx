import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    IconButton,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import React, { useState } from 'react';

interface WorkExperienceProps {
    updateData: (data: any) => void;
}

interface Experience {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
}

const WorkExperience: React.FC<WorkExperienceProps> = ({ updateData }) => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [currentExperience, setCurrentExperience] = useState<Experience>({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
    });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);  // Formu gizleyip göstermek için durum
    const [errors, setErrors] = useState({
        company: false,
        position: false,
        startDate: false,
        endDate: false,
    });

    const validateForm = () => {
        const newErrors = {
            company: currentExperience.company === '',
            position: currentExperience.position === '',
            startDate: currentExperience.startDate === '',
            endDate: currentExperience.endDate === '',
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentExperience((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (editingIndex !== null) {
            const updatedExperiences = experiences.map((exp, index) =>
                index === editingIndex ? currentExperience : exp
            );
            setExperiences(updatedExperiences);
            updateData(updatedExperiences);
            setEditingIndex(null);
        } else {
            setExperiences([...experiences, currentExperience]);
            updateData([...experiences, currentExperience]);
        }
        setCurrentExperience({
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            description: '',
        });
        setShowForm(false); // Formu gizle
    };

    const handleDelete = (index: number) => {
        const updatedExperiences = experiences.filter((_, i) => i !== index);
        setExperiences(updatedExperiences);
        updateData(updatedExperiences);
    };

    const handleEdit = (index: number) => {
        setEditingIndex(index);
        setCurrentExperience(experiences[index]);
        setShowForm(true); // Düzenleme modunda formu göster
    };

    const toggleForm = () => {
        setShowForm((prev) => !prev);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
                İş Deneyimi
            </Typography>

            {experiences.length > 0 ? (
                <>
                    {experiences.map((exp, index) => (
                        <Card
                            key={index}
                            style={{ marginBottom: '15px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}
                        >
                            <CardContent>
                                <Typography variant="h6" style={{ fontWeight: 'bold', color: '#3f51b5' }}>
                                    {exp.position} at {exp.company}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" style={{ marginBottom: '10px' }}>
                                    {new Date(exp.startDate).toLocaleDateString()} - {new Date(exp.endDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body1" style={{ fontStyle: 'italic' }}>
                                    {exp.description}
                                </Typography>
                            </CardContent>
                            <CardActions style={{ justifyContent: 'flex-end' }}>
                                <Tooltip title="Düzenle">
                                    <IconButton onClick={() => handleEdit(index)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Sil">
                                    <IconButton onClick={() => handleDelete(index)} color="secondary">
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </CardActions>
                        </Card>
                    ))}

                    <IconButton
                        color="primary"
                        aria-label="add new experience"
                        onClick={toggleForm}
                        style={{ marginTop: '10px' }}
                    >
                        <AddIcon />
                    </IconButton>
                </>
            ) : (
                <>
                    <Typography variant="body1" style={{ marginBottom: '20px' }}>
                        Henüz iş deneyimi eklenmedi.
                    </Typography>
                    {showForm === false && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={toggleForm}
                            startIcon={<AddIcon />}
                        >
                            Yeni İş Deneyimi Ekle
                        </Button>
                    )}
                </>
            )}

            {showForm && (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Pozisyon"
                                name="position"
                                value={currentExperience.position}
                                onChange={handleChange}
                                error={errors.position}
                                helperText={errors.position && "Pozisyon zorunludur."}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Şirket"
                                name="company"
                                value={currentExperience.company}
                                onChange={handleChange}
                                error={errors.company}
                                helperText={errors.company && "Şirket zorunludur."}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Başlangıç Tarihi"
                                name="startDate"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={currentExperience.startDate}
                                onChange={handleChange}
                                error={errors.startDate}
                                helperText={errors.startDate && "Başlangıç tarihi zorunludur."}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Bitiş Tarihi"
                                name="endDate"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={currentExperience.endDate}
                                onChange={handleChange}
                                error={errors.endDate}
                                helperText={errors.endDate && "Bitiş tarihi zorunludur."}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Açıklama"
                                name="description"
                                multiline
                                rows={4}
                                value={currentExperience.description}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '20px' }}
                    >
                        {editingIndex !== null ? 'Güncelle' : 'Ekle'}
                    </Button>
                </form>
            )}
        </div>
    );
};

export default WorkExperience;
