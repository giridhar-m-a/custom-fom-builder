import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormControl } from '../ui/form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SelectField: React.FC<{ field: any; options: string[] }> = ({
  field,
  options,
}) => {
  return (
    <>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map((option: string, i: number) => {
            return (
              <SelectItem key={i} value={option}>
                {option}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectField;
