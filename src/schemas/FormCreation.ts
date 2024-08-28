import * as z from 'zod';

const form_field = z
  .object({
    label: z.string().min(1, { message: 'Label is required' }),
    type: z.enum([
      'text',
      'num-rating',
      'smiley-rating',
      'star-rating',
      'textarea',
      'radio',
      'select',
    ]),
    required: z.coerce.boolean(),
    error_message: z.string().optional(),
    description: z.string().optional(),
    order: z.coerce.number(),
    options: z.array(z.string()).optional(),
    max_value: z.coerce.number().optional(),
  })
  .refine(
    (data) => {
      return !data.required || (data.required && data.error_message);
    },
    {
      message: 'Error message is required if required is true',
      path: ['error_message'],
    },
  );
const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    slug: z.string().optional(),
    start_date: z.date().optional(),
    start_time: z.string().optional(),
    form_fields: z.array(form_field),
    url_logic: z.coerce.boolean(),
    start_time_logic: z.coerce.boolean(),
    start_date_logic: z.coerce.boolean(),
    isPublished: z.coerce.boolean(),
  })
  .refine((data) => !data.url_logic || (data.url_logic && data.slug), {
    message: 'Slug is required if URL logic is enabled',
    path: ['slug'],
  })
  .refine(
    (data) =>
      !data.start_time_logic || (data.start_time_logic && data.start_time),
    {
      message: 'Start time is required if start time logic is enabled',
      path: ['start_time'],
    },
  )
  .refine(
    (data) =>
      !data.start_date_logic || (data.start_date_logic && data.start_date),
    {
      message: 'Start date is required if start date logic is enabled',
      path: ['start_date'],
    },
  );

export { formSchema, form_field };
