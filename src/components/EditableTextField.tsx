import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Box, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface EditableInputProps {
    initialValue: string;
    label: string;
    onSave: (value: string) => void;
}

const EditableTextField: React.FC<EditableInputProps> = ({ initialValue, label, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        onSave(value);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSave();
        } else if (event.key === 'Escape') {
            setIsEditing(false);
            setValue(initialValue);
        }
    };

    return (
        <Box sx={{ position: 'relative', width: '100%' }}>
            <TextField
                label={label}
                variant="outlined"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={!isEditing}
                fullWidth
                size="small"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Tooltip title={isEditing ? "Kaydet" : "Düzenle"}>
                                <IconButton
                                    edge="end"
                                    onClick={isEditing ? handleSave : handleEdit}
                                    color={isEditing ? "primary" : "default"}
                                >
                                    {isEditing ? <SaveIcon /> : <EditIcon />}
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    ),
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        transition: 'background-color 0.3s ease, border-color 0.3s ease',
                        '&.Mui-focused fieldset': {
                            borderColor: isEditing ? 'primary.main' : 'inherit',
                        },
                        '&:hover fieldset': {
                            borderColor: isEditing ? 'primary.main' : 'inherit',
                        },
                        backgroundColor: isEditing ? 'rgba(0, 0, 255, 0.05)' : 'inherit',
                    },
                    '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: 'rgba(0, 0, 0, 0.6)',
                    },
                }}
            />
        </Box>
    );
};

export default EditableTextField;