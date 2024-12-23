import { RootStore } from "../stores/Rootstore";
import AuthService from "./AuthService";
import { CandidateService } from "./CandidateService";
import HttpService from "./HttpService";
import JobService from "./JobService";

class RootService {
    httpService : HttpService
    authService : AuthService
    jobService: JobService
    candidateService : CandidateService
    constructor(rootStore: RootStore){
        this.httpService = new HttpService(rootStore.userStore);
        this.authService = new AuthService(this.httpService, rootStore.userStore);
        this.jobService = new JobService(this.httpService, rootStore.jobStore)
        this.candidateService = new CandidateService(this.httpService)
    }
}

export default RootService;