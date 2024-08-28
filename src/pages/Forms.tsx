import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getAllForms, getFormSubmissionCount } from '@/data/getFormData';
import { supabase } from '@/lib/supabase';
import { FormDetails } from '@/Types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Forms = () => {
  const { data: forms } = useQuery({
    queryKey: ['forms'],
    queryFn: getAllForms,
  });

  if (!forms?.data) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Card className="w-1/3">
          <p>Loading...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4  gap-4 py-24 px-14 w-full">
      <a href="/admin/new-form">
        <Card className="flex items-center justify-center h-full w-full">
          <FaPlusCircle size={100} />
        </Card>
      </a>
      {forms?.data?.length > 0 &&
        forms.data.map((form) => <FormCard key={form.id} form={form} />)}
    </div>
  );
};

const FormCard: React.FC<{ form: FormDetails }> = ({ form }) => {
  const [count, setCount] = useState<number | null>(null);
  const router = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchCount = async () => {
      const submissionCount = await getFormSubmissionCount(form.id);
      setCount(submissionCount);
    };
    fetchCount();
  }, [form.id]);

  const deleteForm = async () => {
    await supabase.from('submissions').delete().eq('form_id', form.id);
    const { error } = await supabase.from('forms').delete().eq('id', form.id);
    if (!error) {
      toast.success('Form deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['forms'] });
    } else {
      toast.error(error.message);
    }
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <a href={`/form/${form.id}`}>
          <CardTitle className="text-xl text-center">{form.name}</CardTitle>
        </a>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <p>Submissions :</p>
          <p>{count !== null ? count : 'Loading...'}</p>
        </div>
        <div className="flex justify-between">
          <p>View Count</p>
          <p>{form.views}</p>
        </div>
        <div className="flex justify-between">
          <p>Published At :</p>
          <p>{format(form.created_at, 'dd-MMM-yyyy')}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button
          className="w-full"
          onClick={() => {
            router(`/admin/edit-form/${form.id}`);
          }}
        >
          Edit
        </Button>
        <Button
          className="w-full"
          onClick={() => router(`/admin/submissions/${form.id}`)}
        >
          View Submissions
        </Button>
        <Button variant={'destructive'} className="w-full" onClick={deleteForm}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Forms;
