import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TypeJob } from '@/DataTypes';
import { ChevronDown, Share2 } from 'lucide-react';
import * as React from 'react';
import { useEffect } from 'react';

function FilterCombobox({ title, options }: { title: string; options: string[] }) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
					{title}
					<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Card>
					<CardContent className="grid gap-4 p-4">
						{options.map((option) => (
							<div key={option} className="flex items-center space-x-2">
								<Checkbox id={option} />
								<Label htmlFor={option}>{option}</Label>
							</div>
						))}
					</CardContent>
					<CardFooter className="flex justify-between">
						<Button variant="outline" size="sm">
							Sıfırla
						</Button>
						<Button size="sm" onClick={() => setOpen(false)}>
							Uygula
						</Button>
					</CardFooter>
				</Card>
			</PopoverContent>
		</Popover>
	);
}
function TopFilters() {
	return (
		<div className="w-full border-b">
			<div className="w-full">
				<div className="flex w-full py-4 space-x-2 overflow-y-hidden overflow-x-scroll sm:overflow-x-hidden">
					<FilterCombobox
						title="Konum Türü"
						options={[
							'Stajyer',
							'Giriş Düzeyi',
							'Az kıdemli',
							'Orta Düzey',
							'Kıdemli',
							'Potansiyel Müşteri',
							'Yönetici',
							'Üst düzey yönetici',
						]}
					/>
					<FilterCombobox title="Kıdem" options={['0-1 yıl', '1-3 yıl', '3-5 yıl', '5-10 yıl', '10+ yıl']} />
					<FilterCombobox
						title="İstihdam Türü"
						options={['Tam Zamanlı', 'Yarı Zamanlı', 'Sözleşmeli', 'Stajyer', 'Geçici']}
					/>
					<FilterCombobox title="Şirket" options={['Dolby', 'Wayve', 'Sigma Software', 'Diğer']} />
					<Button variant="ghost" size="sm" className="h-10 whitespace-nowrap">
						Sıfırla
					</Button>
				</div>
			</div>
		</div>
	);
}

function JobInfo({ title, location, company }: { title: string; location: string; company: string }) {
	return (
		<div>
			<h2 className="text-2xl font-bold">{title}</h2>
			<p className="text-muted-foreground">{location}</p>
			<p className="mt-2">{company}</p>
		</div>
	);
}

function ApplyButton() {
	return (
		<div className="flex items-center space-x-2">
			<Button>Hemen başvur</Button>
			<Button variant="outline" size="icon">
				<Share2 className="h-4 w-4" />
			</Button>
		</div>
	);
}

function JobDescription() {
	return (
		<div className="space-y-4">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua.
			</p>
			<h3 className="text-lg font-semibold">Summary</h3>
			<p>
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
				consequat.
			</p>
			<h3 className="text-lg font-semibold">Responsibilities</h3>
			<ul className="list-disc list-inside">
				<li>Duis aute irure dolor in reprehenderit</li>
				<li>Excepteur sint occaecat cupidatat non proident</li>
				<li>Sunt in culpa qui officia deserunt mollit anim id est laborum</li>
			</ul>
		</div>
	);
}

function JobListItem({
	title,
	company,
	location,
	onClicked,
}: {
	title: string;
	company: string;
	location: string;
	onClicked: () => void;
}) {
	return (
		<div className="p-4 border-b last:border-b-0 cursor-pointer" onClick={onClicked}>
			<div>
				<div className="w-12 h-12 bg-secondary flex items-center justify-center">
					<span className="text-2xl font-bold">{company[0]}</span>
					{/* sirket logosunun buraya gelmesi lazim */}
				</div>
				<p className="text-sm text-muted-foreground">{company}</p>
			</div>
			<h3 className="font-semibold mt-2">{title}</h3>
			<p className="text-sm text-muted-foreground">{location}</p>
		</div>
	);
}
export default function JobListing({ jobs }: { jobs: TypeJob[] }) {
	const [showDetail, setShowDetail] = React.useState(false);
	const [selectedJob, setSelectedJob] = React.useState<TypeJob | null>(null);

	useEffect(() => {
		const handlePopState = () => {
			setShowDetail(false);
		};

		window.addEventListener('popstate', handlePopState);

		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	}, []);

	const openJobDetail = (job: TypeJob) => {
		setShowDetail(true);
		setSelectedJob(job);
		window.history.pushState(null, '', window.location.href);
	};

	return (
		<div className="flex flex-col h-full pb-10">
			<TopFilters />
			<div className="flex h-full">
				<ScrollArea className={`${showDetail ? 'hidden sm:block' : ''} w-full sm:w-1/3 border-r pb-5`}>
					<div className="pr-4">
						{jobs.map((job, index) => (
							<JobListItem
								key={index}
								title={job.JobTitle}
								company={job.UserID}
								location={job.Location}
								onClicked={() => openJobDetail(job)}
							/>
						))}
					</div>
				</ScrollArea>
				<div className={`${showDetail ? 'block' : 'hidden'} sm:block flex-1 overflow-auto`}>
					{selectedJob && (
						<Card className="rounded-none h-full">
							<CardHeader>
								<div className="flex items-start space-x-4">
									<JobInfo
										title={selectedJob.JobTitle}
										location={selectedJob.Location}
										company={selectedJob.UserID}
									/>
								</div>
							</CardHeader>
							<CardContent>
								<ApplyButton />
							</CardContent>
							<CardFooter>
								<JobDescription />
							</CardFooter>
						</Card>
					)}
				</div>
			</div>
		</div>
	);
}
