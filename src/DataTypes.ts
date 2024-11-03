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
	confirmPassword: string;
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
	confirmPassword: string;
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
export type Language = 'al' | 'tr' | 'en';
export type Theme = 'light' | 'dark';

export enum EnumWorkplaceType {
	Remote = 'workplace_type.Remote',
	Office = 'workplace_type.Office',
	Hybrid = 'workplace_type.Hybrid',
}

export enum EnumEmploymentType {
	FullTime = 'employment_type.FullTime',
	PartTime = 'employment_type.PartTime',
	Contract = 'employment_type.Contract',
	Internship = 'employment_type.Internship',
	Temporary = 'employment_type.Temporary',
}

export enum EnumUserType {
	EMPLOYER,
	CANDIDATE,
}
