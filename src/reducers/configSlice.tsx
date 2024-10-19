import {createSlice} from '@reduxjs/toolkit';

interface configSliceInitType {
  isLoading: boolean;
  language: string;
}

const initialState: configSliceInitType = {
  isLoading: false,
  language: 'English',
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    syncLocal: (state: any, action: any) => {
      state.token = action.payload;
    },
    setLanguage: (state: any, action: any) => {
      state.language = action.payload;
    },
  },
});
export const {setLanguage} = configSlice.actions;
export default configSlice.reducer;
