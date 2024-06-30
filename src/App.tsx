import { Observer } from 'mobx-react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AllElements } from './components/AllElementsJustToSee';
import './i18n';
import './index.css';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import { useRootStore } from './providers/context_provider/ContextProvider';
import { useCustomTheme } from './providers/theme_provider/ThemeProvider';



const App: React.FC = () => {
	const { userStore } = useRootStore();
	const { setTheme } = useCustomTheme()
	setTimeout(() => {
		setTheme(userStore.activeTheme)
	}, 1);


	return (
		<Observer>
			{() => {
				return <Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/home" element={<Home />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/all_elements" element={<AllElements />} />
				</Routes>
			}}
		</Observer>
	)
};

export default App;

