import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Alert {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  id: string;
}

interface AlertState {
  alerts: Alert[];
}

const initialState: AlertState = {
  alerts: [],
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert(state, action: PayloadAction<Alert>) {
      state.alerts.push(action.payload);
    },
    hideAlert(state, action: PayloadAction<string>) {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    },
  },
});

export const {showAlert, hideAlert} = alertSlice.actions;

export default alertSlice.reducer;
