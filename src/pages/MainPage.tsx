import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingPage from 'pages/LandingPage';
import QuestionDetailScreen from 'pages/screens/QuestionDetailScreen';
import AboutScreen from 'screens/settings/AboutScreen';
import NotificationScreen from 'screens/settings/NotificationScreen';
import PrivacyScreen from 'screens/settings/PrivacyScreen';
import ThemeScreen from 'screens/settings/ThemeScreen';
import LanguageScreen from 'screens/settings/LanguageScreen';
import SupportScreen from 'screens/settings/SupportScreen';
import AccountScreen from './screens/settings/AccountScreen';
export const MainPage = (): React.JSX.Element => {
  const MainStack = createNativeStackNavigator();
  const ScreenList = [
    {name: 'LandingPage', component: LandingPage},
    {name: 'QuestionDetailScreen', component: QuestionDetailScreen},
    {name: 'NotificationScreen', component: NotificationScreen},
    {name: 'PrivacyScreen', component: PrivacyScreen},
    {name: 'ThemeScreen', component: ThemeScreen},
    {name: 'LanguageScreen', component: LanguageScreen},
    {name: 'SupportScreen', component: SupportScreen},
    {name: 'AboutScreen', component: AboutScreen},
    {name: 'AccountScreen', component: AccountScreen},
  ];
  useEffect(() => {}, []);

  const MainStackScreen = () => {
    return (
      <NavigationContainer>
        <MainStack.Navigator
          initialRouteName="LandingPage"
          screenOptions={({route}) => ({
            gestureEnabled:
              route.name === 'QuestionDetail' || route.name.includes('Screen'),
          })}>
          {ScreenList.map(screen => (
            <MainStack.Screen
              key={screen.name}
              options={{headerShown: false}}
              name={screen.name}
              component={screen.component}
            />
          ))}
        </MainStack.Navigator>
      </NavigationContainer>
    );
  };
  return (
    <>
      <MainStackScreen />
    </>
  );
};

export default MainPage;
