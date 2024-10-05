import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';

export function LoginForm() {
	const { t } = useTranslation();

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
						<Input id="email" type="email" placeholder={t('login.email')} required />
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">{t('login.password')}</Label>
							<a href="#" className="ml-auto inline-block text-sm underline">
								{t('login.forgot_password')}
							</a>
						</div>
						<Input id="password" type="password" required />
					</div>
					<Button type="submit" className="w-full">
						{t('login.submit', 'Giriş')}
					</Button>
					<div className="mt-4 text-center text-sm">
						{t('login.no_account')}{' '}
						<a href="#" className="underline">
							{t('login.register')}
						</a>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
