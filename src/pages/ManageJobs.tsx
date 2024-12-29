import ManageJobsComponent from '@/components/ManageJobs';
import { observer } from 'mobx-react';

const ManageJobs = observer(() => {
	return (
		<div className="flex justify-center w-full">
			<ManageJobsComponent />
		</div>
	);
});

export default ManageJobs;
