import {createSlice} from '@reduxjs/toolkit';

interface ErrorSlicInitType {
  isLoading: boolean;
  error: string;
}

const initialState: ErrorSlicInitType = {
  isLoading: false,
  error: '',
};

const usersSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    syncLocal: (state: any, action: any) => {
      state.token = action.payload;
    },
    setError: (state: any, action: any) => {
      state.error = action.payload;
    },
  },
});
export const {setError} = usersSlice.actions;
export default usersSlice.reducer;
