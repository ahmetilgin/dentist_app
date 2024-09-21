import { RootStoreProvider } from '@/providers/context_provider/ContextProvider';
import { CustomThemeProvider } from '@/providers/theme_provider/ThemeProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient();

root.render(
	<GoogleOAuthProvider clientId="676526720911-gncnm8m9q0l57h2njhmts2dbiro33in6.apps.googleusercontent.com">
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<CustomThemeProvider>
					<RootStoreProvider>
						<BrowserRouter>
							<App />
						</BrowserRouter>
					</RootStoreProvider>
				</CustomThemeProvider>
			</QueryClientProvider>
		</React.StrictMode>
	</GoogleOAuthProvider>
);
