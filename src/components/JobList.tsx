import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EnumEmploymentType, EnumUserType, EnumWorkplaceType, JobData, TypeJobs } from '@/DataTypes';
import { useToast } from '@/hooks/use-toast';
import { useRootService, useRootStore } from '@/providers/context_provider/ContextProvider';
import { Separator } from '@radix-ui/react-select';
import { ArrowLeft, Briefcase, Building2, CalendarDays, ChevronDown, CreditCard, MapPin, Share2 } from 'lucide-react';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill-new';
import { useNavigate } from 'react-router-dom';
import LoadingDots from './LoadingDots';

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
						<h2 className="text-lg font-bold truncate">{selectedJob.jobDetail.JobTitle}</h2>
						<p className="flex items-center text-sm">
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
			<ScrollArea className="flex-1 p-0 sm:p-4">
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
		<div className="flex items-center space-x-2  bottom-0 align-middle w-full">
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
							.catch((e: Error) => {
								console.log(e.message);
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

export function JobDescription({ job }: { job: JobData }) {
	const { t } = useTranslation();
	const formatDate = (date: string) =>
		new Date(date).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});

	return (
		<Card className="w-full">
			<CardContent className="p-0: sm:p-2">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{job.jobDetail.DatePosted && (
						<div className="flex items-center space-x-2">
							<CalendarDays className="h-5 w-5" />
							<div>
								<span className="text-sm font-medium">{t('job_posting.date_posted')}:</span>
								<p className="text-sm">{formatDate(job.jobDetail.DatePosted)}</p>
							</div>
						</div>
					)}
					{job.jobDetail.ApplicationDeadline && (
						<div className="flex items-center space-x-2">
							<CalendarDays className="h-5 w-5" />
							<div>
								<span className="text-sm font-medium">{t('job_posting.application_deadline')}:</span>
								<p className="text-sm">{formatDate(job.jobDetail.ApplicationDeadline)}</p>
							</div>
						</div>
					)}
				</div>
				<Separator />
				{job.jobDetail.Description && (
					<div className="h-auto">
						<div className="prose max-w-none">
							<ReactQuill value={job.jobDetail.Description} readOnly={true} theme={'bubble'} />
						</div>
					</div>
				)}
				<Separator />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{job.jobDetail.UserID && (
						<div className="flex items-center space-x-2">
							<Building2 className="h-5 w-5" />
							<div>
								<span className="text-sm font-medium">{t('general.company')}:</span>
								<p className="text-sm">{job.businessUserData.BusinessName}</p>
							</div>
						</div>
					)}
					{job.jobDetail.EmploymentType && (
						<div className="flex items-center space-x-2">
							<Briefcase className="h-5 w-5" />
							<div>
								<span className="text-sm font-medium">{t('job_posting.employment_type')}:</span>
								<p className="text-sm">{job.jobDetail.EmploymentType}</p>
							</div>
						</div>
					)}
					{job.jobDetail.SalaryRange && (
						<div className="flex items-center space-x-2">
							<CreditCard className="h-5 w-5" />
							<div>
								<span className="text-sm font-medium">{t('job_posting.salary')}:</span>
								<p className="text-sm">{job.jobDetail.SalaryRange}</p>
							</div>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
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
			className="p-4 border-b last:border-b-0 cursor-pointer Fv:bg-primary-foreground transition duration-150 shadow-lg"
			onClick={onClicked}
		>
			<div className="flex items-center space-x-4">
				<div className="w-12 h-12 bg-secondary flex items-center justify-center rounded-full">
					<img className="w-8 h-8" src={logo}></img>
				</div>
				<div>
					<p className="text-sm ">{company}</p>
					<h3 className="font-semibold text-lg mt-1">{title}</h3>
					<p className="text-sm">{location}</p>
				</div>
			</div>
		</div>
	);
}

interface JobListingProps {
	jobs: TypeJobs;
	jobSelected: (job: boolean) => void;
	loadMore: () => Promise<void>;
	hasMore: boolean;
}

const JobListing = observer(({ jobs, jobSelected, loadMore, hasMore }: JobListingProps) => {
	const [showDetail, setShowDetail] = useState(false);
	const [selectedJob, setSelectedJob] = useState<JobData | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const observerTarget = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			async (entries) => {
				if (entries[0].isIntersecting && hasMore && !isLoading) {
					setIsLoading(true);
					await loadMore();
					setIsLoading(false);
				}
			},
			{ threshold: 0.1 }
		);

		if (observerTarget.current) {
			observer.observe(observerTarget.current);
		}

		return () => observer.disconnect();
	}, [hasMore, loadMore, isLoading]);

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
					{hasMore && (
						<div ref={observerTarget} className="w-full py-4 flex justify-center">
							{isLoading && <LoadingDots />}
						</div>
					)}
				</ScrollArea>
			)}
			{showDetail && selectedJob && (
				<div className={`${showDetail ? 'block' : 'hidden'} sm:block overflow-auto`}>
					{<JobInfo selectedJob={selectedJob} onClose={() => closeJobDetail()} />}
				</div>
			)}
		</div>
	);
});

export default JobListing;
