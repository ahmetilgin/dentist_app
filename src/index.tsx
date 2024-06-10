import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { RootStoreProvider } from './providers/context_provider/ContextProvider';
import { CustomThemeProvider } from './providers/theme_provider/ThemeProvider';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<CustomThemeProvider>
			<RootStoreProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</RootStoreProvider>
		</CustomThemeProvider>
	</React.StrictMode>
);


