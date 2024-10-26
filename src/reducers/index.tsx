import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import userReducer from 'reducers/userSlice';
import configReducer from 'reducers/configSlice';
import alertReducer from 'reducers/alertSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    config: configReducer,
    alert: alertReducer,
  },
});

export default store;
