import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EnumEmploymentType, EnumUserType, EnumWorkplaceType, JobData, TypeJobs } from '@/DataTypes';
import { useToast } from '@/hooks/use-toast';
import { useRootService, useRootStore } from '@/providers/context_provider/ContextProvider';
import { ArrowLeft, ChevronDown, MapPin, Share2 } from 'lucide-react';
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
							{t('general.apply')}
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
		<div className="w-full border-b shadow-md mt-2 mb-2">
			<div className="flex w-full space-x-2 overflow-y-hidden overflow-x-scroll sm:overflow-x-hidden">
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

function JobInfo({ selectedJob, onClose }: { selectedJob: JobData; onClose: () => void }) {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col h-full">
			{/* Header */}
			<div className="flex items-center justify-between p-4 border-b gap-4 md:gap-0">
				<Button
					variant="ghost"
					className="w-8 h-8 text-2xl"
					onClick={() => {
						navigate(-1);
						onClose();
					}}
				>
					<ArrowLeft />
				</Button>
				<div className="flex items-center space-x-4">
					<div className="w-6 h-6 overflow-hidden rounded-full flex-shrink-0">
						<img
							className="w-full h-full object-cover"
							src={selectedJob.businessUserData.BusinessLogo}
							alt="Business Logo"
						/>
					</div>
					<div className="flex flex-col">
						<h2 className="text-lg font-bold text-gray-800 truncate">{selectedJob.jobDetail.JobTitle}</h2>
						<p className="flex items-center text-sm text-gray-500">
							<MapPin className="h-4 w-4 mr-1" />
							<span>{selectedJob.jobDetail.Location}</span>
						</p>
					</div>
				</div>
				<Button variant="outline" size="icon">
					<Share2 className="h-4 w-4" />
				</Button>
			</div>

			{/* Content */}
			<ScrollArea className="flex-1 p-4">
				<div className="w-full">
					<JobDescription job={selectedJob} />
					<ApplyButton jobId={selectedJob.jobDetail.ID} />
				</div>
			</ScrollArea>
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
		<div className="flex items-center space-x-2 sticky bottom-0 align-middle w-full">
			<Button
				className="w-full"
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
		<div className="Space-y-6 shadow-md rounded-md">
			{/* Date Posted */}
			{job.jobDetail.DatePosted && (
				<div className="flex items-center">
					<span className="font-semibold text-gray-700">{t('job_posting.date_posted')}:</span>
					<span className="ml-2 text-gray-600">{formatDate(job.jobDetail.DatePosted)}</span>
				</div>
			)}

			{/* Application Deadline */}
			{job.jobDetail.ApplicationDeadline && (
				<div className="flex items-center">
					<span className="font-semibold text-gray-700">{t('job_posting.application_deadline')}:</span>
					<span className="ml-2 text-gray-600">{formatDate(job.jobDetail.ApplicationDeadline)}</span>
				</div>
			)}

			{/* Job Description */}
			{job.jobDetail.Description && (
				<div>
					<h3 className="text-lg font-bold text-gray-800">{t('job_posting.job_description')}</h3>
					<ReactQuill value={job.jobDetail.Description} readOnly={true} theme={'bubble'} />
				</div>
			)}

			{/* Job Requirements */}
			{job.jobDetail.Requirements && (
				<div>
					<h3 className="text-lg font-bold text-gray-800">{t('job_posting.job_requirements')}</h3>
					<ReactQuill value={job.jobDetail.Requirements} readOnly={true} theme={'bubble'} />
				</div>
			)}

			{/* Company Info */}
			{job.jobDetail.UserID && (
				<div className="flex items-center">
					<span className="font-semibold text-gray-700">{t('general.company')}:</span>
					<span className="ml-2 text-gray-600">{job.jobDetail.UserID}</span>
				</div>
			)}

			{/* Employment Type */}
			{job.jobDetail.EmploymentType && (
				<div className="flex items-center">
					<span className="font-semibold text-gray-700">{t('job_posting.employment_type')}:</span>
					<span className="ml-2 text-gray-600">{job.jobDetail.EmploymentType}</span>
				</div>
			)}

			{/* Salary Range */}
			{job.jobDetail.SalaryRange && (
				<div className="flex items-center">
					<span className="font-semibold text-gray-700">{t('job_posting.salary')}:</span>
					<span className="ml-2 text-gray-600">{job.jobDetail.SalaryRange}</span>
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
			className="p-4 border-b last:border-b-0 cursor-pointer hover:bg-primary-foreground transition duration-150 shadow-md"
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

export default function JobListing({ jobs, jobSelected }: { jobs: TypeJobs; jobSelected: (job: boolean) => void }) {
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
		jobSelected(true);
	};

	const closeJobDetail = () => {
		setShowDetail(false);
		setSelectedJob(null);
		window.history.pushState(null, '', window.location.href);
		jobSelected(false);
	};
	const companies = jobs.map((job) => job.businessUserData.BusinessName);

	return (
		<div className="flex flex-col h-full">
			<TopFilters companies={companies} />
			{!showDetail && (
				<ScrollArea className={'flex h-full w-full shadow-2xl'}>
					{jobs.map((job, index) => (
						<JobListItem
							key={index}
							title={job.jobDetail.JobTitle}
							company={job.businessUserData.BusinessName}
							location={job.jobDetail.Location}
							logo={job.businessUserData.BusinessLogo}
							onClicked={() => openJobDetail(job)}
						/>
					))}
				</ScrollArea>
			)}
			{showDetail && selectedJob && (
				<div className={`${showDetail ? 'block' : 'hidden'} sm:block overflow-auto`}>
					{<JobInfo selectedJob={selectedJob} onClose={() => closeJobDetail()} />}
				</div>
			)}
		</div>
	);
}
