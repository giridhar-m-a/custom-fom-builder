import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Option {
  id: number;
  name: string;
}

const initialState: Option[] = [];

const OptionSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {
    addOption: (state, action: PayloadAction<Option>) => {
      state.push(action.payload);
    },
    removeOption: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { addOption, removeOption } = OptionSlice.actions;
export default OptionSlice.reducer;
