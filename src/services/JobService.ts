import { QueryResult, TypeJobs, TypeJobSearch } from '../DataTypes';
import { JobStore } from '../stores/JobStore';
import HttpService from './HttpService';

class JobService {
    httpService: HttpService;
    jobStore: JobStore;
    constructor(httpService: HttpService, jobStore: JobStore) {
        this.httpService = httpService;
        this.jobStore = jobStore;
    }

    searchJobs = (keyword: string, location: string) => {
        return this.httpService
            .post<{ jobs: TypeJobs }>('/public/jobs/search', {
                keyword,
                location,
            } as TypeJobSearch)
            .then((res) => {
                if (res != null) {
                    if (res.jobs != null) {
                        this.jobStore.jobs = res.jobs;
                        return true;
                    }
                }
                return false;
            })
            .catch((err: any) => {
                console.log(err);
                return false;
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

    getPopularJobs() {
        this.httpService.get<QueryResult>('/public/jobs/get_populer_professions').then((res) => {
            if (res != null) {
                if (res.query_result != null) {
                    this.jobStore.popularJobs = res.query_result;
                }
            }
        });
    }
}

export default JobService;
