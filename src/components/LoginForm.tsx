'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCustomTheme } from '@/providers/theme_provider/ThemeProvider';
import { Globe, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export const description =
	"A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export function LoginForm() {
	const { mode, setTheme } = useCustomTheme();
	const { t, i18n } = useTranslation();
	return (
		<Card className="mx-auto max-w-sm max-h-sm">
			<CardHeader>
				<div className="flex items-end place-content-between">
					<Select onValueChange={(value) => i18n.changeLanguage(value)}>
						<SelectTrigger className="w-[130px]" leftIcon={<Globe className="text-center text-xs " />}>
							<SelectValue placeholder={t(i18n.language)} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="en">{t('en')}</SelectItem>
								<SelectItem value="tr">{t('tr')}</SelectItem>
								<SelectItem value="sq">{t('sq')}</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<button
						className={`p-2 rounded-full border border-gray-300 flex items-end`}
						onClick={() => {
							setTheme(mode === 'light' ? 'dark' : 'light');
						}}
					>
						{mode === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
					</button>
				</div>

				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>Enter your email below to login to your account</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" type="email" placeholder="m@example.com" required />
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">{t('password')}</Label>
						</div>
						<Input id="password" type="password" required />
					</div>
					<Button type="submit" className="w-full">
						Login
					</Button>
					<Button variant="outline" className="w-full">
						Login with Google
					</Button>
				</div>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?
					<Button variant="link" className="w-full">
						Sign up
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
