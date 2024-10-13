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

	searchJobs = (keyword: string, location: string, region: string): Promise<TypeJob[]> => {
		if (keyword === '') {
			keyword = '-';
		}

		if (location === '') {
			location = '-';
		}

		return this.httpService
			.get<{ jobs: TypeJobs }>(
				`/public/jobs/search/${region}/${location.toLocaleLowerCase()}/${keyword.toLocaleLowerCase()}`
			)
			.then((res) => {
				if (res != null) {
					if (res.jobs != null) {
						return res.jobs;
					}
				}
				return [];
			})
			.catch((err: any) => {
				console.log(err);
				return [];
			});
	};

	publishJob = (job: any) => {
		this.httpService
			.post('/public/jobs', job)
			.then(() => {
				this.searchJobs('', '');
			})
			.catch((err: any) => console.log(err));
	};

	getPopularJobs(location: string) {
		return this.httpService.get<QueryResult>(`/public/jobs/get_populer_professions/${location}`);
	}
}

export default JobService;
