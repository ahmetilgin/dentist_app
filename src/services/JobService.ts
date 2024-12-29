import { JobListResponse, QueryResult, SearchJobsRequest, TypeJob, TypeJobs } from '../DataTypes';
import { JobStore } from '../stores/JobStore';
import HttpService from './HttpService';

class JobService {
	httpService: HttpService;
	jobStore: JobStore;
	constructor(httpService: HttpService, jobStore: JobStore) {
		this.httpService = httpService;
		this.jobStore = jobStore;
	}

	applyJob = (jobId: string) => {
		return this.httpService.post('/api/jobs/apply_job', { job_id: jobId });
	};

	async searchJobs(
		position: string,
		region: string,
		language: string,
		page: number = 1
	): Promise<{ jobs: TypeJobs }> {
		const request: SearchJobsRequest = {
			position,
			region,
			language,
			page,
			limit: 10,
		};
		return this.httpService.post('/api/jobs/search', request);
	}

	searchProfessions = (keyword: string, region: string): Promise<QueryResult> => {
		return this.httpService.get<QueryResult>(`/api/jobs/search_professions/${region}/${keyword}?`);
	};

	searchLocations = (keyword: string, region: string): Promise<QueryResult> => {
		return this.httpService.get<QueryResult>(`/api/country/${region}/${keyword}`);
	};

	publishJob = (job: TypeJob) => {
		return this.httpService.post('/api/jobs', job);
	};

	getPopularJobs(location: string) {
		return this.httpService.get<QueryResult>(`/api/jobs/get_populer_professions/${location}`);
	}

	getJobs() {
		return this.httpService.get<JobListResponse>('/api/jobs/get_jobs');
	}

	deleteJob(jobId: string) {
		return this.httpService.del<boolean>(`/api/jobs/delete/${jobId}`, {});
	}

	updateJob(jobData: TypeJob) {
		return this.httpService.put<boolean>('/api/jobs/update', jobData);
	}

	getCandidateDetails(candidateId: string) {
		return this.httpService.get<any>(`/api/jobs/candidate/${candidateId}`);
	}
}

export default JobService;
