import { FormField } from '@/Types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: FormField[] = [];

const FormFieldSlice = createSlice({
  name: 'formFields',
  initialState,
  reducers: {
    addFields: (state, action: PayloadAction<FormField>) => {
      state.push(action.payload);
    },
    removeFields: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },

    resetFields: (state) => {
      state = [];
      return state;
    },
  },
});
export const { addFields, removeFields, resetFields } = FormFieldSlice.actions;
export default FormFieldSlice.reducer;
