import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AllElements } from './components/AllElementsJustToSee';
import PublishNewJob from './components/PublishNewJob';
import ToolbarComponent from './components/Toolbar';
import './i18n';
import './index.css';
import ErrorPage from './pages/ErrorPage';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import JobDetail from './pages/JobDetail';
import LoginPage from './pages/Login';
import PrepareCV from './pages/PrepareCV/PrepareCV';
import RegisterBusinessUserPage from './pages/RegisterBusiness';
import RegisterNormalUserPage from './pages/RegisterNormalUser';
import ResetPassword from './pages/ResetPassword';
import JobSearchPage from './pages/SearchResult';
import { useRootStore } from './providers/context_provider/ContextProvider';
import { useCustomTheme } from './providers/theme_provider/ThemeProvider';

const App = observer(() => {
    const { userStore } = useRootStore();
    const { setTheme } = useCustomTheme();

    useEffect(() => {
        if (window.location.pathname === '/publish_new_job') {
            if (!userStore.isAuthenticated) {
                window.location.href = '/login';
            }
        }
    }, [userStore.isAuthenticated]);

    useEffect(() => {
        setTheme(userStore.activeTheme);
    }, [userStore.activeTheme, setTheme]);

    return (
        <>
            <ToolbarComponent />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<Home />} />
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
                <Route path="/preview_cv" element={<PrepareCV />} />
            </Routes>
        </>
    );
});

export default App;
