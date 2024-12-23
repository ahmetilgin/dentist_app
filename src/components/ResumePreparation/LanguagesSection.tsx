import { useTranslation } from 'next-i18next'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'

export function LanguagesSection() {
  const { t } = useTranslation('common')
  const { control } = useFormContext()
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "languages",
  })

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('cv.languages')}</h2>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border rounded">
          <FormField
            control={control}
            name={`languages.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('cv.languageName')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`languages.${index}.proficiency`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('cv.proficiency')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('cv.selectProficiency')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Beginner">{t('cv.beginner')}</SelectItem>
                    <SelectItem value="Intermediate">{t('cv.intermediate')}</SelectItem>
                    <SelectItem value="Advanced">{t('cv.advanced')}</SelectItem>
                    <SelectItem value="Fluent">{t('cv.fluent')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-2">
            <Button type="button" variant="outline" size="icon" onClick={() => {
              // Edit functionality
              const updatedLanguage = { ...field };
              update(index, updatedLanguage);
            }}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" size="icon" onClick={() => remove(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button type="button" onClick={() => append({ name: '', proficiency: '' })}>
        <PlusCircle className="h-4 w-4 mr-2" />
        {t('cv.add')} {t('cv.language')}
      </Button>
    </div>
  )
}

