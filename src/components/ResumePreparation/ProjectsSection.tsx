import { useTranslation } from 'next-i18next'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'

export function ProjectsSection() {
  const { t } = useTranslation('common')
  const { control } = useFormContext()
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "projects",
  })

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('cv.projects')}</h2>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border rounded">
          <FormField
            control={control}
            name={`projects.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('cv.projectName')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`projects.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('cv.projectDescription')}</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-2">
            <Button type="button" variant="outline" size="icon" onClick={() => {
              // Edit functionality
              const updatedProject = { ...field };
              update(index, updatedProject);
            }}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" size="icon" onClick={() => remove(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button type="button" onClick={() => append({ name: '', description: '' })}>
        <PlusCircle className="h-4 w-4 mr-2" />
        {t('cv.add')} {t('cv.project')}
      </Button>
    </div>
  )
}

