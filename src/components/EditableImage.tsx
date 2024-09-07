import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, IconButton, Tooltip } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

interface EditableImageProps {
    initialImage: string;
    onSave: (file: string) => void;
}

const EditableImage: React.FC<EditableImageProps> = ({ initialImage, onSave }) => {
    const [image, setImage] = useState(initialImage);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState(0);

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                setSize(width);
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setImage(result);
                onSave(result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box ref={containerRef} position="relative" width="100%" height={size} mb={2}>
            <Avatar
                src={image}
                alt="Profile Picture"
                sx={{
                    width: '100%',
                    height: '100%',
                    fontSize: size / 3,
                }}
            >
                {!image && 'No Image'}
            </Avatar>
            <Tooltip title={image ? "Resmi Değiştir" : "Resim Ekle"}>
                <IconButton
                    onClick={handleEditClick}
                    sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        backgroundColor: 'background.paper',
                        '&:hover': { backgroundColor: 'action.hover' },
                    }}
                >
                    {image ? <EditIcon /> : <AddPhotoAlternateIcon />}
                </IconButton>
            </Tooltip>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
            />
        </Box>
    );
};

export default EditableImage;