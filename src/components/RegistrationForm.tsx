import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Building2, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Simüle edilmiş useTranslation hook'u

const CandidateRegistration = () => {
	const { t } = useTranslation();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Candidate form data:', formData);
		// Burada aday form verilerini gönderme işlemi yapılabilir
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid sm:gap-2">
				<Label htmlFor="email">{t('login.email')}</Label>
				<Input
					id="email"
					name="email"
					type="email"
					placeholder={t('login.email')}
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
			<Button type="submit" className="w-full">
				{t('login.submit')}
			</Button>
		</form>
	);
};

const EmployerRegistration = () => {
	const { t } = useTranslation();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		businessName: '',
		businessAddress: '',
		businessDescription: '',
		businessLocation: '',
		businessWebsite: '',
		businessLogo: '',
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Employer form data:', formData);
		// Burada işveren form verilerini gönderme işlemi yapılabilir
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid sm:gap-2">
				<Label htmlFor="email">{t('login.email')}</Label>
				<Input
					id="email"
					name="email"
					type="email"
					placeholder={t('login.email')}
					required
					value={formData.email}
					onChange={handleInputChange}
				/>
			</div>
			<div className="grid sm:gap-2">
				<Label htmlFor="password">{t('form.password')}</Label>
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
				<Label htmlFor="businessName">{t('employer.businessName')}</Label>
				<Input
					id="businessName"
					name="businessName"
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
					value={formData.businessDescription}
					onChange={handleInputChange}
				/>
			</div>
			<div className="grid sm:gap-2">
				<Label htmlFor="businessLocation">{t('employer.businessLocation')}</Label>
				<Input
					id="businessLocation"
					name="businessLocation"
					value={formData.businessLocation}
					onChange={handleInputChange}
				/>
			</div>
			<div className="grid sm:gap-2">
				<Label htmlFor="businessWebsite">{t('employer.businessWebsite')}</Label>
				<Input
					id="businessWebsite"
					name="businessWebsite"
					type="url"
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
			<Button type="submit" className="w-full">
				{t('form.submit')}
			</Button>
		</form>
	);
};

export default function RegistrationForm() {
	const { t } = useTranslation();
	const [userType, setUserType] = useState<'candidate' | 'employer' | null>(null);

	return (
		<div className="flex min-h-screen w-full items-center justify-normal sm:justify-center">
			<Card className="w-full max-w-2xl">
				<CardHeader>
					<CardTitle className="text-2xl">
						{userType && (
							<Button variant="ghost" className="mb-2" onClick={() => setUserType(null)}>
								<ArrowLeft className="h-6 w-6" />
							</Button>
						)}
						{t('registration.title')}
					</CardTitle>
					{userType && <CardDescription>{t('registration.description')}</CardDescription>}
				</CardHeader>
				<CardContent>
					{!userType ? (
						<div className="grid grid-cols-2 gap-4">
							<Button
								variant="outline"
								className="h-32 flex flex-col items-center justify-center space-y-2"
								onClick={() => setUserType('candidate')}
							>
								<UserCircle className="h-96 w-96" />
								<span>{t('registration.candidate')}</span>
							</Button>
							<Button
								variant="outline"
								className="h-32 flex flex-col items-center justify-center space-y-2"
								onClick={() => setUserType('employer')}
							>
								<Building2 className="h-96 w-96" />
								<span>{t('registration.employer')}</span>
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
