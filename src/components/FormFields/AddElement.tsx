import { Button } from '@/components/ui/button';
import { setFieldEditor } from '@/store/FieldEditorSlice';
import type { FormField } from '@/Types';
import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import { useDispatch } from 'react-redux';

interface props {
  name: string;
  icon: React.ReactNode;
  type: FormField['type'];
}

const AddElement: React.FC<props> = ({ name, icon, type }) => {
  const dispatch = useDispatch();
  const handleSelect = (type: FormField['type']) => {
    dispatch(setFieldEditor(type));
  };
  return (
    <Button
      variant="ghost"
      className="flex items-center justify-between w-full"
      onClick={() => handleSelect(type)}
    >
      <span className="flex items-center gap-2 text-md">
        {icon}
        <span>{name}</span>
      </span>
      <IoMdAdd className="text-lg font-extrabold" />
    </Button>
  );
};

export default AddElement;
