import AutoComplete from '@/components/AutoComplete';
import JobListing from '@/components/JobList';
import LoadingDots from '@/components/LoadingDots';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TypeJobs } from '@/DataTypes';
import { useToast } from '@/hooks/use-toast';
import { useRootService, useRootStore } from '@/providers/context_provider/ContextProvider';
import { BriefcaseBusiness, Loader2, MapPin, Search } from 'lucide-react';
import { observer } from 'mobx-react';
import { SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const CandidatePage = observer(() => {
	const [topJobs, setTopJobs] = useState<string[]>([]);
	const [jobResults, setJobResults] = useState<TypeJobs>([]);
	const [jobSelected, setJobSelected] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const { t, i18n } = useTranslation();
	const { jobService } = useRootService();
	const { toast } = useToast();
	const { searchStore } = useRootStore();

	const searchJobs = useCallback(
		async (newSearch = true) => {
			if (isSearching) return;

			setIsSearching(true);
			try {
				const currentPage = newSearch ? 1 : page;
				const response = await jobService.searchJobs(
					searchStore.position,
					searchStore.region,
					i18n.language,
					currentPage
				);

				if (response.jobs) {
					if (newSearch) {
						setJobResults(response.jobs);
						setPage(1);
					} else {
						setJobResults((prev) => [...prev, ...response.jobs]);
					}
					setHasMore(response.jobs.length === 10);
				} else {
					setHasMore(false);
				}
			} catch (error) {
				console.log(error);
				toast({
					title: t('job_posting.application_error'),
					description: t('job_posting.application_error_desc'),
					variant: 'destructive',
				});
			} finally {
				setIsSearching(false);
			}
		},
		[isSearching, page, searchStore.position, searchStore.region, i18n.language, jobService, toast, t]
	);

	useEffect(() => {
		if (page > 1) {
			searchJobs(false);
		}
	}, [page, searchJobs]);

	const loadMore = async () => {
		if (!isSearching && hasMore) {
			setPage((prev) => prev + 1);
		}
		return Promise.resolve();
	};

	const getTopJobs = useCallback(async () => {
		try {
			const response = await jobService.getPopularJobs(i18n.language);
			if (response.query_result) {
				setTopJobs(response.query_result);
			}
		} catch (error) {
			console.error(error);
		}
	}, [jobService, i18n.language]);

	useEffect(() => {
		getTopJobs();
	}, [getTopJobs]);

	const handleTopJobClick = useCallback(
		(job: string) => {
			searchStore.setPosition(job);
			searchStore.setRegion('-');
			searchJobs(true);
		},
		[searchStore, searchJobs]
	);

	const TopJobsSection = useMemo(
		() => (
			<div className="mt-5">
				<h5 className="text font-bold">{t('general.popular_searches')}</h5>
				{topJobs.map((job: string, index: number) => (
					<Badge
						variant="outline"
						className="mr-2 mb-2 cursor-pointer capitalize"
						key={index}
						onClick={() => handleTopJobClick(job)}
					>
						{job}
					</Badge>
				))}
			</div>
		),
		[t, topJobs, handleTopJobClick]
	);

	return (
		<div
			className={`flex flex-col w-full h-full items-center justify-center transition-all m-auto ease-linear pr-4 pl-4 pb-4 ${
				jobResults.length > 0 ? 'pt-0' : 'pt-16'
			}`}
		>
			{isSearching ? (
				<div className="fixed inset-0 flex flex-col items-center justify-center backdrop-blur-sm z-50">
					<Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
					<LoadingDots />
				</div>
			) : null}

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
									if (selectedItem != null && typeof selectedItem === 'string') {
										searchStore.setPosition(selectedItem);
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
									if (selectedItem != null && typeof selectedItem === 'string') {
										searchStore.setRegion(selectedItem);
									}
								}}
							/>
						</div>
						<div className="grid mt-2 sm:mt-0 w-full sm:w-1/4">
							<Button
								className="mt-auto text-md font-medium"
								onClick={() => searchJobs(true)}
								disabled={isSearching}
							>
								{isSearching ? t('general.searching') : t('general.search_job').toUpperCase()}
								<Search className={`ml-2 ${isSearching ? 'animate-spin' : ''}`} />
							</Button>
						</div>
					</div>
				)}
				<div className="flex-1 overflow-auto w-full">
					{jobResults != null && jobResults.length > 0 ? (
						<JobListing
							jobs={jobResults}
							jobSelected={setJobSelected}
							loadMore={loadMore}
							hasMore={hasMore}
						/>
					) : (
						TopJobsSection
					)}
				</div>
			</div>
		</div>
	);
});

export default CandidatePage;
