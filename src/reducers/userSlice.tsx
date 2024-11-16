import { createSlice } from '@reduxjs/toolkit';
import { User } from '@react-native-google-signin/google-signin';
export interface UserInfoType {
  id?: string;
  name?: string;
  email?: string;
  country?: string;
  questions?: [];
  gender?: string;
  occupation?: string;
  aboutme?: string;
  age?: number;
  language?: string;
}

interface userInitType {
  isAuthenticated: boolean;
  userInfo: UserInfoType;
  darkmode: boolean;
  sns?: string;
}

interface OAuth2Type {
  userInfo: UserInfoType;
  sns?: string;
  authentication?: boolean;
}

const initialState: userInitType = {
  isAuthenticated: false,
  userInfo: {
    id: '',
    email: '',
    country: '',
    age: 0,
    gender: '',
    occupation: '',
    aboutme: ``,
  },
  darkmode: false,
  sns: '',
};

type Action<T> = {
  type: string;
  payload: T;
};

interface DarkModeAction extends Action<boolean> {}

interface OAuth2Action extends Action<OAuth2Type> {}

interface LogOutAction extends Action<null> {}

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDarkMode: (state: any, action: DarkModeAction) => {
      state.darkmode = action.payload;
    },

    userLogin: (state: any, action: OAuth2Action) => {
      const { userInfo, sns, authentication = null } = action.payload;
      state.userInfo = { ...state.userInfo, ...userInfo };
      if (sns) state.sns = sns;
      if (authentication !== null) state.isAuthenticated = authentication;
      else state.isAuthenticated = true;
    },

    userLogOut: (state: any, action: LogOutAction) => {
      state = initialState;
    },
  },
});
export const { userLogin, userLogOut, setDarkMode } = usersSlice.actions;
export default usersSlice.reducer;
