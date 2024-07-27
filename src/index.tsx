import { GoogleOAuthProvider } from '@react-oauth/google';
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
	<GoogleOAuthProvider clientId="676526720911-gncnm8m9q0l57h2njhmts2dbiro33in6.apps.googleusercontent.com">
		<React.StrictMode>
			<CustomThemeProvider>
				<RootStoreProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</RootStoreProvider>
			</CustomThemeProvider>
		</React.StrictMode>
	</GoogleOAuthProvider>
);


