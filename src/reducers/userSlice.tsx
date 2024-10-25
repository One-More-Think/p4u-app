import {createSlice} from '@reduxjs/toolkit';

interface UserInfoType {
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
  token: string;
  darkmode: boolean;
}

const initialState: userInitType = {
  isAuthenticated: false,
  userInfo: {
    email: '0623hoon@gmail.com',
    country: 'kr',
    age: 28,
    gender: 'male',
    occupation: 'programmer',
    aboutme: `Hello I like to do play soccer and I'm a programmer in Canada`,
  },
  token: '',
  darkmode: false,
};

type DarkModeAction = {
  payload: boolean;
};

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userValid: (state: any, action: any) => {
      if (state.token) {
        state.isAuthenticated = true;
      }
    },
    setDarkMode: (state: any, action: DarkModeAction) => {
      state.darkmode = action.payload;
    },

    userLogin: (state: any, action: any) => {
      const {user, token, method} = action.payload;
      state.userInfo = user;
      state.isAuthenticated = true;
      state.token = token;
      state.method = method;
    },

    setIsLoading: (state: any, action: any) => {
      state.isLoading = action.payload.loading;
    },

    userLogOut: (state: any, action: any) => {
      state = initialState;
    },
  },
});
export const {userValid, userLogin, userLogOut, setIsLoading, setDarkMode} =
  usersSlice.actions;
export default usersSlice.reducer;
