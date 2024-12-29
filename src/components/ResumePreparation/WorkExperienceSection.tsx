import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'next-i18next';
import { useFieldArray, useFormContext } from 'react-hook-form';

const WorkExperienceSection = observer(() => {
	const { t } = useTranslation('common');
	const { control } = useFormContext();
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'workExperience',
	});

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">{t('cv.workExperience')}</h2>
			{fields.map((field, index) => (
				<div key={field.id} className="space-y-4 p-4 border rounded">
					<FormField
						control={control}
						name={`workExperience.${index}.companyName`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('cv.companyName')} *</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormDescription>{t('cv.required')}</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name={`workExperience.${index}.position`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('cv.position')} *</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormDescription>{t('cv.required')}</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name={`workExperience.${index}.startDate`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('cv.startDate')} *</FormLabel>
								<FormControl>
									<Input {...field} type="date" />
								</FormControl>
								<FormDescription>{t('cv.required')}</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name={`workExperience.${index}.endDate`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('cv.endDate')}</FormLabel>
								<FormControl>
									<Input {...field} type="date" />
								</FormControl>
								<FormDescription>{t('cv.optional')}</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="button" onClick={() => remove(index)}>
						{t('cv.remove')}
					</Button>
				</div>
			))}
			<Button
				type="button"
				onClick={() =>
					append({ companyName: '', position: '', startDate: new Date().toISOString().split('T')[0] })
				}
			>
				{t('cv.add')} {t('cv.workExperience')}
			</Button>
		</div>
	);
});

export default WorkExperienceSection;
