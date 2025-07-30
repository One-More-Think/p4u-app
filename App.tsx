import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/reducers/index';
import { setDarkMode } from './src/reducers/userSlice';
import MainPage from 'pages/MainPage';
import { LoginUser } from 'reducers/actions/UserAction';
import mobileAds from 'react-native-google-mobile-ads';
import SplashScreen from 'react-native-splash-screen';
import { useTranslation } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import EncryptedStorage from 'react-native-encrypted-storage';

const App = (): React.JSX.Element => {
  const { i18n } = useTranslation();
  const isDarkMode: any = useColorScheme() === 'dark';
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  });

  useEffect(() => {
    store.dispatch(setDarkMode(isDarkMode));
    const cacheLogin = async () => {
      await store.dispatch(LoginUser());
    };
    const LanguageInit = async () => {
      const language =
        (await EncryptedStorage.getItem('language')) ||
        getLocales()[0].languageCode;
      await i18n.changeLanguage(language);
    };
    LanguageInit();

    cacheLogin();
    const AdMobInit = async () => {
      await mobileAds().initialize();
    };
    AdMobInit();
  }, []);
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
};

export default App;
