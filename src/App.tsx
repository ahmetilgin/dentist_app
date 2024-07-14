import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AllElements } from './components/AllElementsJustToSee';
import PublishNewJob from './components/PublishNewJob';
import './i18n';
import './index.css';
import Home from './pages/Home';
import JobSearchPage from './pages/JobSearchPage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import { useRootStore } from './providers/context_provider/ContextProvider';
import { useCustomTheme } from './providers/theme_provider/ThemeProvider';



const App = observer(() => {
	const { userStore } = useRootStore();
	const { setTheme } = useCustomTheme();

	useEffect(() => {
		if (window.location.pathname === "/publish_new_job") {
			if (!userStore.isAuthenticated) {
				window.location.href = "/login";
			}
		}
	}, [userStore.isAuthenticated]);

	useEffect(() => {
		setTheme(userStore.activeTheme);
	}, [userStore.activeTheme, setTheme]);

	return (<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/login" element={<LoginPage />} />
		<Route path="/home" element={<Home />} />
		<Route path="/register" element={<RegisterPage />} />
		<Route path="/search_result" element={<JobSearchPage />} />
		<Route path="/all_elements" element={<AllElements />} />
		<Route path="/publish_new_job" element={<PublishNewJob />} />
	</Routes>)
});

export default App;

