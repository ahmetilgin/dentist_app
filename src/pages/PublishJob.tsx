import { JobPostingFormComponent } from '@/components/JobPosting';
import { observer } from 'mobx-react';

const PublishJob = observer(() => {
	return (
		<div className="flex justify-center w-full">
			<JobPostingFormComponent />
		</div>
	);
});

export default PublishJob;
