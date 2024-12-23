import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { JobListResponse, TypeJob, TypeJobWithCandidates } from '@/DataTypes';
import { useToast } from '@/hooks/use-toast';
import { useRootService } from '@/providers/context_provider/ContextProvider';
import { Briefcase, Calendar, Edit2, MapPin, MoreVertical, Trash2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditJobComponent } from './EditJob';

export function CandidateListComponent({ job }: { job: TypeJobWithCandidates }) {
	const { jobService } = useRootService();
	const [candidates, setCandidates] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { toast } = useToast();
	const { t } = useTranslation();

	useEffect(() => {
		if (!job.Candidates || job.Candidates.length === 0) {
			setIsLoading(false);
			return;
		}
		setIsLoading(true);
		// Fetch detailed candidate information for the candidate IDs
		Promise.all(job.Candidates.map((candidateId) => jobService.getCandidateDetails(candidateId)))
			.then((candidateDetails) => {
				setCandidates(candidateDetails.filter((candidate) => candidate !== null));
				setIsLoading(false);
			})
			.catch((err) => {
				setError('Failed to load candidates');
				setIsLoading(false);
				toast({
					title: 'Candidates Load Failed',
					description: 'Unable to load candidates for this job.',
					variant: 'destructive',
				});
				console.error('Candidates load error:', err);
			});
	}, [job.Candidates, jobService, toast]);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-[50vh]">
				<p>{t('manage_jobs.candidates_loading')}</p>
			</div>
		);
	}

	if (!job.Candidates || job.Candidates.length === 0) {
		return (
			<div className="flex justify-center items-center h-[50vh] text-muted-foreground">
				<p>{t('manage_jobs.no_candidates')}</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-[50vh] text-red-500">
				<p>{error}</p>
			</div>
		);
	}

	if (candidates.length === 0) {
		return (
			<div className="flex justify-center items-center h-[50vh] text-muted-foreground">
				<p>{t('manage_jobs.no_candidates')}</p>
			</div>
		);
	}

	return (
		<ScrollArea className="h-[50vh]">
			{candidates.map((candidate) => (
				<Card key={candidate.ID} className="mb-4 last:mb-0">
					<CardContent className="p-4">
						<div className="flex justify-between items-center">
							<div>
								<h3 className="text-lg font-semibold">{candidate.Name}</h3>
								<p className="text-sm text-muted-foreground">{candidate.Email}</p>
								{candidate.Phone && (
									<p className="text-sm text-muted-foreground">
										{t('general.phone')}: {candidate.Phone}
									</p>
								)}
							</div>
							<div className="flex space-x-2">
								<Button variant="outline" size="sm">
									{t('manage_jobs.view_profile')}
								</Button>
								<Button variant="default" size="sm">
									{t('manage_jobs.send_message')}
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</ScrollArea>
	);
}

export function ManageJobsComponent() {
	const { jobService } = useRootService();
	const [jobs, setJobs] = useState<JobListResponse>();
	const { toast } = useToast();
	const { t } = useTranslation();

	useEffect(() => {
		jobService.getJobs().then((res) => {
			if (res) {
				setJobs(res);
			}
		});
	}, [jobService]);

	const handleDelete = (jobId: string) => {
		jobService
			.deleteJob(jobId)
			.then((res) => {
				if (res) {
					// Remove the deleted job from the local state
					setJobs((prevJobs) => ({
						...prevJobs,
						jobs: prevJobs?.jobs.filter((job) => job.ID !== jobId) || [],
					}));

					toast({
						title: t('manage_jobs.job_deleted'),
						description: t('manage_jobs.job_deleted_desc'), // job successfully deleted
						variant: 'default',
					});
				}
			})
			.catch((error) => {
				toast({
					title: t('manage_jobs.job_delete_failed'),
					description: t('manage_jobs.job_delete_failed_desc'),
					variant: 'destructive',
				});
				console.error('Job deletion error:', error);
			});
	};

	const handleUpdateJob = (updatedJob: TypeJob) => {
		jobService
			.updateJob(updatedJob)
			.then((res) => {
				if (res) {
					// Update the job in the local state
					setJobs((prevJobs) => ({
						...prevJobs,
						jobs:
							prevJobs?.jobs.map((job) => (job.ID === updatedJob.ID ? { ...job, ...updatedJob } : job)) ||
							[],
					}));

					toast({
						title: t('manage_jobs.job_updated'),
						description: t('manage_jobs.job_updated_desc'),
						variant: 'default',
					});
				}
			})
			.catch((error) => {
				toast({
					title: t('manage_jobs.job_update_failed'),
					description: t('manage_jobs.job_update_failed_desc'),
					variant: 'destructive',
				});
				console.error('Job update error:', error);
			});
	};

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl md:text-3xl text-center md:text-left">
					{t('manage_jobs.title')}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ScrollArea className="flex h-full w-full shadow-2xl">
					{jobs != null && jobs && jobs.jobs != null ? (
						jobs.jobs.map((job) => (
							<Card key={job.ID} className="mb-4 last:mb-0">
								<CardContent className="p-4 w-full">
									<div className="flex justify-between items-start">
										<div className="w-full">
											<h3 className="text-lg font-semibold mb-2">{job.JobTitle}</h3>
											<div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-muted-foreground">
												<div className="flex items-center mb-1 sm:mb-0">
													<MapPin className="mr-2 h-4 w-4" />
													{job.Location}
												</div>
												<div className="flex items-center mb-1 sm:mb-0">
													<Calendar className="mr-2 h-4 w-4" />
													Posted: {new Date(job.DatePosted).toLocaleDateString()}
												</div>
												<div className="flex items-center">
													<Briefcase className="mr-2 h-4 w-4" />
													Deadline: {new Date(job.ApplicationDeadline).toLocaleDateString()}
												</div>
											</div>
										</div>
										<div className="flex items-center space-x-2 ml-auto">
											<Dialog>
												<DialogTrigger asChild>
													<Button variant="ghost" size="icon" className="h-8 w-8">
														<Users className="h-4 w-4" />
														<span className="sr-only">Show Candidates</span>
													</Button>
												</DialogTrigger>
												<DialogContent className="max-w-3xl">
													<DialogHeader>
														<DialogTitle>Candidates for {job.JobTitle}</DialogTitle>
													</DialogHeader>
													<CandidateListComponent job={job} />
												</DialogContent>
											</Dialog>
											<Dialog>
												<DialogTrigger asChild>
													<Button variant="ghost" size="icon" className="h-8 w-8">
														<Edit2 className="h-4 w-4" />
														<span className="sr-only">Edit Job</span>
													</Button>
												</DialogTrigger>
												<DialogContent className="max-w-3xl">
													<DialogHeader>
														<DialogTitle>Edit Job</DialogTitle>
													</DialogHeader>
													<EditJobComponent
														job={job}
														onSave={(updatedJob) => {
															handleUpdateJob(updatedJob);
														}}
													/>
												</DialogContent>
											</Dialog>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="icon" className="h-8 w-8">
														<MoreVertical className="h-4 w-4" />
														<span className="sr-only">More Options</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem onClick={() => handleDelete(job.ID)}>
														<Trash2 className="mr-2 h-4 w-4" />
														<span>Delete</span>
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									</div>
									<div className="mt-2">
										<Badge variant="secondary">Status: Active</Badge>
									</div>
								</CardContent>
							</Card>
						))
					) : (
						<div>No jobs found.</div>
					)}
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
