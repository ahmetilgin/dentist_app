export interface TypeUser {
  username: string;
  password: string;
  email: string;
}

export interface TypeJob {
  UserID: string;
  JobTitle: string;
  Description: string;
  Requirements: string;
  Location: string;
  SalaryRange: string;
  EmploymentType: string;
  DatePosted: string;
  ApplicationDeadline: string;
}

export interface TypeJobSearch {
  keyword: string;
  location: string;
}


export type TypeJobs = TypeJob[]
export type QueryResult = { query_result: string[] }
