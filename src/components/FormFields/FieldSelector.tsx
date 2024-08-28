import AddElement from '@/components/FormFields/AddElement';
import { Calendar } from '@/components/ui/calendar';
import { CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { formSchema } from '@/schemas/FormCreation';
import { resetFields } from '@/store/FormFieldSlice';
import { resetForm, setForm } from '@/store/FormSlice';
import { RootState } from '@/store/Store';
import { formCreationSchema } from '@/Types';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BiCategory } from 'react-icons/bi';
import { BsTextareaResize, BsUiRadios } from 'react-icons/bs';
import { FaRegStar, FaSortNumericUp } from 'react-icons/fa';
import { GoSmiley } from 'react-icons/go';
import { RiInputField } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import IconInput from '../ui/icon-input';
import { useNavigate } from 'react-router-dom';

const FieldSelector = () => {
  const navigate = useNavigate();
  const form_fields = useSelector((state: RootState) => state.formField);
  const savedForm = useSelector((state: RootState) => state.savedForm);
  console.log('saved form :', savedForm);
  const form = useForm<formCreationSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'new form',
      form_fields,
      url_logic: false,
      start_time_logic: false,
      start_date_logic: false,
      isPublished: false,
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;
  const dispatch = useDispatch();

  const createForm = async (formData: formCreationSchema) => {
    const data = {
      ...formData,
      slug: `${
        formData.slug
          ? `/${formData.slug.toLowerCase().replace(/ /g, '-')}`
          : null
      }`,
    };
    const res = await supabase.from('forms').insert([data]).select();
    if (!res.error) {
      toast.success('Form created successfully');
      reset();
      dispatch(resetFields());
      dispatch(setForm(res.data[0]));
    } else {
      toast.error(res.error.message);
    }
  };

  const publishForm = async () => {
    const { error } = await supabase
      .from('forms')
      .update({ isPublished: true })
      .eq('id', savedForm.id)
      .select();
    if (!error) {
      toast.success('Form published successfully');
      dispatch(resetForm());
      navigate('/forms');
    } else {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Form {...form}>
        <form>
          <CardContent className="h-ful space-y-14">
            <div className="flex justify-between gap-4">
              <Button
                type="submit"
                onClick={handleSubmit(createForm)}
                className="basis-1/2"
                disabled={isSubmitting || isSubmitSuccessful}
              >
                Submit
              </Button>
              <Button
                type="reset"
                className="basis-1/2"
                disabled={!isSubmitSuccessful || isSubmitting}
                onClick={publishForm}
              >
                Publish
              </Button>
            </div>
            <div className="space-y-6">
              <CardTitle className="text-xl">Add Fields</CardTitle>
              <div>
                <AddElement
                  name="Textarea"
                  icon={<BsTextareaResize />}
                  type="textarea"
                />
                <AddElement
                  name="Numeric Rating"
                  icon={<FaSortNumericUp />}
                  type="num-rating"
                />
                <AddElement
                  name="Star Rating"
                  icon={<FaRegStar />}
                  type="star-rating"
                />
                <AddElement
                  name="Smiley Rating"
                  icon={<GoSmiley />}
                  type="smiley-rating"
                />
                <AddElement
                  name="Single Line Input"
                  type="text"
                  icon={<RiInputField />}
                />
                <AddElement
                  name="Radio Button"
                  icon={<BsUiRadios />}
                  type="radio"
                />
                <AddElement
                  name="Categories"
                  icon={<BiCategory />}
                  type="select"
                />
              </div>
            </div>
            <div className="space-y-8">
              <CardTitle className="text-xl">Add Logic</CardTitle>
              <FormField
                control={form.control}
                name="url_logic"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel htmlFor="url_logic">
                      Show based on url condition
                    </FormLabel>
                    <FormControl>
                      <Switch
                        id="url_logic"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <IconInput
                        label="BaseUrl"
                        id="slug"
                        type="text"
                        placeholder="slug"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="start_date_logic"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel htmlFor="start_date_logic">
                      Show on specific date
                    </FormLabel>
                    <FormControl>
                      <Switch
                        id="start_date_logic"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Start Date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                          className="w-full"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="start_time_logic"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel htmlFor="start_time_logic">
                      Show on specific time
                    </FormLabel>
                    <FormControl>
                      <Switch
                        id="start_time_logic"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="start_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="start_time">
                      Show on specific time
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="start_time"
                        type="time"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </form>
      </Form>
    </>
  );
};

export default FieldSelector;
