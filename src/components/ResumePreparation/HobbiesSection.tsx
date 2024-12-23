import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { useFieldArray, useFormContext } from 'react-hook-form';

export function HobbiesSection() {
	const { t } = useTranslation('common');
	const { control } = useFormContext();
	const { fields, append, remove, update } = useFieldArray({
		control,
		name: 'hobbies',
	});

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">{t('cv.hobbies')}</h2>
			{fields.map((field, index) => (
				<div key={field.id} className="flex items-center space-x-2">
					<FormField
						control={control}
						name={`hobbies.${index}`}
						render={({ field }) => (
							<FormItem className="flex-grow">
								<FormControl>
									<Input {...field} placeholder={t('cv.hobby')} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={() => {
							// Edit functionality
							// const updatedHobby = getValues(`hobbies.${index}`);
							update(index, '');
						}}
					>
						<Pencil className="h-4 w-4" />
					</Button>
					<Button type="button" variant="outline" size="icon" onClick={() => remove(index)}>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			))}
			<Button type="button" onClick={() => append('')}>
				<PlusCircle className="h-4 w-4 mr-2" />
				{t('cv.add')} {t('cv.hobby')}
			</Button>
		</div>
	);
}
