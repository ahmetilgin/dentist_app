import { TypeJobs } from "../DataTypes";
import { JobStore } from "../stores/JobStore";
import HttpService from "./HttpService";

class JobService {
  httpService: HttpService;
  jobStore: JobStore;
  constructor(httpService: HttpService, jobStore: JobStore) {
    this.httpService = httpService;
    this.jobStore = jobStore;
  }

  getJobs = () => {
    this.httpService
      .get<{jobs:TypeJobs}>("/public/jobs")
      .then((res) => {
        if (res != null){
          this.jobStore.jobs = res.jobs;
        }
      })
      .catch((err: any) => console.log(err));
  };

}

export default JobService;
