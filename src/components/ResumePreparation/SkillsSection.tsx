import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'next-i18next';
import { useFieldArray, useFormContext } from 'react-hook-form';

export function SkillsSection() {
	const { t } = useTranslation('common');
	const { control } = useFormContext();
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'skills',
	});

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">{t('cv.skills')}</h2>
			{fields.map((field, index) => (
				<div key={field.id} className="flex items-center space-x-2">
					<FormField
						control={control}
						name={`skills.${index}`}
						render={({ field }) => (
							<FormItem className="flex-grow">
								<FormControl>
									<Input {...field} placeholder={t('cv.skill')} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="button" onClick={() => remove(index)}>
						{t('cv.remove')}
					</Button>
				</div>
			))}
			<Button type="button" onClick={() => append('')}>
				{t('cv.add')} {t('cv.skill')}
			</Button>
		</div>
	);
}
