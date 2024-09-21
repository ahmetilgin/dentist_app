import { Theme } from '@/DataTypes';
import { createContext, useContext, useState } from 'react';

interface ThemeContextProps {
	setTheme: (mode: Theme) => void;
	mode: Theme;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const CustomThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
	const [mode, setMode] = useState<Theme>('light');

	const setTheme = (mode: Theme) => {
		setMode(mode);
	};

	return (
		<ThemeContext.Provider value={{ setTheme, mode }}>
			<div className={mode}>{children}</div>
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
