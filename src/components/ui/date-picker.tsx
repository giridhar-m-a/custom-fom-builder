'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export default function DatePicker({
  name,
  date,
  setDate,
  placeholder,
}: {
  name: string;
  date: Date | undefined;
  setDate?: (name: string, date: string | undefined) => void;
  placeholder: string;
}) {
  //   const [date, setDate] = React.useState<Date>();

  //   const af = (e: unknown) => {
  //     console.log('e : ', e);
  //   };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          onSelect={(e) => setDate(name, e?.toISOString())}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
