import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import {
  PiSmileyAngryBold,
  PiSmileyBold,
  PiSmileyMehBold,
  PiSmileySadBold,
  PiSmileyWinkBold,
} from 'react-icons/pi';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SmileyRating: React.FC<{ field: any }> = ({ field }) => {
  const [hoverValue, setHoverValue] = useState(0);
  const smileys = [
    <PiSmileyAngryBold
      size={24}
      style={{
        color: `${
          1 <= hoverValue ? 'gold' : field.value >= 1 ? 'gold' : 'gray'
        }`,
      }}
      onMouseEnter={() => setHoverValue(1)}
      onMouseLeave={() => setHoverValue(0)}
    />,
    <PiSmileySadBold
      size={24}
      style={{
        color: `${
          2 <= hoverValue ? 'gold' : field.value >= 2 ? 'gold' : 'gray'
        }`,
      }}
      onMouseEnter={() => setHoverValue(2)}
      onMouseLeave={() => setHoverValue(0)}
    />,
    <PiSmileyMehBold
      size={24}
      style={{
        color: `${
          3 <= hoverValue ? 'gold' : field.value >= 3 ? 'gold' : 'gray'
        }`,
      }}
      onMouseEnter={() => setHoverValue(3)}
      onMouseLeave={() => setHoverValue(0)}
    />,
    <PiSmileyBold
      size={24}
      style={{
        color: `${
          4 <= hoverValue ? 'gold' : field.value >= 4 ? 'gold' : 'gray'
        }`,
      }}
      onMouseEnter={() => setHoverValue(4)}
      onMouseLeave={() => setHoverValue(0)}
    />,
    <PiSmileyWinkBold
      size={24}
      style={{
        color: `${
          5 <= hoverValue ? 'gold' : field.value >= 5 ? 'gold' : 'gray'
        }`,
      }}
      onMouseEnter={() => setHoverValue(5)}
      onMouseLeave={() => setHoverValue(0)}
    />,
  ];
  return (
    <>
      <RadioGroup
        onValueChange={field.onChange}
        defaultValue={field.value}
        className="flex"
      >
        {smileys.map((smiley, i) => (
          <FormItem className="flex items-center space-x-3 space-y-0" key={i}>
            <FormControl>
              <RadioGroupItem
                value={`${i + 1}`}
                id={`smiley-${i + 1}`}
                className="hidden"
              />
            </FormControl>
            <FormLabel className="font-normal" htmlFor={`smiley-${i + 1}`}>
              {smiley}
            </FormLabel>
          </FormItem>
        ))}
      </RadioGroup>
    </>
  );
};

export default SmileyRating;
