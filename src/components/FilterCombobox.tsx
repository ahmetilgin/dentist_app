import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

interface FilterComboboxProps {
  title: string
  options: string[]
}

export function FilterCombobox({ title, options }: FilterComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const { t } = useTranslation()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {title}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Card>
          <CardContent className="grid gap-4 p-4">
            {options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              {t('job_posting.reset')}
            </Button>
            <Button size="sm" onClick={() => setOpen(false)}>
              {t('general.apply')}
            </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  )
}

