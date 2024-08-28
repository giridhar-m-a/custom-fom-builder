import { FormField } from '@/Types';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import {
  PiSmileyAngryBold,
  PiSmileyBold,
  PiSmileyMehBold,
  PiSmileySadBold,
  PiSmileyWinkBold,
} from 'react-icons/pi';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

const FormFieldView: React.FC<{ field: FormField }> = ({ field }) => {
  switch (field.type) {
    case 'textarea':
      return <TextAreaField field={field} />;
    case 'text':
      return <TextInput field={field} />;
    case 'star-rating':
      return <StarRatingInput field={field} />;
    case 'num-rating':
      return <NumRatingInput field={field} />;
    case 'radio':
      return <RadioInput field={field} />;
    case 'select':
      return <SelectInput field={field} />;
    case 'smiley-rating':
      return <SmileyInput field={field} />;
    default:
      return null;
  }
};

const TextAreaField: React.FC<{ field: FormField }> = ({ field }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={field.label.trim()}>{field.label}</Label>
      <Textarea id={field.label.trim()} />
    </div>
  );
};
const TextInput: React.FC<{ field: FormField }> = ({ field }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={field.label.trim()}>{field.label}</Label>
      <Input id={field.label.trim()} />
    </div>
  );
};
const StarRatingInput: React.FC<{ field: FormField }> = ({ field }) => {
  const maxValue = field.max_value ?? 5;
  const [hoverValue, setHoverValue] = React.useState(0);
  const [selectValue, setSelectValue] = React.useState(0);
  return (
    <div className="space-y-2">
      <Label>{field.label}</Label>
      <RadioGroup className="flex gap-4">
        {Array.from({ length: maxValue }).map((_, i) => (
          <React.Fragment key={i + 1}>
            <Label htmlFor={`${i + 1}`}>
              <FaStar
                size={24}
                style={{
                  color: `${
                    i + 1 <= hoverValue
                      ? 'gold'
                      : selectValue >= i + 1
                      ? 'gold'
                      : 'gray'
                  }`,
                }}
                onMouseEnter={() => setHoverValue(i + 1)}
                onMouseLeave={() => setHoverValue(0)}
                onClick={() => setSelectValue(i + 1)}
              />
            </Label>
            <RadioGroupItem
              id={`${i + 1}`}
              value={`${i + 1}`}
              className="hidden"
            />
          </React.Fragment>
        ))}
      </RadioGroup>
    </div>
  );
};
const SmileyInput: React.FC<{ field: FormField }> = ({ field }) => {
  const [hoverValue, setHoverValue] = React.useState(0);
  const [selectValue, setSelectValue] = React.useState(0);
  return (
    <div className="space-y-2">
      <Label>{field.label}</Label>
      <RadioGroup className="flex gap-4">
        <div>
          <Label htmlFor="1">
            <PiSmileyAngryBold
              size={24}
              style={{
                color: `${
                  1 <= hoverValue ? 'gold' : selectValue >= 1 ? 'gold' : 'gray'
                }`,
              }}
              onMouseEnter={() => setHoverValue(1)}
              onMouseLeave={() => setHoverValue(0)}
              onClick={() => setSelectValue(1)}
            />
          </Label>
          <RadioGroupItem id="1" value="1" className="hidden" />
        </div>
        <div>
          <Label htmlFor="2">
            <PiSmileySadBold
              size={24}
              style={{
                color: `${
                  2 <= hoverValue ? 'gold' : selectValue >= 2 ? 'gold' : 'gray'
                }`,
              }}
              onMouseEnter={() => setHoverValue(2)}
              onMouseLeave={() => setHoverValue(0)}
              onClick={() => setSelectValue(2)}
            />
          </Label>
          <RadioGroupItem id="2" value="2" className="hidden" />
        </div>
        <div>
          <Label htmlFor="3">
            <PiSmileyMehBold
              size={24}
              style={{
                color: `${
                  3 <= hoverValue ? 'gold' : selectValue >= 3 ? 'gold' : 'gray'
                }`,
              }}
              onMouseEnter={() => setHoverValue(3)}
              onMouseLeave={() => setHoverValue(0)}
              onClick={() => setSelectValue(3)}
            />
          </Label>
          <RadioGroupItem id="3" value="3" className="hidden" />
        </div>
        <div>
          <Label htmlFor="4">
            <PiSmileyBold
              size={24}
              style={{
                color: `${
                  4 <= hoverValue ? 'gold' : selectValue >= 4 ? 'gold' : 'gray'
                }`,
              }}
              onMouseEnter={() => setHoverValue(4)}
              onMouseLeave={() => setHoverValue(0)}
              onClick={() => setSelectValue(4)}
            />
          </Label>
          <RadioGroupItem id="4" value="4" className="hidden" />
        </div>
        <div>
          <Label htmlFor="5">
            <PiSmileyWinkBold
              size={24}
              style={{
                color: `${
                  5 <= hoverValue ? 'gold' : selectValue >= 5 ? 'gold' : 'gray'
                }`,
              }}
              onMouseEnter={() => setHoverValue(5)}
              onMouseLeave={() => setHoverValue(0)}
              onClick={() => setSelectValue(5)}
            />
          </Label>
          <RadioGroupItem id="5" value="5" className="hidden" />
        </div>
      </RadioGroup>
    </div>
  );
};
const NumRatingInput: React.FC<{ field: FormField }> = ({ field }) => {
  const maxValue = field.max_value ?? 5;
  const [selectValue, setSelectValue] = React.useState(0);
  return (
    <div className="space-y-2">
      <Label>{field.label}</Label>
      <RadioGroup className="flex gap-2">
        {Array.from({ length: maxValue }).map((_, i) => (
          <React.Fragment key={i + 1}>
            <Label
              htmlFor={`${i + 1}`}
              className={`text-xl hover:bg-secondary ${
                selectValue === i + 1 ? 'bg-blue-400' : ''
              } border-2 p-2 px-4`}
              onClick={() => setSelectValue(i + 1)}
            >
              {i + 1}
            </Label>
            <RadioGroupItem
              id={`${i + 1}`}
              value={`${i + 1}`}
              className="hidden"
            />
          </React.Fragment>
        ))}
      </RadioGroup>
    </div>
  );
};
const RadioInput: React.FC<{ field: FormField }> = ({ field }) => {
  return (
    <div className="space-y-2">
      <Label>{field.label}</Label>
      <RadioGroup className="flex gap-2">
        {field.options?.map((option, i) => {
          return (
            <div key={i} className="flex items-center gap-2">
              <RadioGroupItem id={option.trim()} value={option} />
              <Label htmlFor={option.trim()}>{option}</Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};
const SelectInput: React.FC<{ field: FormField }> = ({ field }) => {
  return (
    <div className="space-y-2">
      <Label>{field.label}</Label>
      <Select>
        <SelectTrigger>Select</SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {field.options?.map((option, i) => {
              return (
                <SelectItem key={i} value={option}>
                  {option}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormFieldView;
