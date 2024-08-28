import { FormControl, FormItem } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '../ui/label';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RadioField: React.FC<{ field: any; options: string[] }> = ({
  field,
  options,
}) => {
  return (
    <>
      <RadioGroup
        onValueChange={field.onChange}
        defaultValue={field.value}
        className="flex"
      >
        {options.map((option, i) => {
          return (
            <FormItem key={i} className="flex items-center space-x-3 space-y-0">
              <FormControl>
                <RadioGroupItem value={option} id={option} />
              </FormControl>
              <Label className="font-normal" htmlFor={option}>
                {option}
              </Label>
            </FormItem>
          );
        })}
      </RadioGroup>
    </>
  );
};

export default RadioField;
