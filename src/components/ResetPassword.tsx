import { useRootService } from '@/providers/context_provider/ContextProvider';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingDots from './LoadingDots';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function ResetPassword() {
	const { t } = useTranslation();
	const { authService } = useRootService();
	const navigate = useNavigate();
	const { token } = useParams();
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleResetPassword = async () => {
		setIsLoading(true);
		try {
			await authService.resetPassword(token!, password);
			navigate('/login');
		} catch {
			setErrorMessage(t('error.reset_password'));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex h-screen w-full items-center justify-center px-4">
			<div className="mx-auto max-w-sm">
				<div className="grid gap-4">
					<h1 className="text-3xl">{t('reset_password.title')}</h1>
					<p className="text-sm">{t('reset_password.description')}</p>
					<div className="grid gap-2">
						<label htmlFor="password" className="text-sm">
							{t('reset_password.new_password')}
						</label>
						<Input
							id="password"
							type="password"
							className="border px-2 py-1"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<label htmlFor="confirmPassword" className="text-sm">
							{t('reset_password.confirm_password')}
						</label>
						<Input
							id="confirmPassword"
							type="password"
							className="border px-2 py-1"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					{errorMessage && <p className="text-red-500">{errorMessage}</p>}
					<Button className=" px-4 py-2 " onClick={handleResetPassword} disabled={isLoading}>
						{isLoading ? <LoadingDots /> : t('reset_password.submit')}
					</Button>
				</div>
			</div>
		</div>
	);
}
