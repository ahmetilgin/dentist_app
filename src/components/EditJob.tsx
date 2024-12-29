import { TypeJob } from '@/DataTypes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
// Add this if you haven't imported the styles elsewhere
import LoadingDots from '@/components/LoadingDots';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import 'react-quill-new/dist/quill.snow.css';

interface EditJobComponentProps {
	job: TypeJob;
	onSave: (updatedJob: TypeJob) => void;
}

const EditJobComponent = observer(({ job, onSave }: EditJobComponentProps) => {
	const { t } = useTranslation();
	const [editedJob, setEditedJob] = React.useState<TypeJob>(job);
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setEditedJob((prev) => ({ ...prev, [name]: value }));
	};

	const handleQuillChange = (name: string) => (value: string) => {
		setEditedJob((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (name: string) => (value: string) => {
		setEditedJob((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await onSave(editedJob);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex-1 overflow-y-auto md:max-h-[85vh] max-h-[100vh] w-full max-w-3xl mx-auto">
			<form onSubmit={handleSubmit} className="space-y-4 p-4">
				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="JobTitle">{t('job_posting.title')}</Label>
						<Input
							id="JobTitle"
							name="JobTitle"
							value={editedJob.JobTitle}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="Location">{t('job_posting.location')}</Label>
						<Input
							id="Location"
							name="Location"
							value={editedJob.Location}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="SalaryRange">{t('job_posting.salary')}</Label>
						<Input
							id="SalaryRange"
							name="SalaryRange"
							value={editedJob.SalaryRange}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="EmploymentType">{t('job_posting.employment_type')}</Label>
						<Select
							name="EmploymentType"
							value={editedJob.EmploymentType}
							onValueChange={handleSelectChange('EmploymentType')}
						>
							<SelectTrigger>
								<SelectValue placeholder={t('placeholder.employment_type')} />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="fulltime">{t('employment_type.fulltime')}</SelectItem>
								<SelectItem value="parttime">{t('employment_type.parttime')}</SelectItem>
								<SelectItem value="contract">{t('employment_type.contract')}</SelectItem>
								<SelectItem value="temporary">{t('employment_type.temporary')}</SelectItem>
								<SelectItem value="internship">{t('employment_type.internship')}</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="ApplicationDeadline">{t('job_posting.application_deadline')}</Label>
						<Input
							id="ApplicationDeadline"
							name="ApplicationDeadline"
							type="date"
							value={new Date(editedJob.ApplicationDeadline).toISOString().split('T')[0]}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="Description">{t('job_posting.description')}</Label>
					<ReactQuill
						theme="snow"
						value={editedJob.Description}
						onChange={handleQuillChange('Description')}
						className="bg-background min-h-[200px]"
					/>
				</div>

				<div className="flex w-full justify-center">
					<Button className="w-full" type="submit" disabled={isLoading}>
						{isLoading ? (
							<div className="flex items-center justify-center">
								<LoadingDots />
							</div>
						) : (
							t('job_posting.save')
						)}
					</Button>
				</div>
			</form>
		</div>
	);
});

export default EditJobComponent;
