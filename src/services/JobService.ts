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

    searchJobs = (keyword: string, location: string): Promise<TypeJob[]> => {
        return this.httpService
            .get<{ jobs: TypeJobs }>(`/public/jobs/search/${location.toLocaleLowerCase()}/${keyword.toLocaleLowerCase()}`)
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

    getPopularJobs() {
        this.httpService
            .get<QueryResult>('/public/jobs/get_populer_professions')
            .then((res) => {
                if (res != null) {
                    if (res.query_result != null) {
                        this.jobStore.popularJobs = res.query_result;
                    }
                }
            })
            .catch((err: any) => {
                console.log(err);
            });
    }
}

export default JobService;
