export interface BusinessUserLoginInformation {
	token: string;
	email: string;
	businessName: string;
	businessAddress: string;
	businessDescription: string;
	businessLocation: string;
	businessWebsite: string;
	businessLogo: string;
}
export interface RegisterBusinessUser {
	password: string;
	confirm_password: string;
	email: string;
	businessName: string;
	businessAddress: string;
	businessDescription: string;
	businessLocation: string;
	businessWebsite: string;
	businessLogo: string;
}

export interface TypeUser {
	email: string;
	password: string;
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

export type TypeJobs = TypeJob[];
export type QueryResult = { query_result: string[] };
export type HttpResponse = { status: number; data: any };
export type Language = 'al' | 'tr' | 'en';
export type Theme = 'light' | 'dark';
