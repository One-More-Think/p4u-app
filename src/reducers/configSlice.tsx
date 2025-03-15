import { createSlice } from '@reduxjs/toolkit';

interface configSliceInitType {
  isLoading: boolean;
  language: string;
  appInfo: any;
  mode: string;
  appStateInactive: boolean;
  isLockOn: boolean;
  LockPassword: number;
}

const initialState: configSliceInitType = {
  isLoading: false,
  language: 'English',
  mode: 'System Mode',
  appInfo: {
    version: '0.0.0',
  },
  appStateInactive: false,
  isLockOn: false,
  LockPassword: 0,
};

type Action<T> = {
  type: string;
  payload: T;
};

interface IsLoadingProps extends Action<boolean> {}

interface IsAppStateProps extends Action<boolean> {}

interface IsLockOnProps extends Action<boolean> {}

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
    setAppState: (state: any, action: IsAppStateProps) => {
      state.appState = action.payload;
    },
    setIsLockOn: (state: any, action: IsLockOnProps) => {
      state.isLockOn = action.payload;
    },
  },
});
export const { setLanguage, setAppInfo, setMode, setIsLoading, setAppState } =
  configSlice.actions;

export default configSlice.reducer;
