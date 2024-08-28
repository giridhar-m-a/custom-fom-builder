import FieldEditor from '@/components/FormFields/FieldEditor';
import FieldSelector from '@/components/FormFields/FieldSelector';
import FormFieldView from '@/components/FormFields/FormFieldView';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import IconInput from '@/components/ui/icon-input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RootState } from '@/store/Store';
import { FormField } from '@/Types';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setName } from '@/store/FormNameSlice';

const NewForm = () => {
  const name = useSelector((state: RootState) => state.FormName);
  const field = useSelector((state: RootState) => state.fieldEditor);
  const fields = useSelector((state: RootState) => state.formField);
  const [newName, SetName]= useState<string>("")
  const dispatch = useDispatch()
  console.log("name",name);
  const disabled = newName === '' ? true : newName === undefined ? true : false;
  const handleName =()=>{
    dispatch(setName(newName))
  }
  return (
    <div className="flex min-h-screen relative">
      <div className="basis-10/12 flex w-full justify-center py-14">
        <Card className="basis-7/12">
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            {name === '' ? (
              <div className='flex gap-8'>
                <IconInput label="Name" value={newName} className="w-full" onChange={(e)=>SetName(e.target.value)} />
                <Button disabled={disabled} onClick={handleName}>Submit</Button>
              </div>
            ) : (
              ''
            )}
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
