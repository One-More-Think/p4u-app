import {configureStore} from '@reduxjs/toolkit';
import userReducer from 'reducers/userSlice';
import configReducer from 'reducers/configSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    config: configReducer,
  },
});

export default store;
