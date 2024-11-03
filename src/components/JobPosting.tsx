import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EnumEmploymentType, QueryResult, TypeJob } from '@/DataTypes';
import { useRootService } from '@/providers/context_provider/ContextProvider';
import { BriefcaseBusiness, MapPin } from 'lucide-react';
import { SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import AutoComplete from './AutoComplete';

export function JobPostingFormComponent() {
	const { t, i18n } = useTranslation();
	const { httpService, jobService } = useRootService();

	const [jobData, setJobData] = useState<TypeJob>({
		JobTitle: '',
		Description: '',
		Requirements: '',
		Location: '',
		SalaryRange: '',
		EmploymentType: '',
		DatePosted: '',
		ApplicationDeadline: '',
	} as TypeJob);

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setJobData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSelectChange = (name: string, value: string) => {
		setJobData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleRequirementChange = (content: string) => {
		setJobData((prevData) => ({
			...prevData,
			Requirements: content,
		}));
	};

	const handleDescriptionChange = (content: string) => {
		setJobData((prevData) => ({
			...prevData,
			Description: content,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		jobService.publishJob(jobData);
	};

	const modules = {
		toolbar: [
			[{ font: [] }],
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			['bold', 'italic', 'underline', 'strike'],
			[{ color: [] }, { background: [] }],
			[{ script: 'sub' }, { script: 'super' }],
			['blockquote', 'code-block'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			[{ indent: '-1' }, { indent: '+1' }, { align: [] }],
			['link', 'image', 'video'],
			['clean'],
		],
	};

	return (
		<div className="flex justify-center items-center min-h-screen p-0 sm:p-4 w-full sm:w-8/12">
			<Card className="w-full">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">
						{t('job_posting.create_new_job_posting')}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<AutoComplete
								label="job_posting.title"
								placeholder="placeholder.position"
								fetchOptions={(input: string) =>
									httpService.get<QueryResult>(
										`/public/jobs/search_professions/${i18n.language}/${input}?`
									)
								}
								icon={
									<BriefcaseBusiness className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
								}
								onValueChanged={(selectedItem: SetStateAction<string> | null) => {
									if (selectedItem != null) {
										setJobData((prevData) => ({
											...prevData,
											JobTitle: selectedItem.toString(),
										}));
									}
								}}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="Description">{t('job_posting.description')}</Label>
							<ReactQuill
								theme="snow"
								value={jobData.Description}
								onChange={handleDescriptionChange}
								modules={modules}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="Requirements">{t('job_posting.job_requirements')}</Label>

							<ReactQuill
								theme="snow"
								value={jobData.Requirements}
								onChange={handleRequirementChange}
								modules={modules}
							/>
						</div>

						<div className="space-y-2">
							<AutoComplete
								label="job_posting.location"
								placeholder={t('placeholder.location')}
								fetchOptions={(input: string) =>
									httpService.get<QueryResult>(`/public/country/${i18n.language}/${input}?`)
								}
								icon={
									<MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
								}
								onValueChanged={(selectedItem: SetStateAction<string> | null) => {
									if (selectedItem != null) {
										setJobData((prevData) => ({
											...prevData,
											Location: selectedItem.toString(),
										}));
									}
								}}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="SalaryRange">{t('job_posting.salary')}</Label>
							<Input
								id="SalaryRange"
								name="SalaryRange"
								value={jobData.SalaryRange}
								onChange={handleInputChange}
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="EmploymentType">{t('job_posting.employment_type')}</Label>
							<Select
								name="EmploymentType"
								value={jobData.EmploymentType}
								onValueChange={(value) => handleSelectChange('employmentType', value)}
							>
								<SelectTrigger>
									<SelectValue placeholder={t('job_posting.employment_type')} />
								</SelectTrigger>
								<SelectContent>
									{Object.values(EnumEmploymentType).map((type) => {
										return (
											<SelectItem key={type} value={type}>
												{t(type)}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="DatePosted">{t('job_posting.date_posted')}</Label>
							<Input
								id="DatePosted"
								name="DatePosted"
								type="date"
								value={jobData.DatePosted}
								onChange={handleInputChange}
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="ApplicationDeadline">{t('job_posting.application_deadline')}</Label>
							<Input
								id="ApplicationDeadline"
								name="ApplicationDeadline"
								type="date"
								value={jobData.ApplicationDeadline}
								onChange={handleInputChange}
								required
							/>
						</div>

						<Button type="submit" className="w-full">
							{t('job_posting.create_new_job_posting')}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
