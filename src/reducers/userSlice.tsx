import { createSlice } from '@reduxjs/toolkit';

interface UserInfoType {
  id?: string;
  name?: string;
  email?: string;
  country?: string;
  questions?: [];
  gender?: string;
  occupation?: string;
  aboutme?: string;
  age?: number;
}

interface userInitType {
  isAuthenticated: boolean;
  userInfo: UserInfoType;
  darkmode: boolean;
  sns?: string;
}

const initialState: userInitType = {
  isAuthenticated: false,
  userInfo: {
    id: '',
    email: '',
    country: '',
    age: 0,
    gender: 'none',
    occupation: 'none',
    aboutme: ``,
  },
  darkmode: false,
  sns: '',
};

type DarkModeAction = {
  payload: boolean;
};

type OAuth2Action = {
  payload: any;
};

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDarkMode: (state: any, action: DarkModeAction) => {
      state.darkmode = action.payload;
    },

    userLogin: (state: any, action: OAuth2Action) => {
      const { userInfo, sns } = action.payload;
      state.userInfo = { ...state.userInfo, ...userInfo };
      if (sns) state.sns = sns;
      state.isAuthenticated = true;
    },

    userLogOut: (state: any, action: any) => {
      state = initialState;
    },
  },
});
export const { userLogin, userLogOut, setDarkMode } = usersSlice.actions;
export default usersSlice.reducer;
