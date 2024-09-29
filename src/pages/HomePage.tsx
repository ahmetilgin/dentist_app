import AutoComplete from '@/components/AutoComplete';
import JobListing from '@/components/JobList';
import { Button } from '@/components/ui/button';
import { QueryResult, TypeJob } from '@/DataTypes';
import { useRootService } from '@/providers/context_provider/ContextProvider';
import { BriefcaseBusiness, MapPin, Search } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
	const [selectedRegion, setSelectedRegion] = useState<string>('-');
	const [selectedPosition, setSelectedPosition] = useState<string>('-');

	const [jobResults, setJobResults] = useState<TypeJob[]>([]);

	const { httpService } = useRootService();
	const { t, i18n } = useTranslation();
	const { jobService } = useRootService();

	return (
		<div
			className={`flex flex-col items-center transition-all ease-linear h-screen  ${
				jobResults.length > 0 ? 'translate-y-20' : 'translate-y-1/3'
			}`}
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
							{t('search_job').toUpperCase()}
							<Search className="ml-2" />
						</Button>
					</div>
				</div>
				{jobResults != null && jobResults.length > 0 && <JobListing jobs={jobResults} />}
			</div>
		</div>
	);
}
