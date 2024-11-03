import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import { NavigationBar } from './components/NavigationBar';
import { EnumUserType } from './DataTypes';
import './i18n';
import './index.css';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { PublishJob } from './pages/PublishJob';
import { RegisterPage } from './pages/RegisterPage';
import { useRootStore } from './providers/context_provider/ContextProvider';

const App = observer(() => {
	const { userStore } = useRootStore();
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (window.location.pathname === '/publish_job') {
			if (!userStore.isAuthenticated && userStore.userType != EnumUserType.EMPLOYER) {
				navigate('/login');
			}
		}
	}, [userStore.isAuthenticated, navigate, userStore.userType]);

	return (
		<>
			{(location.pathname === '/' || location.pathname === '/login') && <NavigationBar />}
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/forgot_password/:role" element={<ForgotPassword />} />
				<Route path="*" element={<ErrorPage />} />
				<Route path="/publish_job" element={<PublishJob />} />

				{/* <Route path="/home" element={<Home />} />
                <Route path="/register/normal_user" element={<RegisterNormalUserPage />} />
                <Route path="/register/business_user" element={<RegisterBusinessUserPage />} />
                <Route path="/search_result/:keyword/:region" element={<JobSearchPage />} />
                <Route path="/all_elements" element={<AllElements />} />
                <Route path="/publish_new_job" element={<PublishNewJob />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/job_detail" element={<JobDetail />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="/preview_cv" element={<PrepareCV />} /> */}
			</Routes>
		</>
	);
});

export default App;
