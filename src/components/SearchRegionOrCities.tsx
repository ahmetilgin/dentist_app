import { Autocomplete, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
    const [options, setOptions] = useState<string[]>([]);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (inputValue.length > 0) {
                try {
                    const results = await fetchOptions(inputValue);
                    if (results.query_result != null)
                        setOptions(results.query_result);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            } else {
                setOptions([]);
            }
        };

        const debounceTimer = setTimeout(() => {
            fetchData();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [inputValue, fetchOptions]);

    const handleChange = (_event: React.SyntheticEvent, newValue: string | null) => {
        setSelectedValue(newValue);
        onSelect(newValue);
    };

    return (
        <Grid item xs={12} sm={12}>
            <Autocomplete<string>
                options={options}
                inputValue={inputValue}
                value={selectedValue}
                onChange={handleChange}
                onInputChange={(_event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={t(label)}
                        variant="outlined"
                        color="primary"
                        fullWidth
                    />
                )}
            />
        </Grid>
    );
}

export default SearchComponent;