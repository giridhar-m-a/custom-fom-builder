import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NumRating: React.FC<{ field: any; max_value: number }> = ({
  field,
  max_value,
}) => {
  return (
    <>
      <RadioGroup
        onValueChange={field.onChange}
        defaultValue={field.value}
        className="flex"
      >
        {Array.from({ length: max_value }).map((_, i) => (
          <FormItem className="flex items-center space-x-3 space-y-0" key={i}>
            <FormControl>
              <RadioGroupItem
                value={`${i + 1}`}
                id={`num-${i + 1}`}
                className="hidden"
              />
            </FormControl>
            <FormLabel
              className={`text-xl hover:bg-secondary ${
                field.value == i + 1 ? 'bg-blue-400' : ''
              } border-2 p-2 px-4`}
              htmlFor={`num-${i + 1}`}
            >
              {i + 1}
            </FormLabel>
          </FormItem>
        ))}
      </RadioGroup>
    </>
  );
};

export default NumRating;
