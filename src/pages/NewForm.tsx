import FieldEditor from '@/components/FormFields/FieldEditor';
import FieldSelector from '@/components/FormFields/FieldSelector';
import FormFieldView from '@/components/FormFields/FormFieldView';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RootState } from '@/store/Store';
import { FormField } from '@/Types';
import { useSelector } from 'react-redux';

const NewForm = () => {
  const field = useSelector((state: RootState) => state.fieldEditor);
  const fields = useSelector((state: RootState) => state.formField);
  console.log(fields);
  return (
    <div className="flex min-h-screen relative">
      <div className="basis-10/12 flex w-full justify-center py-14">
        <Card className="basis-7/12">
          <CardHeader>
            <CardTitle>New Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field: FormField) => {
              return <FormFieldView field={field} key={field.order} />;
            })}
          </CardContent>
        </Card>
      </div>
      <div className="fixed right-0 w-3/12">
        <ScrollArea className="h-screen w-full">
          <aside>
            <Card className="rounded-none min-h-screen py-10">
              {field === '' ? (
                <FieldSelector />
              ) : (
                <FieldEditor type={field as FormField['type']} />
              )}
            </Card>
          </aside>
        </ScrollArea>
      </div>
    </div>
  );
};

export default NewForm;
