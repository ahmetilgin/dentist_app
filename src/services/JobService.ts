import { QueryResult, TypeJob, TypeJobs } from '../DataTypes';
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
		return this.httpService.post('/public/jobs/apply_job', { job_id: jobId });
	};

	searchJobs = (keyword: string, location: string, region: string): Promise<{ jobs: TypeJobs }> => {
		if (keyword === '') {
			keyword = '-';
		}

		if (location === '') {
			location = '-';
		}

		return this.httpService.get<{ jobs: TypeJobs }>(
			`/public/jobs/search/${region}/${location.toLocaleLowerCase()}/${keyword.toLocaleLowerCase()}`
		);
	};

	searchProfessions = (keyword: string, region: string): Promise<QueryResult> => {
		return this.httpService.get<QueryResult>(`/public/jobs/search_professions/${region}/${keyword}?`);
	};

	searchLocations = (keyword: string, region: string): Promise<QueryResult> => {
		return this.httpService.get<QueryResult>(`/public/country/${region}/${keyword}`);
	};

	publishJob = (job: TypeJob) => {
		return this.httpService.post('/public/jobs', job);
	};

	getPopularJobs(location: string) {
		return this.httpService.get<QueryResult>(`/public/jobs/get_populer_professions/${location}`);
	}
}

export default JobService;
