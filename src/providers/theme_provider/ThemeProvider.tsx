import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createContext, useContext, useMemo, useState } from 'react';
import { darkTheme, lightTheme } from './Theme';

interface ThemeContextProps {
    setTheme: (mode: string) => void;
    mode: string;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const CustomThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [mode, setMode] = useState<string>('light');

    const setTheme = (mode: string) => {
        setMode(mode);
    };

    const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

    return (
        <ThemeContext.Provider value={{ setTheme, mode }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};


export const useCustomTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useCustomTheme must be used within a CustomThemeProvider');
    }

    return context;
};