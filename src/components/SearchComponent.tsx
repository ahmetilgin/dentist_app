import { Grid, List, ListItemButton, Popover, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QueryResult } from '../DataTypes';

interface SearchComponentProps {
    label: string;
    fetchOptions: (query: string) => Promise<QueryResult>;
    onSelect: (selectedItem: string | null) => void;
}

function SearchComponent({
    label,
    fetchOptions,
    onSelect,
}: SearchComponentProps) {
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState<string>('');
    const anchorElRef = useRef<HTMLDivElement | null>(null);
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

    const { data } = useQuery({
        queryKey: [label, inputValue],
        queryFn: () => fetchOptions(inputValue),
        enabled: !!inputValue,
    });

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setInputValue(event.target.value);
    };

    const handleOptionSelect = (option: string) => {
        onSelect(option);
        setInputValue(option);
        setPopoverOpen(false);
    };

    return (
        <Grid item xs={12} sm={12}>
            <TextField
                label={t(label)}
                fullWidth
                value={inputValue}
                onChange={handleInputChange}
                inputRef={anchorElRef}
                onFocus={() => setPopoverOpen(true)}
                onBlur={() => setTimeout(() => setPopoverOpen(false), 200)}
            />
            <Popover
                open={popoverOpen && Boolean(data && data.query_result && data.query_result.length > 0)}
                anchorEl={anchorElRef.current}
                onClose={() => setPopoverOpen(false)}
                disableAutoFocus
                disableEnforceFocus
                disableRestoreFocus
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{
                    width: anchorElRef.current ? anchorElRef.current.clientWidth : undefined,
                }}
            >
                <List sx={{ width: anchorElRef.current ? anchorElRef.current.clientWidth : undefined, }}>
                    {data?.query_result?.map((option: string, index: number) => (
                        <ListItemButton key={index} onClick={() => handleOptionSelect(option)} sx={{ width: anchorElRef.current ? anchorElRef.current.clientWidth : undefined, }}>
                            {option}
                        </ListItemButton>
                    ))}
                </List>
            </Popover>
        </Grid >
    );
}

export default SearchComponent;