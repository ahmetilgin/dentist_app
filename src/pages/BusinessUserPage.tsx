import AutoComplete from '@/components/AutoComplete';
import { Button } from '@/components/ui/button';
import { QueryResult } from '@/DataTypes';
import { useRootService } from '@/providers/context_provider/ContextProvider';
import { BriefcaseBusiness, MapPin, Search } from 'lucide-react';
import { observer } from 'mobx-react';
import { SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

const BusinessUserPage = observer(() => {
	const [selectedRegion, setSelectedRegion] = useState<string>('-');
	const [selectedPosition, setSelectedPosition] = useState<string>('-');
	const [candidates, setCandidates] = useState<string[]>([]);
	const { t, i18n } = useTranslation();
	const { jobService, candidateService } = useRootService();

	const searchCandidate = () => {
		candidateService
			.searchCandidate(selectedPosition, selectedRegion, i18n.language)
			.then((response: QueryResult) => {
				console.log(response);
				if (response.query_result) {
					setCandidates(response.query_result);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div
			className={`flex flex-col w-full h-full items-center justify-center transition-all m-auto ease-linear p-[0em 2em 2em 2em] ${
				candidates.length > 0 ? 'pt-[0em]' : 'pt-[5em]'
			}`}
		>
			<div className="w-full lg:w-2/3 mb-4" style={{ display: candidates.length > 0 ? 'none' : 'block' }}>
				<h1 className="text-2xl font-bold">{t('general.discover_candidates')}</h1>
				<h4 className="text-xl font-normal">{t('general.thousands_of_candidates')}</h4>
			</div>
			<div className="flex flex-col flex-1 overflow-auto w-full sm:w-full lg:w-2/3 ">
				<div className="flex flex-col sm:flex-row sm:space-x-5 w-full">
					<div className="w-full">
						<AutoComplete
							label="general.search_skills"
							placeholder="placeholder.candidate_skill"
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
							placeholder="placeholder.candidate_location"
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
						<Button className="mt-auto text-md font-medium " onClick={searchCandidate}>
							{t('general.search_candidate').toUpperCase()}
							<Search className="ml-2" />
						</Button>
					</div>
				</div>
				<div className="flex-1 overflow-auto">
					{candidates != null && candidates.length > 0 && (
						<div className="mt-5">
							{candidates.map((candidate: string, index: number) => (
								<div key={index} className="mb-2">
									<h5 className="text font-bold">{candidate}</h5>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
});

export default BusinessUserPage;
