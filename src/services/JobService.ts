import { TypeJobs, TypeJobSearch } from "../DataTypes";
import { JobStore } from "../stores/JobStore";
import HttpService from "./HttpService";

class JobService {
  httpService: HttpService;
  jobStore: JobStore;
  constructor(httpService: HttpService, jobStore: JobStore) {
    this.httpService = httpService;
    this.jobStore = jobStore;
  }

  searchJobs = ( keyword: string,location: string ) => {
    this.httpService
      .post<{jobs:TypeJobs}>("/public/jobs/search", {keyword, location} as TypeJobSearch)
      .then((res) => {
        if (res != null){
          if (res.jobs != null)
          {
            this.jobStore.jobs = res.jobs;
          }    
        }
      })
      .catch((err: any) => console.log(err));
  };


  publishJob = (job: any) => {
    this.httpService
      .post("/public/jobs", job)
      .then(() => {
        this.searchJobs("", "");
      })
      .catch((err: any) => console.log(err));
  }

}

export default JobService;
