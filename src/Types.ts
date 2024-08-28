import { formSchema } from './schemas/FormCreation';
import * as z from 'zod';

interface FormField {
  label: string;
  type:
    | 'text'
    | 'num-rating'
    | 'smiley-rating'
    | 'star-rating'
    | 'textarea'
    | 'radio'
    | 'select';
  required?: boolean;
  error_message?: string;
  description?: string;
  order: number;
  options?: string[];
  max_value?: number;
}

type formCreationSchema = z.infer<typeof formSchema>;

interface FormDetails extends formCreationSchema {
  id: number;
  created_at: string;
  uid: string;
}

export type { FormField, formCreationSchema, FormDetails };
