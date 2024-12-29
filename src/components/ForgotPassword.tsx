import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRootService } from '@/providers/context_provider/ContextProvider';
import { ArrowLeft } from 'lucide-react';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingDots from './LoadingDots';

const ForgotPassword = observer(() => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { authService } = useRootService();
	const [email, setEmail] = useState('');
	const { role } = useParams();
	const [isLoading, setIsLoading] = useState(false);

	const handleReset = async () => {
		setIsLoading(true);
		try {
			if (role == 'candidate') {
				await authService.sendEmailNormalUser(email);
			} else {
				await authService.sendEmailBusinessUser(email);
			}
			navigate('/login');
		} catch (error) {
			// Hata işleme
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex h-screen w-full items-center justify-center px-4">
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">
						<Button
							variant="ghost"
							className="mb-2"
							onClick={() => {
								navigate('/login');
							}}
						>
							<ArrowLeft className="h-6 w-6" />
						</Button>
						{t('forgot_password.title')}
					</CardTitle>
					<CardDescription>{t('forgot_password.description')}</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">{t('login.email')}</Label>
							<Input
								id="email"
								type="email"
								placeholder={t('placeholder.email')}
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<Button type="button" className="w-full" onClick={handleReset} disabled={isLoading}>
							{isLoading ? <LoadingDots /> : t('forgot_password.submit')}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
});

export default ForgotPassword;
