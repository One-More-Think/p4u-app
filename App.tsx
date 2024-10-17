import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import store from './src/reducers/index';
import {setDarkMode} from './src/reducers/userSlice';
import MainPage from './src/pages/MainPage';
import {useColorScheme} from 'react-native';
const App = (): React.JSX.Element => {
  const isDarkMode: any = useColorScheme() === 'dark';
  useEffect(() => {
    store.dispatch(setDarkMode(isDarkMode));
  }, []);
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
};

export default App;
