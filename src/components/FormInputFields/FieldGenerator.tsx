import { FormField } from '@/Types';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import NumRating from './NumericRating';
import SmileyRating from './SmileyRating';
import StarRating from './StarRating';
import RadioField from './RadioField';
import SelectField from './SelectField';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FieldGenerator: React.FC<{ formField: FormField; field: any }> = ({
  formField,
  field,
}) => {
  switch (formField.type) {
    case 'text':
      return <Input {...field} />;
    case 'textarea':
      return <Textarea {...field} className='h-32' />;
    case 'num-rating':
      return (
        <NumRating field={field} max_value={formField.max_value as number} />
      );
    case 'smiley-rating':
      return <SmileyRating field={field} />;
    case 'star-rating':
      return (
        <StarRating field={field} max_value={formField.max_value as number} />
      );
    case 'radio':
      return (
        <RadioField field={field} options={formField.options as string[]} />
      );
    case 'select':
      return (
        <SelectField field={field} options={formField.options as string[]} />
      );
    default:
      return null; // To ensure always returning a single element
  }
};

export default FieldGenerator;
