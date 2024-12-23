import AutoComplete from '@/components/AutoComplete';
import JobListing from '@/components/JobList';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QueryResult, TypeJobs } from '@/DataTypes';
import { useRootService } from '@/providers/context_provider/ContextProvider';
import { BriefcaseBusiness, MapPin, Search } from 'lucide-react';
import { SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function CandidatePage() {
	const [selectedRegion, setSelectedRegion] = useState<string>('-');
	const [selectedPosition, setSelectedPosition] = useState<string>('-');
	const [topJobs, setTopJobs] = useState<string[]>([]);
	const [jobResults, setJobResults] = useState<TypeJobs>([]);
	const [jobSelected, setJobSelected] = useState(false);
	const { t, i18n } = useTranslation();
	const { jobService } = useRootService();

	const searchJobs = () => {
		jobService
			.searchJobs(selectedPosition, selectedRegion, i18n.language)
			.then((response: { jobs: TypeJobs }) => {
				if (response.jobs) {
					setJobResults(response.jobs);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		jobService.getPopularJobs(i18n.language).then((res: QueryResult) => {
			if (res && res.query_result) {
				setTopJobs(res.query_result);
			}
		});
	}, [jobService, i18n.language]);

	return (
		<div
			className={`flex flex-col w-full h-full items-center justify-center transition-all m-auto ease-linear pr-4 pl-4 pb-4 ${
				jobResults.length > 0 ? 'pt-0' : 'pt-16'
			}`}
		>
			<div className="w-full lg:w-2/3 mb-4" style={{ display: jobResults.length > 0 ? 'none' : 'block' }}>
				<h1 className="text-2xl font-bold">{t('general.discover_career_opportunities')}</h1>
				<h4 className="text-xl font-normal">{t('general.job_postings_thousands_of_companies')}</h4>
			</div>
			<div className="flex flex-col flex-1 overflow-auto w-full sm:w-full lg:w-2/3 ">
				{!jobSelected && (
					<div className="flex flex-col sm:flex-row sm:space-x-5 w-full">
						<div className="w-full">
							<AutoComplete
								label="general.search_position_or_company"
								placeholder="placeholder.position"
								fetchOptions={(input: string) => jobService.searchProfessions(input, i18n.language)}
								icon={
									<BriefcaseBusiness className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
								}
								onValueChanged={(selectedItem: SetStateAction<string> | null) => {
									if (selectedItem != null) {
										setSelectedPosition(selectedItem);
									}
								}}
							/>
						</div>
						<div className="w-full">
							<AutoComplete
								placeholder="placeholder.location"
								label="general.search_city_or_district"
								fetchOptions={(input: string) => jobService.searchLocations(input, i18n.language)}
								icon={
									<MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
								}
								onValueChanged={(selectedItem: SetStateAction<string> | null) => {
									if (selectedItem != null) {
										setSelectedRegion(selectedItem);
									}
								}}
							/>
						</div>
						<div className="grid mt-2 sm:mt-0 w-full sm:w-1/4">
							<Button className="mt-auto text-md font-medium " onClick={searchJobs}>
								{t('general.search_job').toUpperCase()}
								<Search className="ml-2" />
							</Button>
						</div>
					</div>
				)}
				{jobResults != null && jobResults.length == 0 && (
					<div className="mt-5">
						<h5 className="text font-bold">{t('general.popular_searches')}</h5>
						{topJobs.map((job: string, index: number) => (
							<Badge
								variant="outline"
								className="mr-2 mb-2 cursor-pointer capitalize"
								key={index}
								onClick={searchJobs}
							>
								{job}
							</Badge>
						))}
					</div>
				)}
				<div className="flex-1 overflow-auto">
					{jobResults != null && jobResults.length > 0 && (
						<JobListing
							jobs={jobResults}
							jobSelected={(selected) => {
								setJobSelected(selected);
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
