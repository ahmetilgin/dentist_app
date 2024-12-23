import { JobListResponse, QueryResult, TypeJob, TypeJobs } from '../DataTypes';
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

	searchJobs = (keyword: string, location: string, region: string): Promise<{ jobs: TypeJobs }> => {
		if (keyword === '') {
			keyword = '-';
		}

		if (location === '') {
			location = '-';
		}

		return this.httpService.get<{ jobs: TypeJobs }>(
			`/api/jobs/search/${region}/${location.toLocaleLowerCase()}/${keyword.toLocaleLowerCase()}`
		);
	};

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
