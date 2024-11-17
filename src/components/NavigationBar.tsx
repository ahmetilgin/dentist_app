import { Button } from '@/components/ui/button';
import { EnumUserType } from '@/DataTypes';
import { useRootStore } from '@/providers/context_provider/ContextProvider';
import { useCustomTheme } from '@/providers/theme_provider/ThemeProvider';
import { Globe, LogOut, Menu, Moon, Sun } from 'lucide-react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function NavigationBar() {
	const { mode, setTheme } = useCustomTheme();
	const { t, i18n } = useTranslation();
	const [menuOpen, setMenuOpen] = useState(false);
	const { userStore } = useRootStore();
	const location = useLocation();
	const navigate = useNavigate();
	const { pathname } = location;
	const menuRef = useRef<HTMLDivElement>(null);
	const handleLogout = () => {
		userStore.logout();
		navigate('/');
	};

	return (
		<div className="w-full border-b absolute">
			<div className="p-5 mx-auto py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<h1
							className="text-2xl font-bold cursor-pointer"
							onClick={() => {
								navigate('/');
							}}
						>
							Karriere
						</h1>
					</div>
					<div className="flex items-center space-x-2">
						{!userStore.isAuthenticated && pathname !== '/login' && (
							<Button
								onClick={() => {
									navigate('/login');
								}}
							>
								{t('general.login_signup')}
							</Button>
						)}
						{userStore.userType == EnumUserType.EMPLOYER && (
							<Button
								className="w-full"
								onClick={() => {
									navigate('/publish_job');
									setMenuOpen(false);
								}}
							>
								{t('job_posting.publish_job')}
							</Button>
						)}
						<div ref={menuRef} className="relative">
							<button
								className="p-2 rounded-full border flex items-end"
								onClick={() => {
									setMenuOpen(!menuOpen);
								}}
							>
								<Menu className="h-5 w-5" />
							</button>
							{menuOpen && (
								<Card className="absolute z-10 top-12 right-0 p-2 space-y-2 min-w-[200px]">
									<div className="space-y-2">
										<Select
											onValueChange={(value) => {
												i18n.changeLanguage(value);
												setMenuOpen(false);
											}}
										>
											<SelectTrigger
												className="w-full"
												leftIcon={<Globe className="text-center text-xs" />}
											>
												<SelectValue placeholder={t('general.' + i18n.language)} />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value="en">{t('general.en')}</SelectItem>
													<SelectItem value="tr">{t('general.tr')}</SelectItem>
													<SelectItem value="al">{t('general.al')}</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
										<button
											className="p-2 border w-full flex items-center justify-center gap-2"
											onClick={() => {
												userStore.setTheme(mode === 'light' ? 'dark' : 'light');
												setTheme(mode === 'light' ? 'dark' : 'light');
												setMenuOpen(false);
											}}
										>
											{mode === 'light' ? (
												<>
													<Moon className="h-4 w-4" />
													<span>{t('general.dark_mode')}</span>
												</>
											) : (
												<>
													<Sun className="h-4 w-4" />
													<span>{t('general.light_mode')}</span>
												</>
											)}
										</button>
									</div>
									{userStore.isAuthenticated && (
										<>
											<Button
												variant="outline"
												onClick={() => {
													handleLogout();
													setMenuOpen(false);
												}}
												className="w-full flex items-center justify-center gap-2"
											>
												<LogOut className="h-4 w-4" />
												{t('general.logout')}
											</Button>
										</>
									)}
								</Card>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
