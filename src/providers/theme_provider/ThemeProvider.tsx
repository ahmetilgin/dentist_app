import { Theme } from '@/DataTypes';
import { createContext, useContext, useState } from 'react';
import { useRootStore } from '../context_provider/ContextProvider';

interface ThemeContextProps {
	setTheme: (mode: Theme) => void;
	mode: Theme;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const CustomThemeProvider: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
	const { userStore } = useRootStore();
	const [mode, setMode] = useState<Theme>(userStore.activeTheme);
	document.documentElement.setAttribute('class', mode);

	const setTheme = (mode: Theme) => {
		setMode(mode);
		document.documentElement.setAttribute('class', mode);
	};

	return <ThemeContext.Provider value={{ setTheme, mode }}>{children}</ThemeContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCustomTheme = (): ThemeContextProps => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useCustomTheme must be used within a CustomThemeProvider');
	}

	return context;
};
