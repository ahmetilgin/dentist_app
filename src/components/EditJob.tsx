import { TypeJob } from '@/DataTypes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

interface EditJobComponentProps {
	job: TypeJob;
	onSave: (updatedJob: TypeJob) => void;
}

export function EditJobComponent({ job, onSave }: EditJobComponentProps) {
	const [editedJob, setEditedJob] = React.useState<TypeJob>(job);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setEditedJob((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (name: string) => (value: string) => {
		setEditedJob((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(editedJob);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<Label htmlFor="JobTitle">Job Title</Label>
				<Input id="JobTitle" name="JobTitle" value={editedJob.JobTitle} onChange={handleChange} required />
			</div>
			<div>
				<Label htmlFor="Description">Description</Label>
				<Textarea
					id="Description"
					name="Description"
					value={editedJob.Description}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<Label htmlFor="Requirements">Requirements</Label>
				<Textarea
					id="Requirements"
					name="Requirements"
					value={editedJob.Requirements}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<Label htmlFor="Location">Location</Label>
				<Input id="Location" name="Location" value={editedJob.Location} onChange={handleChange} required />
			</div>
			<div>
				<Label htmlFor="SalaryRange">Salary Range</Label>
				<Input
					id="SalaryRange"
					name="SalaryRange"
					value={editedJob.SalaryRange}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<Label htmlFor="EmploymentType">Employment Type</Label>
				<Select
					name="EmploymentType"
					value={editedJob.EmploymentType}
					onValueChange={handleSelectChange('EmploymentType')}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select employment type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="Full-time">Full-time</SelectItem>
						<SelectItem value="Part-time">Part-time</SelectItem>
						<SelectItem value="Contract">Contract</SelectItem>
						<SelectItem value="Temporary">Temporary</SelectItem>
						<SelectItem value="Internship">Internship</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div>
				<Label htmlFor="ApplicationDeadline">Application Deadline</Label>
				<Input
					id="ApplicationDeadline"
					name="ApplicationDeadline"
					type="date"
					value={new Date(editedJob.ApplicationDeadline).toISOString().split('T')[0]}
					onChange={handleChange}
					required
				/>
			</div>
			<Button type="submit">Save Changes</Button>
		</form>
	);
}
