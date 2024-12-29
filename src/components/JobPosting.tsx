import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EnumEmploymentType, QueryResult, TypeJob } from '@/DataTypes';
import { useToast } from '@/hooks/use-toast';
import { useRootService } from '@/providers/context_provider/ContextProvider';
import { ArrowLeft, BriefcaseBusiness, MapPin } from 'lucide-react';
import { observer } from 'mobx-react';
import { SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import AutoComplete from './AutoComplete';
import LoadingDots from './LoadingDots';

export const JobPostingFormComponent = observer(() => {
	const { t, i18n } = useTranslation();
	const { httpService, jobService } = useRootService();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);

	const [jobData, setJobData] = useState<TypeJob>({
		JobTitle: '',
		Description: '',
		Location: '',
		SalaryRange: '',
		EmploymentType: '',
		DatePosted: new Date().toISOString().split('T')[0],
		ApplicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
		ID: '',
		UserID: '',
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

	const handleDescriptionChange = (content: string) => {
		setJobData((prevData) => ({
			...prevData,
			Description: content,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await jobService.publishJob(jobData);
			toast({
				title: t('job_posting.success'),
				description: t('job_posting.success_desc'),
				variant: 'default',
			});
			navigate('/manage-jobs');
		} catch (error) {
			console.error(error);
			toast({
				title: t('job_posting.error'),
				description: t('job_posting.error_desc'),
				variant: 'destructive',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const modules = {
		toolbar: [
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

	const navigate = useNavigate();

	return (
		<div className="flex justify-center items-center min-h-screen p-0 sm:p-4 w-full sm:w-10/12 lg:w-8/12">
			<Card className="w-full">
				<CardHeader>
					<CardTitle className="text-2xl font-bold ">
						<Button
							variant="ghost"
							className="mb-2"
							onClick={() => {
								navigate(-1);
							}}
						>
							<ArrowLeft className="h-6 w-6" />
						</Button>
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
										`/api/jobs/search_professions/${i18n.language}/${input}?`
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
							<AutoComplete
								label="job_posting.location"
								placeholder={t('placeholder.location')}
								fetchOptions={(input: string) =>
									httpService.get<QueryResult>(`/api/country/${i18n.language}/${input}?`)
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
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? (
								<div className="flex items-center justify-center">
									<LoadingDots />
								</div>
							) : (
								t('job_posting.create_new_job_posting')
							)}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
});
