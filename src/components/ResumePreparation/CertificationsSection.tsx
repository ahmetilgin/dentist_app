import { useTranslation } from 'next-i18next'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'

export function CertificationsSection() {
  const { t } = useTranslation('common')
  const { control } = useFormContext()
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "certifications",
  })

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('cv.certifications')}</h2>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border rounded">
          <FormField
            control={control}
            name={`certifications.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('cv.certificationName')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`certifications.${index}.issuingOrganization`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('cv.issuingOrganization')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`certifications.${index}.issueDate`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('cv.issueDate')}</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-2">
            <Button type="button" variant="outline" size="icon" onClick={() => {
              // Edit functionality
              const updatedCertification = { ...field };
              update(index, updatedCertification);
            }}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" size="icon" onClick={() => remove(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button type="button" onClick={() => append({ name: '', issuingOrganization: '', issueDate: '' })}>
        <PlusCircle className="h-4 w-4 mr-2" />
        {t('cv.add')} {t('cv.certification')}
      </Button>
    </div>
  )
}

