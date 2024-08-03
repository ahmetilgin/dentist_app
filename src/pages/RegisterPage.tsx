import { Alert, Box, Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import SocialMediaRegister from '../components/SocialMediaRegister';
import { useRootService } from '../providers/context_provider/ContextProvider';

interface BusinessUser {
	username: string;
	password: string;
	confirm_password: string;
	email: string;
	businessName: string;
	businessAddress: string;
}

const RegisterPage = observer(() => {
	const { t } = useTranslation();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirm_password, setConfirmPassword] = useState('');
	const [isBusiness, setIsBusiness] = useState(false);
	const [businessName, setBusinessName] = useState('');
	const [email, setEmail] = useState('');
	const [businessAddress, setBusinessAddress] = useState('');
	const { authService } = useRootService();
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null); // State for error message

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const businessUser: BusinessUser = {
			username,
			password,
			confirm_password,
			email,
			businessName,
			businessAddress
		};

		if (password !== confirm_password) {
			setError(t("passwords_not_match"));
			return;
		}


		if (isBusiness) {
			const result = await authService.registerBusiness(businessUser);
			if (result) {
				navigate('/login');
			} else {
				setError(t("register_error"));
			}

		} else {
			const result = await authService.registerUser(username, password, email);
			if (result) {
				navigate('/login');
			} else {
				setError(t("register_error"));
			}
		};
	}

	const { userType } = useParams();
	useEffect(() => {
		setIsBusiness(userType === 'business');
	}, [userType]);

	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: '100vh' }}
		>
			<Container component="main" maxWidth="xs">
				<Card>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Typography variant="h4" align="center" gutterBottom>
							{t('register')}
						</Typography>
						<SocialMediaRegister />
						<CardContent>
							<form onSubmit={handleSubmit}>
								<TextField
									label={t('username')}
									variant="outlined"
									fullWidth
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									margin="normal"
									type="text"
									required
								/>
								<TextField
									label={t('password')}
									variant="outlined"
									fullWidth
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									margin="normal"
									type="password"
									required
								/>
								<TextField
									label={t('confirm_password')}
									variant="outlined"
									fullWidth
									margin="normal"
									type="password"
									value={confirm_password}
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
								/>
								<TextField
									label={t('email')}
									variant="outlined"
									fullWidth
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									margin="normal"
									type="email"
									required
								/>

								{isBusiness && (
									<>
										<TextField
											label={t('business_name')}
											variant="outlined"
											fullWidth
											value={businessName}
											onChange={(e) => setBusinessName(e.target.value)}
											margin="normal"
											type="text"
											required
										/>
										<TextField
											label={t('business_address')}
											variant="outlined"
											fullWidth
											value={businessAddress}
											onChange={(e) => setBusinessAddress(e.target.value)}
											margin="normal"
											type="text"
											required
										/>
									</>
								)}

								<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
									<Button
										type="submit"
										variant="contained"
										color="primary"
										fullWidth
										size="large"
									>
										{t('register')}
									</Button>
								</Box>
								{error && (
									<Alert severity="error" sx={{ marginTop: '1rem' }}>
										{error}
									</Alert>
								)}
							</form>
						</CardContent>
					</Box>
				</Card>
			</Container>
		</Grid>
	);
});


export default RegisterPage;
