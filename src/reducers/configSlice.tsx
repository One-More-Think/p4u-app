import {createSlice} from '@reduxjs/toolkit';

interface configSliceInitType {
  isLoading: boolean;
  language: string;
  appInfo: any;
  mode: string;
}

const initialState: configSliceInitType = {
  isLoading: false,
  language: 'English',
  mode: 'System Mode',
  appInfo: {
    version: '1.0.0',
  },
};

type IsLoadingProps = {
  payload: boolean;
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
    setAppInfo: (state: any, action: any) => {
      state.appInfo = action.payload;
    },
    setMode: (state: any, action: any) => {
      state.mode = action.payload;
    },
    setIsLoading: (state: any, action: IsLoadingProps) => {
      state.isLoading = action.payload;
    },
  },
});
export const {setLanguage, setAppInfo, setMode, setIsLoading} =
  configSlice.actions;

export default configSlice.reducer;
