import FieldGenerator from '@/components/FormInputFields/FieldGenerator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogHeader } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/lib/supabase';
import { FormDetails, FormField as FormFieldType } from '@/Types';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z, ZodSchema, ZodTypeAny } from 'zod';

const generateSchema = (fields: FormFieldType[]): ZodSchema => {
  const schemaShape: { [key: string]: ZodTypeAny } = {};

  fields.forEach((field) => {
    let schema;

    // Define validation for each field type
    switch (field.type) {
      case 'text':
        schema = field.required
          ? z.string().min(1, { message: field.error_message || 'Required' })
          : z.string().optional();
        break;
      case 'textarea':
        schema = field.required
          ? z.string().min(1, { message: field.error_message || 'Required' })
          : z.string().optional();
        break;
      case 'star-rating':
        schema = field.required
          ? z.coerce
              .number({ message: field.error_message || 'Required' })
              .min(1, { message: field.error_message || 'Required' })
          : z.coerce.number().optional();

        break;
      case 'num-rating':
        schema = field.required
          ? z.coerce
              .number({ message: field.error_message || 'Required' })
              .min(1, { message: field.error_message || 'Required' })
          : z.coerce.number().optional();
        break;
      case 'smiley-rating':
        schema = field.required
          ? z.coerce
              .number({ message: field.error_message || 'Required' })
              .min(1, { message: field.error_message || 'Required' })
          : z.coerce.number().optional();
        break;
      case 'radio':
        schema = field.required
          ? z.string().min(1, { message: field.error_message || 'Required' })
          : z.string().optional();
        break;
      case 'select':
        schema = field.required
          ? z.string().min(1, { message: field.error_message || 'Required' })
          : z.string().optional();
        break;
      default:
        schema = z.any(); // Fallback schema if no match
    }

    schemaShape[field.order.toString()] = schema; // Use field label as key
  });

  return z.object(schemaShape);
};

const CustomForm = ({ formData }: { formData: FormDetails }) => {
  const [open, setOpen] = useState(true);
  const [success, setSuccess] = useState(false);
  const formDataSchema = generateSchema(formData.form_fields);
  type formType = z.infer<typeof formDataSchema>;
  const form = useForm<formType>({
    resolver: zodResolver(formDataSchema),
  });

  const sortedFields = formData.form_fields.sort((a, b) => a.order - b.order);

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  console.log(errors);
  const onSubmit = async (data: formType) => {
    const insertData = {
      form_id: formData.id,
      data: data,
    };
    try {
      const { error } = await supabase
        .from('submissions')
        .insert([insertData])
        .select();
      if (!error) {
        setOpen?.(false);
        setSuccess(true);
        reset();
        toast.success('Form submitted successfully');
      } else {
        throw new Error(error.message);
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      toast.error(error.message);
    }
  };
  return (
    <>
      <Dialog defaultOpen={open} onOpenChange={setOpen}>
        <div className="flex justify-center py-24">
          <DialogContent>
            <Card
              className={`w-[35rem] ${
                success
                  ? 'flex justify-center items-center h-6/12 pt-6'
                  : 'pb-8 h-fit '
              }`}
            >
              {!success ? (
                <>
                  <CardHeader>
                    {' '}
                    <DialogHeader className="relative">
                      <DialogTitle className="text-3xl text-center">
                        Custom Form
                      </DialogTitle>
                      <DialogClose className="absolute top-0 right-1">
                        <Button
                          onClick={() => setOpen(false)}
                          variant={'destructive'}
                        >
                          Close
                        </Button>
                      </DialogClose>
                    </DialogHeader>
                  </CardHeader>

                  <ScrollArea className="h-[25rem] w-full">
                    <CardContent>
                      <Form {...form}>
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="space-y-6"
                        >
                          {sortedFields.map((item, i: number) => {
                            return (
                              <FormField
                                key={i}
                                control={form.control}
                                name={item.order.toString()}
                                render={({ field }) => (
                                  <FormItem className="space-y-3">
                                    <FormLabel className="text-bold">
                                      {item.label}
                                    </FormLabel>
                                    <FormControl>
                                      <FieldGenerator
                                        formField={item}
                                        field={field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            );
                          })}
                          <Button type="submit" disabled={isSubmitting}>
                            Submit
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </ScrollArea>
                </>
              ) : (
                <CardContent className="flex flex-col space-y-4 items-center">
                  <CardTitle>Form Submitted Successfull</CardTitle>
                  <DialogClose>
                    <Button
                      onClick={() => setOpen(false)}
                      variant={'destructive'}
                      className="w-full"
                    >
                      Close
                    </Button>
                  </DialogClose>
                </CardContent>
              )}
            </Card>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default CustomForm;
