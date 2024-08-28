import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = '';

const FormNameSlice = createSlice({
  name: 'formName',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state = action.payload;
      return state;
    },
    resetName: (state) => {
      state = '';
      return state;
    },
  },
});

export const { setName, resetName } = FormNameSlice.actions;
export default FormNameSlice.reducer;
