import {
	Alert,
	Button,
	Container,
	TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useRootService } from '../providers/context_provider/ContextProvider';

const ForgotPassword: React.FC = () => {
	const location = useLocation();
	const [error, setError] = useState<string | null | undefined>(undefined); // State for error message
	const { t } = useTranslation();
	const [isBusiness, setIsBusiness] = useState(false);
	const [email, setEmail] = useState('');
	const queryParams = new URLSearchParams(location.search);
	const loginType = queryParams.get('type');
	const { authService } = useRootService();

	useEffect(() => {
		setIsBusiness(loginType === 'business');
	}, [loginType]);

	return (<Container maxWidth="lg">
		<h1>{t("Forgot Password")}</h1>
		<TextField
			fullWidth
			label="Email"
			name="email"
			value={email}
			onChange={(e) => setEmail(e.target.value)}
		/>
		<Button variant="contained" color="primary" onClick={async () => {
			if (isBusiness) {
				const result = await authService.resetPasswordBusinessUser(email)
				if (result) {
					setError(null)
				} else {
					setError(t("reser_password_error"))
				}
			} else {
				const result = await authService.resetPasswordNormalUser(email)
				if (result) {
					setError(null)
				} else {
					setError(t("reser_password_error"))
				}
			}
		}} >{t("Submit")}</Button>
		{error == null && error !== undefined && <Alert severity="info">{t("reset_password_result_success")}</Alert>}
		{error != null && error !== undefined && <Alert severity="error">{t("reset_password_result_error")}</Alert>}
	</Container>
	);
};

export default ForgotPassword;