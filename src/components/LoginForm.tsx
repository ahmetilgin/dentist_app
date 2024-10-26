import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TypeUser } from '@/DataTypes';
import { useRootService } from '@/providers/context_provider/ContextProvider';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
	const { t } = useTranslation();
	const { authService } = useRootService();
	const navigate = useNavigate();
	const [password, setPassword] = React.useState('');
	const [email, setEmail] = React.useState('');

	// handleLogin fonksiyonu artık role parametresi alıyor
	const handleLogin = (role: string) => {
		if (role == 'employer') {
			authService
				.loginBusiness({
					email: email,
					password: password,
				} as TypeUser)
				.then((res) => {
					if (res) {
						navigate('/');
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			authService
				.loginUser({
					email: email,
					password: password,
				} as TypeUser)
				.then((res) => {
					if (res) {
						navigate('/');
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">{t('login.title')}</CardTitle>
				<CardDescription>{t('login.desc')}</CardDescription>
			</CardHeader>
			<CardContent>
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
							<a href="/forgot_password" className="ml-auto inline-block text-sm underline">
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
						<Button
							type="button"
							className="w-full bg-blue-500 text-white"
							onClick={() => handleLogin('candidate')}
						>
							{t('login.candidate_login')}
						</Button>
						<Button
							type="button"
							className="w-full bg-green-500 text-white"
							onClick={() => handleLogin('employer')}
						>
							{t('login.employer_login')}
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						{t('login.no_account')}{' '}
						<a href="/register" className="underline">
							{t('login.register')}
						</a>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
