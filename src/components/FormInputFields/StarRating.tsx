import {
  FormControl,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StarRating: React.FC<{ field: any; max_value: number }> = ({
  field,
  max_value,
}) => {
  const [hoverValue, setHoverValue] = useState(0);
  //   console.log(field)
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
                id={`star-${i + 1}`}
                className="hidden"
              />
            </FormControl>
            <FormLabel className="font-normal" htmlFor={`star-${i + 1}`}>
              <FaStar
                size={24}
                style={{
                  color: `${
                    i + 1 <= hoverValue
                      ? 'gold'
                      : field.value >= i + 1
                      ? 'gold'
                      : 'gray'
                  }`,
                }}
                onMouseEnter={() => setHoverValue(i + 1)}
                onMouseLeave={() => setHoverValue(0)}
              />
            </FormLabel>
          </FormItem>
        ))}
      </RadioGroup>
    </>
  );
};

export default StarRating;
