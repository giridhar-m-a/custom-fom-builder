import { cn } from '@/lib/utils';
import * as React from 'react';
import { Separator } from './separator';
import { InputProps } from './input';
import { Label } from './label';

// Update InputProps to include `label`
interface IconInputProps extends InputProps {
  label: string | React.ReactNode;
}

const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  ({ className, id, type, label, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-10 w-full rounded-md border border-input text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 items-center',
        )}
      >
        <Label className="px-4" htmlFor={id}>
          {label}
        </Label>
        <Separator orientation="vertical" />
        <input
          id={id}
          type={type}
          className={cn(
            'focus:outline-none px-4 w-full rounded-md bg-transparent',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

IconInput.displayName = 'IconInput';

export default IconInput;
