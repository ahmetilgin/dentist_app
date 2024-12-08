import { Globe, LogOut, Moon, Sun, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { EnumUserType } from '@/DataTypes';
import { useRootStore } from '@/providers/context_provider/ContextProvider';
import { useCustomTheme } from '@/providers/theme_provider/ThemeProvider';

export function NavigationBar() {
	const { mode, setTheme } = useCustomTheme();
	const { t, i18n } = useTranslation();
	const { userStore } = useRootStore();
	const location = useLocation();
	const navigate = useNavigate();
	const { pathname } = location;

	const handleLogout = () => {
		userStore.logout();
		navigate('/');
	};

	const changeLanguage = (lang: string) => {
		i18n.changeLanguage(lang);
	};

	return (
		<header className="w-full border-b">
			<div className=" mx-auto px-4  py-4">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
						Karriere
					</h1>
					<nav className="flex items-center space-x-2">
						{!userStore.isAuthenticated && pathname !== '/login' && (
							<Button onClick={() => navigate('/login')}>{t('general.login_signup')}</Button>
						)}
						{userStore.isAuthenticated && userStore.userType === EnumUserType.EMPLOYER && (
							<Button variant="outline" onClick={() => navigate('/publish_job')}>
								{t('job_posting.publish_job')}
							</Button>
						)}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="icon" className="h-9 w-9">
									<Globe className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => changeLanguage('en')}>
									{t('general.en')}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => changeLanguage('tr')}>
									{t('general.tr')}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => changeLanguage('al')}>
									{t('general.al')}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => changeLanguage('it')}>
									{t('general.it')}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<Button
							variant="outline"
							size="icon"
							className="h-9 w-9"
							onClick={() => setTheme(mode === 'light' ? 'dark' : 'light')}
						>
							{mode === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
						</Button>
						{userStore.isAuthenticated && (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" size="icon" className="h-9 w-9">
										<User className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									{userStore.userType === EnumUserType.EMPLOYER && (
										<DropdownMenuItem onSelect={() => navigate('/manage_jobs')}>
											{t('general.manage_jobs')}
										</DropdownMenuItem>
									)}
									<DropdownMenuSeparator />
									<DropdownMenuItem onSelect={handleLogout}>
										<LogOut className="mr-2 h-4 w-4" />
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
}
