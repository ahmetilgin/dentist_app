import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react';
import { useTranslation } from 'next-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';
import { CertificationsSection } from './CertificationsSection';
import { EducationSection } from './EducationSection';
import { HobbiesSection } from './HobbiesSection';
import { LanguagesSection } from './LanguagesSection';
import { PersonalInfoSection } from './PersonalInfoSection';
import ProjectsSection from './ProjectsSection';
import { SkillsSection } from './SkillsSection';
import WorkExperienceSection from './WorkExperienceSection';

const formSchema = z.object({
	fullName: z.string().min(2, { message: 'Full name is required' }),
	email: z.string().email({ message: 'Invalid email address' }),
	phoneNumber: z.string().min(10, { message: 'Phone number is required' }),
	education: z.array(
		z.object({
			degree: z.string().min(1, { message: 'Degree is required' }),
			institution: z.string().min(1, { message: 'Institution is required' }),
			startDate: z.string().min(1, { message: 'Start date is required' }),
			endDate: z.string().optional(),
		})
	),
	workExperience: z.array(
		z.object({
			companyName: z.string().min(1, { message: 'Company name is required' }),
			position: z.string().min(1, { message: 'Position is required' }),
			startDate: z.string().min(1, { message: 'Start date is required' }),
			endDate: z.string().optional(),
		})
	),
	skills: z.array(z.string()).min(1, { message: 'At least one skill is required' }),
	projects: z.array(
		z.object({
			name: z.string().min(1, { message: 'Project name is required' }),
			description: z.string().min(1, { message: 'Project description is required' }),
		})
	),
	certifications: z.array(
		z.object({
			name: z.string().min(1, { message: 'Certification name is required' }),
			issuingOrganization: z.string().min(1, { message: 'Issuing organization is required' }),
			issueDate: z.string().min(1, { message: 'Issue date is required' }),
		})
	),
	languages: z.array(
		z.object({
			name: z.string().min(1, { message: 'Language name is required' }),
			proficiency: z.string().min(1, { message: 'Proficiency level is required' }),
		})
	),
	hobbies: z.array(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

const CVForm = observer(() => {
	const { t } = useTranslation('common');
	const methods = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: '',
			email: '',
			phoneNumber: '',
			education: [{ degree: '', institution: '', startDate: '', endDate: '' }],
			workExperience: [{ companyName: '', position: '', startDate: '', endDate: '' }],
			skills: [''],
			projects: [{ name: '', description: '' }],
			certifications: [{ name: '', issuingOrganization: '', issueDate: '' }],
			languages: [{ name: '', proficiency: '' }],
			hobbies: [''],
		},
	});

	function onSubmit(data: FormValues) {
		console.log(data);
	}

	return (
		<FormProvider {...methods}>
			<Form {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
					<PersonalInfoSection />
					<EducationSection />
					<WorkExperienceSection />
					<SkillsSection />
					<ProjectsSection />
					<CertificationsSection />
					<LanguagesSection />
					<HobbiesSection />
					<Button type="submit">{t('cv.submit')}</Button>
				</form>
			</Form>
		</FormProvider>
	);
});

export default CVForm;
