import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EnumEmploymentType, EnumUserType, EnumWorkplaceType, JobData, TypeJobs } from '@/DataTypes';
import { useToast } from '@/hooks/use-toast';
import { useRootService, useRootStore } from '@/providers/context_provider/ContextProvider';
import { ChevronDown, Share2 } from 'lucide-react';
import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill-new';
import { useNavigate } from 'react-router-dom';

function FilterCombobox({ title, options }: { title: string; options: string[] }) {
	const [open, setOpen] = React.useState(false);
	const { t } = useTranslation();
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
					{title}
					<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Card>
					<CardContent className="grid gap-4 p-4">
						{options.map((option) => (
							<div key={option} className="flex items-center space-x-2">
								<Checkbox id={option} />
								<Label htmlFor={option}>{option}</Label>
							</div>
						))}
					</CardContent>
					<CardFooter className="flex justify-between">
						<Button variant="outline" size="sm">
							{t('job_posting.reset')}
						</Button>
						<Button size="sm" onClick={() => setOpen(false)}>
							{t('job_posting.apply')}
						</Button>
					</CardFooter>
				</Card>
			</PopoverContent>
		</Popover>
	);
}

function TopFilters({ companies }: { companies: string[] }) {
	const { t } = useTranslation();
	return (
		<div className="w-full border-b shadow-md">
			<div className="flex w-full py-4 space-x-2 overflow-y-hidden overflow-x-scroll sm:overflow-x-hidden px-4">
				<FilterCombobox
					title={t('job_posting.workplace_type')}
					options={Object.values(EnumWorkplaceType).map((type) => t(type)) as string[]}
				/>
				<FilterCombobox
					title={t('job_posting.employment_type')}
					options={Object.values(EnumEmploymentType).map((type) => t(type)) as string[]}
				/>
				<FilterCombobox title={t('general.company')} options={[...companies]} />
				<Button variant="ghost" size="sm" className="h-10 whitespace-nowrap">
					{t('job_posting.reset')}
				</Button>
			</div>
		</div>
	);
}

function JobInfo({ title, location, company }: { title: string; location: string; company: string }) {
	return (
		<div>
			<h2 className="text-2xl font-bold">{title}</h2>
			<p className="text-muted-foreground">{location}</p>
			<p className="mt-2 text-sm text-gray-500">{company}</p>
		</div>
	);
}

function ApplyButton({ jobId }: { jobId: string }) {
	const { t } = useTranslation();
	const { jobService } = useRootService();
	const { userStore } = useRootStore();
	const navigate = useNavigate();
	const { toast } = useToast();

	return (
		<div className="flex items-center space-x-2">
			<Button
				onClick={() => {
					if (userStore.isAuthenticated && userStore.userType === EnumUserType.CANDIDATE) {
						jobService
							.applyJob(jobId)
							.then((res) => {
								if (res) {
									toast({
										title: t('job_posting.successfully_applied'),
										description: t('job_posting.successfully_applied_desc'),
										variant: 'default',
									});
								} else {
									toast({
										title: t('job_posting.already_applied'),
										description: t('job_posting.already_applied_desc'),
										variant: 'default',
									});
								}
							})
							.catch(() => {
								toast({
									title: t('job_posting.application_error'),
									description: t('job_posting.application_error_desc'),
									variant: 'destructive',
								});
							});
					} else {
						toast({
							title: t('job_posting.login_to_apply'),
							description: t('job_posting.login_to_apply_desc'),
							variant: 'destructive',
						});
						setTimeout(() => {
							navigate('/login');
						}, 3000);
					}
				}}
			>
				{t('job_posting.apply')}
			</Button>
			<Button variant="outline" size="icon">
				<Share2 className="h-4 w-4" />
			</Button>
		</div>
	);
}

function JobDescription({ job }: { job: JobData }) {
	const { t } = useTranslation();

	const formatDate = (date: string) =>
		new Date(date).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	return (
		<div className="space-y-4">
			{job.jobDetail.DatePosted && (
				<div>
					<span className="font-medium">{t('job_posting.date_posted')}: </span>
					<span>{formatDate(job.jobDetail.DatePosted)}</span>
				</div>
			)}
			{job.jobDetail.ApplicationDeadline && (
				<div>
					<span className="font-medium">{t('job_posting.application_deadline')}: </span>
					<span>{formatDate(job.jobDetail.ApplicationDeadline)}</span>
				</div>
			)}
			{job.jobDetail.Description && (
				<div className="text-lg font-semibold">
					<ReactQuill value={job.jobDetail.Description} readOnly={true} theme={'bubble'} />
				</div>
			)}
			{job.jobDetail.Requirements && (
				<div className="text-sm">
					<span className="font-medium">{t('job_posting.job_requirements')}:</span>
					<ReactQuill value={job.jobDetail.Requirements} readOnly={true} theme={'bubble'} />
				</div>
			)}
			{job.jobDetail.UserID && (
				<div className="flex text-sm ">
					<span className="font-medium">{t('general.company')}: </span>
					<span>{job.jobDetail.UserID}</span>
				</div>
			)}
			{job.jobDetail.EmploymentType && (
				<div className="flex text-sm text-gray-500">
					<span className="font-medium">{t('job_posting.employment_type')}: </span>
					<span>{job.jobDetail.EmploymentType}</span>
				</div>
			)}
			{job.jobDetail.SalaryRange && (
				<div className="flex text-sm text-gray-500">
					<span className="font-medium">{t('job_posting.salary')}: </span>
					<span>{job.jobDetail.SalaryRange}</span>
				</div>
			)}
		</div>
	);
}

function JobListItem({
	logo,
	title,
	company,
	location,
	onClicked,
	selected,
}: {
	logo: string;
	title: string;
	company: string;
	location: string;
	onClicked: () => void;
	selected?: boolean;
}) {
	return (
		<div
			className={`${
				selected ? 'border ' : ''
			} p-4 border-b last:border-b-0 cursor-pointer hover:bg-blue-100 transition duration-150`}
			onClick={onClicked}
		>
			<div className="flex items-center space-x-4">
				<div className="w-12 h-12 bg-secondary flex items-center justify-center rounded-full">
					<img className="w-8 h-8" src={logo}></img>
				</div>
				<div>
					<p className="text-sm text-gray-500">{company}</p>
					<h3 className="font-semibold text-lg mt-1">{title}</h3>
					<p className="text-sm text-gray-400">{location}</p>
				</div>
			</div>
		</div>
	);
}

export default function JobListing({ jobs }: { jobs: TypeJobs }) {
	const [showDetail, setShowDetail] = React.useState(false);
	const [selectedJob, setSelectedJob] = React.useState<JobData | null>(null);

	useEffect(() => {
		const handlePopState = () => setShowDetail(false);
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	const openJobDetail = (job: JobData) => {
		setShowDetail(true);
		setSelectedJob(job);
		window.history.pushState(null, '', window.location.href);
	};

	const companies = jobs.map((job) => job.businessUserData.BusinessName);

	return (
		<div className="flex flex-col h-full pb-10">
			<TopFilters companies={companies} />
			<div className="flex h-full">
				<ScrollArea className={`${showDetail ? 'hidden sm:block' : ''} w-full sm:w-1/3 border-r pb-5`}>
					<div className="pr-4">
						{jobs.map((job, index) => (
							<JobListItem
								key={index}
								title={job.jobDetail.JobTitle}
								company={job.businessUserData.BusinessName}
								location={job.jobDetail.Location}
								selected={job.jobDetail.JobTitle === selectedJob?.jobDetail.JobTitle}
								logo={job.businessUserData.BusinessLogo}
								onClicked={() => openJobDetail(job)}
							/>
						))}
					</div>
				</ScrollArea>
				<div className={`${showDetail ? 'block' : 'hidden'} sm:block flex-1 overflow-auto`}>
					{selectedJob && (
						<Card className="rounded-none h-full shadow-md">
							<CardHeader>
								<JobInfo
									title={selectedJob.jobDetail.JobTitle}
									location={selectedJob.jobDetail.Location}
									company={selectedJob.businessUserData.BusinessName}
								/>
							</CardHeader>
							<CardContent>
								<ApplyButton jobId={selectedJob.jobDetail.ID} />
								<JobDescription job={selectedJob} />
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</div>
	);
}
