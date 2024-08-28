import { FormDetails } from '@/Types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
const initialState: FormDetails = null;

const FormSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<FormDetails>) => {
      state = action.payload;
      return state;
    },

    resetForm: (state) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      state = null;
      return state;
    },
  },
});

export const { setForm, resetForm } = FormSlice.actions;
export default FormSlice.reducer;
