import { createSlice } from '@reduxjs/toolkit';

export interface UserInfoType {
  id?: string;
  name?: string;
  email?: string;
  country?: string;
  questions?: [];
  gender?: string;
  occupation?: string;
  aboutMe?: string;
  age?: number;
  language?: string;
  isBlocked?: boolean;
}

interface userInitType {
  isAuthenticated: boolean;
  userInfo: UserInfoType;
  darkmode: boolean;
  snsType?: string;
}

interface OAuth2Type {
  userInfo: UserInfoType;
  snsType?: string;
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
    aboutMe: ``,
    isBlocked: false,
  },
  darkmode: false,
  snsType: '',
};

type Action<T> = {
  type: string;
  payload: T;
};

interface DarkModeAction extends Action<boolean> {}

interface OAuth2Action extends Action<OAuth2Type> {}

interface LogOutAction {
  type: string;
}

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDarkMode: (state: any, action: DarkModeAction) => {
      state.darkmode = action.payload;
    },

    userLogin: (state: any, action: OAuth2Action) => {
      const { userInfo, snsType, authentication = null } = action.payload;
      state.userInfo = { ...state.userInfo, ...userInfo };
      if (snsType) state.sns = snsType;
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
