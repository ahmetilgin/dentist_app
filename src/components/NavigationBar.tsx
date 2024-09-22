import { Button } from '@/components/ui/button';
import { useCustomTheme } from '@/providers/theme_provider/ThemeProvider';
import { Globe, Menu, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Card } from './ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function NavigationBar() {
	const { mode, setTheme } = useCustomTheme();
	const { t, i18n } = useTranslation();
	const [menuOpen, setMenuOpen] = useState(false);
	const location = useLocation();
	const { pathname } = location;
	return (
		<div className=" w-full border-b absolute">
			<div className="p-5 mx-auto py-4">
				<div className="hidden sm:flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<h1 className="text-2xl font-bold">Karriere</h1>
					</div>
					<div className="flex items-end place-content-between space-x-2">
						{pathname !== '/login' && (
							<div className="flex items-center">
								<Button>Giriş Yap / Üye Ol</Button>
							</div>
						)}

						<Select onValueChange={(value) => i18n.changeLanguage(value)}>
							<SelectTrigger className="w-[130px] " leftIcon={<Globe className="text-center text-xs " />}>
								<SelectValue placeholder={t(i18n.language)} />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="en">{t('en')}</SelectItem>
									<SelectItem value="tr">{t('tr')}</SelectItem>
									<SelectItem value="al">{t('al')}</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
						<button
							className={`p-2 rounded-full border  flex items-end`}
							onClick={() => {
								setTheme(mode === 'light' ? 'dark' : 'light');
							}}
						>
							{mode === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
						</button>
					</div>
				</div>
				<div className="flex sm:hidden items-center justify-between">
					<div className="flex items-center space-x-2">
						<h1 className="text-2xl font-bold">Karriere</h1>
					</div>
					<div className="flex items-end place-content-between space-x-2">
						<button className={`p-2 rounded-full border  flex items-end`}>
							<Menu
								className="h-5 w-5"
								onClick={() => {
									setMenuOpen(!menuOpen);
								}}
							/>
							{menuOpen && (
								<Card className="absolute z-10 top-16 right-0 p-2">
									{pathname !== '/login' && (
										<Button className="w-full rounded-none">Giriş Yap / Üye Ol</Button>
									)}

									<div className="flex flex-row mt-1">
										<Select onValueChange={(value) => i18n.changeLanguage(value)}>
											<SelectTrigger
												className="w-[130px] rounded-none "
												leftIcon={<Globe className="text-center text-xs " />}
											>
												<SelectValue placeholder={t(i18n.language)} />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value="en">{t('en')}</SelectItem>
													<SelectItem value="tr">{t('tr')}</SelectItem>
													<SelectItem value="al">{t('al')}</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
										<button
											className={`p-2 rounded-none border w-full justify-center  flex items-end`}
											onClick={() => {
												setTheme(mode === 'light' ? 'dark' : 'light');
											}}
										>
											{mode === 'light' ? (
												<Moon className="h-5 w-5" />
											) : (
												<Sun className="h-5 w-5" />
											)}
										</button>
									</div>
								</Card>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
