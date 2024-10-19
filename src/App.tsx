import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import './i18n';
import './index.css';
import HomePage from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { useRootStore } from './providers/context_provider/ContextProvider';

const App = observer(() => {
	const { userStore } = useRootStore();
	const location = useLocation();

	useEffect(() => {
		if (window.location.pathname === '/publish_new_job') {
			if (!userStore.isAuthenticated) {
				window.location.href = '/login';
			}
		}
	}, [userStore.isAuthenticated]);

	return (
		<>
			{(location.pathname === '/' || location.pathname === '/login') && <NavigationBar />}
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				{/* <Route path="/home" element={<Home />} />
                <Route path="/register/normal_user" element={<RegisterNormalUserPage />} />
                <Route path="/register/business_user" element={<RegisterBusinessUserPage />} />
                <Route path="/search_result/:keyword/:region" element={<JobSearchPage />} />
                <Route path="/all_elements" element={<AllElements />} />
                <Route path="/publish_new_job" element={<PublishNewJob />} />
                <Route path="/forgot_password/:user_type" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/job_detail" element={<JobDetail />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/preview_cv" element={<PrepareCV />} /> */}
			</Routes>
		</>
	);
});

export default App;
