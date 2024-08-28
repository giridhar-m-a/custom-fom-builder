import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormField } from '@/Types';

const initialState: string = '';

const FieldEditorSlice = createSlice({
  name: 'fieldEditor',
  initialState,
  reducers: {
    setFieldEditor: (state, action: PayloadAction<FormField['type']>) => {
      state = action.payload;
      return state;
    },

    resetFieldEditor: (state) => {
      state = '';
      return state;
    },
  },
});

export const { setFieldEditor, resetFieldEditor } = FieldEditorSlice.actions;
export default FieldEditorSlice.reducer;
