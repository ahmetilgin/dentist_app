import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export function PersonalInfoSection() {
  const { t } = useTranslation('common')
  const { control } = useFormContext()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('cv.personalInfo')}</h2>
      <FormField
        control={control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('cv.fullName')} *</FormLabel>
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
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('cv.email')} *</FormLabel>
            <FormControl>
              <Input {...field} type="email" />
            </FormControl>
            <FormDescription>{t('cv.required')}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('cv.phoneNumber')} *</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>{t('cv.required')}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

