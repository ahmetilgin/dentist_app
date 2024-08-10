import { Grid, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
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


function SearchComponent({
    label,
    fetchOptions,
    onSelect,
}: SearchComponentProps) {
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState<string>('-');

    const { isPending, error, data } = useQuery({
        queryKey: [label, inputValue],
        queryFn: () => {
            return fetchOptions(inputValue)
        }
    })

    if (error) {
        return <div>Error: {error.message}</div>
    }


    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {

        setInputValue(event.target.value);
    };


    return (
        <Grid item xs={12} sm={12}>
            <TextField
                id="free-solo-2-demo"
                label={t(label)}
                fullWidth
                value={inputValue}
                onChange={handleInputChange}
            />
            {data && data.query_result && data.query_result.map((option: String) => {
                return <li>{option}</li>
            })
            }
        </Grid>
    );
}

export default SearchComponent;