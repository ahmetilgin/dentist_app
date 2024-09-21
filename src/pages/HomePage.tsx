import AutoComplete from '@/components/AutoComplete';
import JobListing from '@/components/JobList';
import { Button } from '@/components/ui/button';
import { QueryResult, TypeJob } from '@/DataTypes';
import { useRootService } from '@/providers/context_provider/ContextProvider';
import { BriefcaseBusiness, MapPin, Search } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const dummyJobs: TypeJob[] = [
	{
		UserID: '1',
		JobTitle: 'Software Engineer',
		Description: 'Develop and maintain web applications.',
		Requirements: '3+ years of experience in software development.',
		Location: 'Istanbul, Turkey',
		SalaryRange: '5000-7000 USD',
		EmploymentType: 'Full-time',
		DatePosted: '2023-01-01',
		ApplicationDeadline: '2023-02-01',
	},
	{
		UserID: '2',
		JobTitle: 'Data Scientist',
		Description: 'Analyze and interpret complex data sets.',
		Requirements: '2+ years of experience in data science.',
		Location: 'Ankara, Turkey',
		SalaryRange: '6000-8000 USD',
		EmploymentType: 'Full-time',
		DatePosted: '2023-01-15',
		ApplicationDeadline: '2023-03-01',
	},
	{
		UserID: '3',
		JobTitle: 'Product Manager',
		Description: 'Lead product development teams.',
		Requirements: '5+ years of experience in product management.',
		Location: 'Izmir, Turkey',
		SalaryRange: '7000-9000 USD',
		EmploymentType: 'Full-time',
		DatePosted: '2023-02-01',
		ApplicationDeadline: '2023-03-15',
	},
	{
		UserID: '4',
		JobTitle: 'UX Designer',
		Description: 'Design user interfaces and experiences.',
		Requirements: '3+ years of experience in UX design.',
		Location: 'Antalya, Turkey',
		SalaryRange: '4000-6000 USD',
		EmploymentType: 'Full-time',
		DatePosted: '2023-02-10',
		ApplicationDeadline: '2023-03-20',
	},
	{
		UserID: '5',
		JobTitle: 'DevOps Engineer',
		Description: 'Manage and automate infrastructure.',
		Requirements: '4+ years of experience in DevOps.',
		Location: 'Bursa, Turkey',
		SalaryRange: '5500-7500 USD',
		EmploymentType: 'Full-time',
		DatePosted: '2023-02-20',
		ApplicationDeadline: '2023-04-01',
	},
	{
		UserID: '6',
		JobTitle: 'Marketing Specialist',
		Description: 'Develop and execute marketing strategies.',
		Requirements: '2+ years of experience in marketing.',
		Location: 'Adana, Turkey',
		SalaryRange: '3500-5000 USD',
		EmploymentType: 'Full-time',
		DatePosted: '2023-03-01',
		ApplicationDeadline: '2023-04-15',
	},
	{
		UserID: '7',
		JobTitle: 'HR Manager',
		Description: 'Manage HR operations and recruitment.',
		Requirements: '5+ years of experience in HR.',
		Location: 'Gaziantep, Turkey',
		SalaryRange: '6000-8000 USD',
		EmploymentType: 'Full-time',
		DatePosted: '2023-03-10',
		ApplicationDeadline: '2023-04-30',
	},
	{
		UserID: '8',
		JobTitle: 'Sales Manager',
		Description: 'Lead sales teams and strategies.',
		Requirements: '4+ years of experience in sales.',
		Location: 'Konya, Turkey',
		SalaryRange: '5000-7000 USD',
		EmploymentType: 'Full-time',
		DatePosted: '2023-03-20',
		ApplicationDeadline: '2023-05-01',
	},
	{
		UserID: '9',
		JobTitle: 'Customer Support Specialist',
		Description: 'Provide customer support and service.',
		Requirements: '2+ years of experience in customer support.',
		Location: 'Kayseri, Turkey',
		SalaryRange: '3000-4500 USD',
		EmploymentType: 'Full-time',
		DatePosted: '2023-03-25',
		ApplicationDeadline: '2023-05-10',
	},
	{
		UserID: '10',
		JobTitle: 'Financial Analyst',
		Description: 'Analyze financial data and trends.',
		Requirements: '3+ years of experience in financial analysis.',
		Location: 'Eskisehir, Turkey',
		SalaryRange: '5500-7500 USD',
		EmploymentType: 'Full-time',
		DatePosted: '2023-04-01',
		ApplicationDeadline: '2023-05-20',
	},
];

export default function HomePage() {
	const [selectedRegion, setSelectedRegion] = useState<string>('-');
	const [selectedPosition, setSelectedPosition] = useState<string>('-');

	const [jobResults, setJobResults] = useState<TypeJob[]>([]);

	const { httpService } = useRootService();
	const { t, i18n } = useTranslation();
	const { jobService } = useRootService();

	return (
		<div
			className={`flex flex-col items-center m-auto content-center justify-normal sm:${
				jobResults.length > 0 ? 'justify-normal' : 'justify-center'
			} 
				h-screen mt-0`}
		>
			<div className="hidden sm:block w-full lg:w-2/3 mb-4 p-5 ">
				<h1 className="text-2xl font-bold">{t('discover_career_opportunities')}</h1>
				<h4 className="text-xl font-normal">{t('job_postings_thousands_of_companies')}</h4>
			</div>
			<div className="flex flex-col h-full w-full sm:w-full lg:w-2/3 p-5">
				<div className="flex flex-col sm:flex-row sm:space-x-5 w-full">
					<div className="w-full">
						<AutoComplete
							label="search_position_or_company"
							fetchOptions={(input) =>
								httpService.get<QueryResult>(`/public/jobs/search_professions/${input}?`)
							}
							icon={
								<BriefcaseBusiness className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
							}
							onValueChanged={(selectedItem) => {
								if (selectedItem != null) {
									setSelectedPosition(selectedItem);
								}
							}}
						/>
					</div>
					<div className="w-full">
						<AutoComplete
							label="search_city_or_district"
							fetchOptions={(input) =>
								httpService.get<QueryResult>(`/public/country/${i18n.language}/${input}?`)
							}
							icon={
								<MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
							}
							onValueChanged={(selectedItem) => {
								if (selectedItem != null) {
									setSelectedRegion(selectedItem);
								}
							}}
						/>
					</div>
					<div className="grid mt-5 sm:mt-0 w-full sm:w-1/4">
						<Button
							className="mt-auto text-md font-medium "
							onClick={() => {
								jobService.searchJobs(selectedPosition, selectedRegion).then((result) => {
									if (result != null) setJobResults(result);
								});
							}}
						>
							{t('search_job')}
							<Search className="font-normal" />
						</Button>
					</div>
				</div>
				{jobResults != null && jobResults.length > 0 && <JobListing jobs={jobResults} />}
			</div>
		</div>
	);
}
