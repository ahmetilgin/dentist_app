import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TypeUser } from '@/DataTypes';
import { useRootService } from '@/providers/context_provider/ContextProvider';
import { ArrowLeft, Building2, UserCircle } from 'lucide-react';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LoadingDots from './LoadingDots';

const Login = observer(({ role }: { role: string }) => {
	const { t } = useTranslation();
	const { authService } = useRootService();
	const navigate = useNavigate();
	const [password, setPassword] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [error, setError] = React.useState(false);
	const [errorContent, setErrorContent] = React.useState('');
	const [isLoading, setIsLoading] = useState(false);

	const setErrorMessage = (message: string) => {
		setError(true);
		setErrorContent(message);
		setTimeout(() => setError(false), 3000);
	};

	const handleLogin = async () => {
		setIsLoading(true);
		try {
			if (role == 'employer') {
				const res = await authService.loginBusiness({
					email: email,
					password: password,
				} as TypeUser);
				if (res) navigate('/');
				else setErrorMessage(t('error.login'));
			} else {
				const res = await authService.loginUser({
					email: email,
					password: password,
				} as TypeUser);
				if (res) navigate('/');
				else setErrorMessage(t('error.login'));
			}
		} catch {
			setErrorMessage(t('error.login'));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="grid gap-4">
			<div className="grid gap-2">
				<Label htmlFor="email">{t('login.email')}</Label>
				<Input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder={t('login.email')}
					required
				/>
			</div>
			<div className="grid gap-2">
				<div className="flex items-center">
					<Label htmlFor="password">{t('login.password')}</Label>
					<a
						className="ml-auto inline-block text-sm underline"
						onClick={() => {
							navigate('/forgot_password/' + role);
						}}
					>
						{t('login.forgot_password')}
					</a>
				</div>
				<Input
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					required
				/>
			</div>
			<div className="grid gap-4 mt-4">
				{error && (
					<Button size={'sm'} variant={'destructive'} disabled>
						{errorContent}
					</Button>
				)}
				<Button disabled={isLoading} type="button" className="w-full  text-white" onClick={() => handleLogin()}>
					{isLoading ? <LoadingDots /> : t('login.submit')}
				</Button>
			</div>
			<div className="mt-4 text-center text-sm">
				{t('login.no_account')}{' '}
				<a className="underline" onClick={() => navigate('/register')}>
					{t('login.register')}
				</a>
			</div>
		</div>
	);
});

export function LoginForm() {
	const { t } = useTranslation();
	const [userType, setUserType] = useState<'candidate' | 'employer' | null>(null);

	return (
		<div>
			<Card className="w-full max-w-2xl">
				<CardHeader>
					<CardTitle className="text-2xl">
						{userType && (
							<Button
								variant="ghost"
								className="mb-2"
								onClick={() => {
									if (userType) {
										setUserType(null);
									}
								}}
							>
								<ArrowLeft className="h-6 w-6" />
							</Button>
						)}
						{t('login.title')}
					</CardTitle>
					<CardDescription>{t('login.desc')}</CardDescription>
				</CardHeader>
				<CardContent>
					{!userType ? (
						<div className="grid grid-cols-2 gap-4">
							<Button
								variant="outline"
								className="h-32 flex flex-col items-center justify-center space-y-2"
								onClick={() => setUserType('candidate')}
							>
								<UserCircle className="!size-6" />
								<span>{t('login.candidate_login')}</span>
							</Button>
							<Button
								variant="outline"
								className="h-32 flex flex-col items-center justify-center space-y-2"
								onClick={() => setUserType('employer')}
							>
								<Building2 className="!size-6" />
								<span>{t('login.employer_login')}</span>
							</Button>
						</div>
					) : (
						<Login role={userType} />
					)}
				</CardContent>
			</Card>
		</div>
	);
}

export default Login;
