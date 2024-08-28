import { useForm, useFieldArray } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/Store';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { FormField as FormFieldType } from '@/Types';
import { addFields } from '@/store/FormFieldSlice';
import { resetFieldEditor } from '@/store/FieldEditorSlice';
import { CardContent } from '../ui/card';
import { FiMinusCircle } from 'react-icons/fi';

const FieldEditor: React.FC<{ type: FormFieldType['type'] }> = ({ type }) => {
  const dispatch = useDispatch();
  const renderFormField = () => {
    switch (type) {
      case 'text':
      case 'textarea':
        return <TextForm type={type} />;
      case 'star-rating':
      case 'num-rating':
        return <RatingForm type={type} />;
      case 'radio':
      case 'select':
        return <OptionForm type={type} />;
      case 'smiley-rating':
        return <SmileyForm type={type} />;
      default:
        return <>No Fields</>;
    }
  };

  return (
    <CardContent className="py-8">
      {renderFormField()}
      <div className="pt-4">
        <Button
          className="w-full"
          variant="destructive"
          onClick={() => dispatch(resetFieldEditor())}
        >
          Cancel
        </Button>
      </div>
    </CardContent>
  );
};

export default FieldEditor;

const TextForm: React.FC<{ type: 'text' | 'textarea' }> = ({ type }) => {
  const fieldLength = useSelector((state: RootState) => {
    return state.formField.length;
  });
  const textFormSchema = z
    .object({
      label: z.string().min(1, { message: 'Label is required' }),
      required: z.coerce.boolean(),
      description: z.string().optional(),
      error_message: z.string().optional(),
      order: z.coerce.number(),
      type: z.enum(['text', 'textarea']),
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
  type textform = z.infer<typeof textFormSchema>;

  const form = useForm<textform>({
    resolver: zodResolver(textFormSchema),
    defaultValues: {
      order: fieldLength === 0 ? 1 : fieldLength + 1,
      type: type,
      required: false,
    },
  });
  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;
  const dispatch = useDispatch();

  const submitForm = (data: textform) => {
    console.log('submitForm');
    dispatch(addFields(data));
    dispatch(resetFieldEditor());
    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="space-y-4">
          <FormField
            control={control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="label">Label</FormLabel>
                <FormControl>
                  <Input id="label" placeholder="Enter Label" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="required"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel htmlFor="required">Required</FormLabel>
                <FormControl>
                  <Switch
                    id="required"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.getValues().required && (
            <FormField
              control={control}
              name="error_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="error_message">Error Message</FormLabel>
                  <FormControl>
                    <Textarea
                      id="error_message"
                      placeholder="Enter Error Message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormControl>
                  <Textarea
                    id="description"
                    placeholder="Enter Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
const RatingForm: React.FC<{ type: 'star-rating' | 'num-rating' }> = ({
  type,
}) => {
  const fieldLength = useSelector((state: RootState) => {
    return state.formField.length;
  });
  const ratingFormSchema = z
    .object({
      label: z.string().min(1, { message: 'Label is required' }),
      required: z.coerce.boolean(),
      description: z.string().optional(),
      error_message: z.string().optional(),
      order: z.coerce.number(),
      type: z.enum(['star-rating', 'num-rating']),
      max_value: z.coerce.number().min(3, { message: 'Minimum value is 3' }),
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

  type textform = z.infer<typeof ratingFormSchema>;

  const form = useForm<textform>({
    resolver: zodResolver(ratingFormSchema),
    defaultValues: {
      order: fieldLength === 0 ? 1 : fieldLength + 1,
      type: type,
      required: true,
      max_value: 5,
    },
  });
  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;
  const dispatch = useDispatch();

  const submitForm = (data: textform) => {
    console.log('submitForm');
    dispatch(addFields(data));
    dispatch(resetFieldEditor());
    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        <FormField
          control={control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="label">Label</FormLabel>
              <FormControl>
                <Input id="label" placeholder="Enter Label" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="max_value"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="max_value">Max Value</FormLabel>
              <FormControl>
                <Input
                  id="max_value"
                  placeholder="Enter Max Value"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel htmlFor="required">Required</FormLabel>
              <FormControl>
                <Switch
                  id="required"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues().required && (
          <FormField
            control={control}
            name="error_message"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="error_message">Error Message</FormLabel>
                <FormControl>
                  <Textarea
                    id="error_message"
                    placeholder="Enter Error Message"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Enter Description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};
const SmileyForm: React.FC<{ type: 'smiley-rating' }> = ({ type }) => {
  const fieldLength = useSelector((state: RootState) => {
    return state.formField.length;
  });
  const ratingFormSchema = z
    .object({
      label: z.string().min(1, { message: 'Label is required' }),
      required: z.coerce.boolean(),
      description: z.string().optional(),
      error_message: z.string().optional(),
      order: z.coerce.number(),
      type: z.enum(['smiley-rating']),
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

  type textform = z.infer<typeof ratingFormSchema>;

  const form = useForm<textform>({
    resolver: zodResolver(ratingFormSchema),
    defaultValues: {
      order: fieldLength === 0 ? 1 : fieldLength + 1,
      type: type,
      required: true,
    },
  });
  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;
  const dispatch = useDispatch();

  const submitForm = (data: textform) => {
    console.log('submitForm');
    dispatch(addFields(data));
    dispatch(resetFieldEditor());
    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        <FormField
          control={control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="label">Label</FormLabel>
              <FormControl>
                <Input id="label" placeholder="Enter Label" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel htmlFor="required">Required</FormLabel>
              <FormControl>
                <Switch
                  id="required"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues().required && (
          <FormField
            control={control}
            name="error_message"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="error_message">Error Message</FormLabel>
                <FormControl>
                  <Textarea
                    id="error_message"
                    placeholder="Enter Error Message"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Enter Description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};
const OptionForm: React.FC<{ type: 'radio' | 'select' }> = ({ type }) => {
  const fieldLength = useSelector((state: RootState) => state.formField.length);

  const optionFormSchema = z
    .object({
      label: z.string().min(1, { message: 'Label is required' }),
      required: z.coerce.boolean(),
      description: z.string().optional(),
      error_message: z.string().optional(),
      order: z.coerce.number(),
      type: z.enum(['select', 'radio']),
      options: z
        .array(z.string())
        .min(2, { message: 'At least three options are required' }), // Minimum of 3 options
    })
    .refine(
      (data) => !data.required || (data.required && !!data.error_message),
      {
        message: 'Error message is required if required is true',
        path: ['error_message'],
      },
    );

  type TextForm = z.infer<typeof optionFormSchema>;

  const form = useForm<TextForm>({
    resolver: zodResolver(optionFormSchema),
    defaultValues: {
      order: fieldLength === 0 ? 1 : fieldLength + 1,
      type: type,
      required: false,
      options: [],
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = form;

  const { fields, append, remove } = useFieldArray({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    name: 'options',
    control: control,
  });

  const dispatch = useDispatch();

  const submitForm = (data: TextForm) => {
    console.log('submitForm', data);
    dispatch(addFields(data));
    dispatch(resetFieldEditor());
    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        <FormField
          control={control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="label">Label</FormLabel>
              <FormControl>
                <Input id="label" placeholder="Enter Label" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {fields.map((item, index) => (
          <FormField
            key={item.id}
            control={control}
            name={`options.${index}`}
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel htmlFor={`options.${index}`}>
                    Option {index + 1}
                  </FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        id={`options.${index}`}
                        placeholder={`Enter option ${index + 1}`}
                        {...field}
                      />
                    </FormControl>

                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      variant={'destructive'}
                      className="px-2"
                    >
                      <FiMinusCircle size={20} />
                    </Button>
                  </div>
                </FormItem>
                <FormMessage />
              </>
            )}
          />
        ))}

        <Button
          type="button"
          onClick={() => append('')}
          className="bg-blue-500 text-white"
        >
          Add Option
        </Button>

        <FormField
          control={control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel htmlFor="required">Required</FormLabel>
              <FormControl>
                <Switch
                  id="required"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues().required && (
          <FormField
            control={control}
            name="error_message"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="error_message">Error Message</FormLabel>
                <FormControl>
                  <Textarea
                    id="error_message"
                    placeholder="Enter Error Message"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Enter Description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};
