import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formSubmissions, getFormById } from '@/data/getFormData';
import { FormField } from '@/Types';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
const ViewSubmissions = () => {
  const { id } = useParams();
  const { data: submissions } = useQuery({
    queryKey: ['submissions'],
    queryFn: () => formSubmissions(Number(id)),
  });
  const { data: form } = useQuery({
    queryKey: ['form'],
    queryFn: () => getFormById(Number(id)),
  });

  if (!form?.data) {
    return <div>loading ...</div>;
  }

  const formFields = form?.data[0].form_fields.sort(
    (a, b) => a.order - b.order,
  );

  return (
    <div className="py-24 w-screen flex justify-center">
      <Card className="w-2/3 px-14 pb-8">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="text-xl font-bold">
              {form?.data[0].name}
            </CardTitle>
            {form?.data[0]?.created_at && (
              <p>
                Created At:{' '}
                {format(`${form?.data[0]?.created_at}`, 'dd-MM-yyyy')}
              </p>
            )}
          </div>
          <div className="flex gap-8 pt-6">
            <Card className="w-64 flex-row items-center justify-center">
              <CardHeader className="text-center">Views</CardHeader>
              <div className="flex items-center justify-center pb-6">
                <p className="text-center w-32 bg-white text-black rounded-full text-[5rem]">
                  {form?.data[0].views}
                </p>
              </div>
            </Card>
            <Card className="w-64 flex-row items-center justify-center">
              <CardHeader className="text-center">Submission Count</CardHeader>
              <div className="flex items-center justify-center pb-6">
                <p className="text-center w-32 bg-white text-black rounded-full text-[5rem]">
                  {submissions?.length}
                </p>
              </div>
            </Card>
          </div>
        </CardHeader>
        <Separator />
        <Accordion type="single" collapsible>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {submissions?.map((submission: any, i: number) => (
            <AccordionItem value={`${submission.id}`} key={submission.id}>
              <AccordionTrigger>{`feedback-${i + 1}`}</AccordionTrigger>
              <AccordionContent>
                <div>
                  {formFields?.map((field: FormField, i: number) => {
                    return (
                      <>
                        <Separator className={i > 0 ? 'block' : 'hidden'} />
                        <div
                          key={field.order}
                          className="flex justify-between py-2"
                        >
                          <p>{field.label} :</p>
                          <p> {submission.data[field.order]}</p>
                        </div>
                      </>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
};
export default ViewSubmissions;
