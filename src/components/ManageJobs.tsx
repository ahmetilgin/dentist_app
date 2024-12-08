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
import { JobListResponse } from '@/DataTypes';
import { useRootService } from '@/providers/context_provider/ContextProvider';
import { Briefcase, Calendar, Edit2, MapPin, MoreVertical, Trash2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EditJobComponent } from './EditJob';

export function CandidateListComponent({ userId }: { userId: string }) {
	// This is a placeholder for the actual candidate data
	const candidates = [
		{ id: '1', name: 'John Doe', email: 'john@example.com' },
		{ id: '2', name: 'Jane Smith', email: 'jane@example.com' },
		{ id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
	];

	return (
		<ScrollArea className="h-[50vh]">
			{candidates.map((candidate) => (
				<Card key={candidate.id} className="mb-4 last:mb-0">
					<CardContent className="p-4">
						<h3 className="text-lg font-semibold">{candidate.name}</h3>
						<p className="text-sm text-muted-foreground">{candidate.email}</p>
						{userId}
						{/* Additional candidate information can be added here */}
						{/* For example:
              <p>Application Date: {candidate.applicationDate}</p>
              <p>Resume: <a href={candidate.resumeUrl}>Download</a></p>
              <p>Status: {candidate.status}</p>
              <p>Interview Date: {candidate.interviewDate}</p>
              <p>Notes: {candidate.notes}</p>
              */}
					</CardContent>
				</Card>
			))}
		</ScrollArea>
	);
}

export function ManageJobsComponent() {
	const { jobService } = useRootService();
	const [jobs, setJobs] = useState<JobListResponse>();

	useEffect(() => {
		jobService.getJobs().then((res) => {
			if (res) {
				setJobs(res);
			}
		});
	}, [jobService]);

	const handleDelete = (jobId: string) => {
		// Implement delete functionality
		console.log(`Deleting job with ID: ${jobId}`);
	};

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl md:text-3xl text-center md:text-left">Manage Jobs</CardTitle>
			</CardHeader>
			<CardContent>
				<ScrollArea className="flex h-full w-full shadow-2xl">
					{jobs?.jobs.map((job) => (
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
												<CandidateListComponent userId={job.ID} />
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
														// Implement save functionality
														console.log('Updated job:', updatedJob);
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
					))}
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
