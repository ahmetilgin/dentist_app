import { useTranslation } from 'next-i18next'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function EducationSection() {
  const { t } = useTranslation('common')
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  })

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('cv.education')}</h2>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border rounded">
          <FormField
            control={control}
            name={`education.${index}.degree`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('cv.degree')} *</FormLabel>
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
            name={`education.${index}.institution`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('cv.institution')} *</FormLabel>
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
            name={`education.${index}.startDate`}
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
            name={`education.${index}.endDate`}
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
          <Button type="button" onClick={() => remove(index)}>{t('cv.remove')}</Button>
        </div>
      ))}
      <Button type="button" onClick={() => append({ degree: '', institution: '', startDate: new Date().toISOString().split('T')[0] })}>
        {t('cv.add')} {t('cv.education')}
      </Button>
    </div>
  )
}

