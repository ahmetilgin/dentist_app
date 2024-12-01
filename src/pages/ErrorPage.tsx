import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	return (
		<div className="flex h-full flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-900 sm:px-6 md:px-8">
			<div className="text-center max-w-lg w-full">
				<XCircle className="mx-auto mb-4 h-24 w-24 text-red-500" />
				<h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100 sm:text-5xl">
					{t('error.404')}
				</h1>
				<p className="mb-8 text-lg text-gray-600 dark:text-gray-400 sm:text-xl">{t('error.page_not_found')}</p>
				<div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
					<Button variant="outline" className="w-full sm:w-auto" onClick={() => navigate('/')}>
						{t('general.back_to_home')}
					</Button>
					<Button variant="outline" className="w-full sm:w-auto" onClick={() => navigate(-1)}>
						{t('general.go_back')}
					</Button>
				</div>
			</div>
		</div>
	);
}
