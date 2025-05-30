import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { QueryResult, RegisterBusinessUser, TypeUser } from '@/DataTypes';
import { useRootService } from '@/providers/context_provider/ContextProvider';
import { ArrowLeft, Building2, MapPin, UserCircle } from 'lucide-react';
import { observer } from 'mobx-react';
import { SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AutoComplete from './AutoComplete';
import LoadingDots from './LoadingDots';
import { Alert, AlertDescription } from './ui/alert';

const CandidateRegistration = () => {
	const [error, setError] = useState(false);
	const [errorContent, setErrorContent] = useState('');
	const { authService } = useRootService();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	} as TypeUser);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await authService.registerUser(formData);
			if (res) navigate('/login');
			else {
				setError(true);
				setErrorContent(t('error.register'));
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid sm:gap-2">
				<Label htmlFor="email">{t('login.email')}</Label>
				<Input
					id="email"
					name="email"
					type="email"
					placeholder={t('placeholder.email')}
					required
					value={formData.email}
					onChange={handleInputChange}
				/>
			</div>
			<div className="grid sm:gap-2">
				<Label htmlFor="password">{t('login.password')}</Label>
				<Input
					id="password"
					name="password"
					type="password"
					required
					value={formData.password}
					onChange={handleInputChange}
				/>
			</div>
			<div className="grid sm:gap-2">
				<Label htmlFor="confirmPassword">{t('login.password_confirm')}</Label>
				<Input
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					required
					value={formData.confirmPassword}
					onChange={handleInputChange}
				/>
			</div>
			{error && (
				<Alert variant="destructive">
					<AlertDescription>{errorContent}</AlertDescription>
				</Alert>
			)}
			<Button type="submit" className="w-full" disabled={isLoading}>
				{isLoading ? <LoadingDots /> : t('login.submit')}
			</Button>
		</form>
	);
};

const EmployerRegistration = observer(() => {
	const [error, setError] = useState(false);
	const [errorContent, setErrorContent] = useState('');
	const { httpService, authService } = useRootService();
	const navigate = useNavigate();

	const { t, i18n } = useTranslation();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		businessName: '',
		businessAddress: '',
		businessDescription: '',
		businessLocation: '',
		businessWebsite: '',
		businessLogo: '',
	} as RegisterBusinessUser);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		if (name === 'businessLogo') {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = () => {
					if (reader.result) {
						setFormData((prev) => ({ ...prev, [name]: reader.result as string }));
					}
				};
				reader.readAsDataURL(file);
			} else {
				setFormData((prev) => ({ ...prev, [name]: '' }));
			}
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			setError(true);
			setErrorContent(t('error.passwordNotMatch'));
			return;
		}
		authService.registerBusiness(formData).then((res) => {
			if (res) {
				navigate('/login');
			} else {
				setError(true);
				setErrorContent(t('error.register'));
			}
		});
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid sm:gap-2">
				<Label htmlFor="email">{t('login.email')}</Label>
				<Input
					id="email"
					name="email"
					type="email"
					placeholder={t('placeholder.email')}
					required
					value={formData.email}
					onChange={handleInputChange}
				/>
			</div>
			<div className="grid sm:gap-2">
				<Label htmlFor="password">{t('login.password')}</Label>
				<Input
					id="password"
					name="password"
					type="password"
					required
					value={formData.password}
					onChange={handleInputChange}
				/>
			</div>
			<div className="grid sm:gap-2">
				<Label htmlFor="confirmPassword">{t('login.password_confirm')}</Label>
				<Input
					id="confirmPassword"
					name="confirmPassword"
					placeholder={t('placeholder.password')}
					type="password"
					required
					value={formData.confirmPassword}
					onChange={handleInputChange}
				/>
			</div>
			<div className="grid sm:gap-2">
				<Label htmlFor="businessName">{t('employer.businessName')}</Label>
				<Input
					id="businessName"
					name="businessName"
					placeholder={t('placeholder.businessName')}
					required
					value={formData.businessName}
					onChange={handleInputChange}
				/>
			</div>
			<div className="grid sm:gap-2">
				<Label htmlFor="businessAddress">{t('employer.businessAddress')}</Label>
				<Input
					id="businessAddress"
					name="businessAddress"
					placeholder={t('placeholder.businessAddress')}
					required
					value={formData.businessAddress}
					onChange={handleInputChange}
				/>
			</div>
			<div className="grid sm:gap-2">
				<Label htmlFor="businessDescription">{t('employer.businessDescription')}</Label>
				<Textarea
					id="businessDescription"
					name="businessDescription"
					placeholder={t('placeholder.businessDescription')}
					value={formData.businessDescription}
					onChange={handleInputChange}
				/>
			</div>
			<div className="grid sm:gap-2">
				<AutoComplete
					label="employer.businessLocation"
					placeholder={t('placeholder.location')}
					fetchOptions={(input: string) =>
						httpService.get<QueryResult>(`/api/country/${i18n.language}/${input}?`)
					}
					icon={
						<MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
					}
					onValueChanged={(selectedItem: SetStateAction<string> | null) => {
						if (selectedItem != null) {
							setFormData((prev) => {
								return { ...prev, businessLocation: selectedItem.toString() };
							});
						}
					}}
				/>
			</div>
			<div className="grid sm:gap-2">
				<Label htmlFor="businessWebsite">{t('employer.businessWebsite')}</Label>
				<Input
					id="businessWebsite"
					name="businessWebsite"
					type="url"
					placeholder={t('placeholder.businessWebsite')}
					value={formData.businessWebsite}
					onChange={handleInputChange}
				/>
			</div>
			<div className="grid sm:gap-2">
				<Label htmlFor="businessLogo">{t('employer.businessLogo')}</Label>
				<Input
					id="businessLogo"
					name="businessLogo"
					type="file"
					accept="image/*"
					onChange={handleInputChange}
				/>
			</div>
			{error && (
				<Alert variant="destructive">
					<AlertDescription>{errorContent}</AlertDescription>
				</Alert>
			)}
			<Button type="submit" className="w-full">
				{t('login.submit')}
			</Button>
		</form>
	);
});

export default function RegistrationForm() {
	const { t } = useTranslation();
	const [userType, setUserType] = useState<'candidate' | 'employer' | null>(null);

	const navigate = useNavigate();
	return (
		<div className="flex h-dvh items-center w-full justify-normal sm:justify-center">
			<Card className="w-full max-w-2xl ">
				<CardHeader>
					<CardTitle className="text-2xl">
						<Button
							variant="ghost"
							className="mb-2"
							onClick={() => {
								if (userType) {
									setUserType(null);
								} else {
									navigate('/login');
								}
							}}
						>
							<ArrowLeft className="h-6 w-6" />
						</Button>

						{t('registration.title')}
					</CardTitle>
					{userType && <CardDescription>{t('registration.description')}</CardDescription>}
				</CardHeader>
				<CardContent className="p-2">
					{!userType ? (
						<div className="grid grid-cols-2 gap-2">
							<Button
								variant="outline"
								className="h-32 flex flex-col items-center justify-center space-y-2"
								onClick={() => setUserType('candidate')}
							>
								<UserCircle className="!size-6" />
								<span className="text-sm font-semibold break-words">{t('registration.candidate')}</span>
							</Button>
							<Button
								variant="outline"
								className="h-32 flex flex-col items-center justify-center space-y-2"
								onClick={() => setUserType('employer')}
							>
								<Building2 className="!size-6" />
								<span className="text-sm font-semibold break-words">{t('registration.employer')}</span>
							</Button>
						</div>
					) : (
						<>
							{userType === 'candidate' && <CandidateRegistration />}
							{userType === 'employer' && <EmployerRegistration />}
						</>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
