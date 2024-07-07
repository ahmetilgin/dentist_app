import { Autocomplete, Grid, TextField, createFilterOptions } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QueryResult } from '../DataTypes';

interface SearchComponentProps {
    label: string;
    fetchOptions: (query: string) => Promise<QueryResult>;
    onSelect: (selectedItem: string | null) => void;
}

interface OptionType {
    inputValue?: string;
    title: string;
}

const filter = createFilterOptions<OptionType>();

function SearchComponent({
    label,
    fetchOptions,
    onSelect,
}: SearchComponentProps) {
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState<string>('');
    const [options, setOptions] = useState<OptionType[]>([]);
    const [value, setValue] = useState<OptionType | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (inputValue.length > 0) {
                try {
                    const results = await fetchOptions(inputValue);
                    if (results.query_result != null)
                        setOptions(results.query_result.map(item => ({ title: item })));
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            } else {
                setOptions([]);
            }
        };

        const debounceTimer = setTimeout(() => {
            fetchData();
        }, 300); // 300ms debounce

        return () => clearTimeout(debounceTimer);
    }, [inputValue, fetchOptions]);


    const handleInputChange = (
        _event: React.SyntheticEvent<Element, Event>,
        newInputValue: string,
    ) => {
        setInputValue(newInputValue);
    };

    const handleOptionChange = (
        _event: React.SyntheticEvent<Element, Event>,
        newValue: string | OptionType | null,
    ) => {
        if (typeof newValue === 'string') {
            setValue({ title: newValue });
            onSelect(newValue);
        } else if (newValue && newValue.inputValue) {
            setValue({ title: newValue.inputValue });
            onSelect(newValue.inputValue);
        } else {
            setValue(newValue);
            onSelect(newValue ? newValue.title : null);
        }
    };

    const handleFilterOptions = (options: OptionType[], params: any) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue === option.title);
        if (inputValue !== '' && !isExisting) {
            filtered.push({
                inputValue,
                title: `Add "${inputValue}"`,
            });
        }

        return filtered;
    };

    const getOptionLabel = (option: OptionType | string) => {
        if (typeof option === 'string') {
            return option;
        }
        if (option.inputValue) {
            return option.inputValue;
        }
        return option.title;
    };

    const renderOption = (props: any, option: OptionType) => {
        return <li {...props}>{option.title}</li>;
    };

    const renderInput = (params: any) => {
        return (
            <TextField
                {...params}
                label={t(label)}
                variant="outlined"
                color="primary"
                fullWidth
            />
        );
    };

    return (
        <Grid item xs={12} sm={12}>
            <Autocomplete<OptionType, false, false, true>
                value={value}
                onChange={handleOptionChange}
                onInputChange={handleInputChange}
                filterOptions={handleFilterOptions}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                options={options}
                getOptionLabel={getOptionLabel}
                renderOption={renderOption}
                freeSolo
                renderInput={renderInput}
            />
        </Grid>
    );
}

export default SearchComponent;