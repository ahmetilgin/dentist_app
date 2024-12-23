import { QueryResult } from "@/DataTypes";
import HttpService from "./HttpService";


export class CandidateService {
	httpService: HttpService;
	constructor(httpService: HttpService) {
		this.httpService = httpService;
	}

    searchCandidate( skill: string, location: string, region: string): Promise<QueryResult> {
        return this.httpService.get<QueryResult>(`/api/candidate/search_candidate/${region}/${location.toLocaleLowerCase()}/${skill.toLocaleLowerCase()}`);
    }
}
