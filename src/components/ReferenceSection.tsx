import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export function ReferencesSection() {
	const { t } = useTranslation();
	const { control } = useFormContext();
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'references',
	});

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">{t('cv.references')}</h2>
			{fields.map((field, index) => (
				<div key={field.id} className="space-y-4 p-4 border rounded">
					<FormField
						control={control}
						name={`references.${index}.name`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('cv.referenceName')}</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name={`references.${index}.contactInfo`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('cv.contactInfo')}</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name={`references.${index}.relationship`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('cv.relationship')}</FormLabel>
								<FormControl>
									<Input {...field} />
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
			<Button type="button" onClick={() => append({ name: '', contactInfo: '', relationship: '' })}>
				{t('cv.addReference')}
			</Button>
		</div>
	);
}
