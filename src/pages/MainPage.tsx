import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from 'pages/LandingPage';
import LoginPage from 'pages/LoginPage';
import QuestionDetailScreen from 'pages/screens/QuestionDetailScreen';
import AboutScreen from 'screens/settings/AboutScreen';
import NotificationScreen from 'screens/settings/NotificationScreen';
import PrivacyScreen from 'screens/settings/PrivacyScreen';
import ThemeScreen from 'screens/settings/ThemeScreen';
import LanguageScreen from 'screens/settings/LanguageScreen';
import SupportScreen from 'screens/settings/SupportScreen';
import AccountScreen from 'screens/settings/AccountScreen';
import SearchScreen from 'screens/SearchScreen';
import NewMemberScreen from 'screens/NewMemberScreen';
import EditUserScreen from 'screens/EditUserScreen';
import SettingPage from 'pages/SettingPage';
import PostPage from 'pages/PostPage';
import { useSelector } from 'react-redux';
import UserDetailScreen from 'screens/UserDetailScreen';
export const MainPage = (): React.JSX.Element => {
  const MainStack = createNativeStackNavigator();

  const ScreenList = useMemo(() => {
    return [
      { name: 'LandingPage', component: LandingPage },
      { name: 'QuestionDetailScreen', component: QuestionDetailScreen },
      { name: 'NotificationScreen', component: NotificationScreen },
      { name: 'PrivacyScreen', component: PrivacyScreen },
      { name: 'ThemeScreen', component: ThemeScreen },
      { name: 'LanguageScreen', component: LanguageScreen },
      { name: 'SupportScreen', component: SupportScreen },
      { name: 'AboutScreen', component: AboutScreen },
      { name: 'AccountScreen', component: AccountScreen },
      { name: 'SettingPage', component: SettingPage },
      { name: 'SearchScreen', component: SearchScreen },
      { name: 'PostScreen', component: PostPage },
      { name: 'EditUserScreen', component: EditUserScreen },
      { name: 'UserDetailScreen', component: UserDetailScreen },
    ];
  }, []);

  const MainStackScreen = () => {
    const isAuthenticated = useSelector(
      (state: any) => state.user.isAuthenticated
    );
    const userInfo = useSelector((state: any) => state.user.userInfo);

    return (
      <NavigationContainer>
        <MainStack.Navigator
          initialRouteName="LandingPage"
          screenOptions={({ route }) => ({
            gestureEnabled:
              route.name === 'QuestionDetail' || route.name.includes('Screen'),
          })}
        >
          {isAuthenticated ? (
            userInfo.age === 0 ? (
              <MainStack.Screen
                component={NewMemberScreen}
                name="NewMemberScreen"
                options={{ headerShown: false }}
              />
            ) : (
              ScreenList.map((screen) => (
                <MainStack.Screen
                  key={screen.name}
                  name={screen.name}
                  component={screen.component}
                  options={{
                    headerShown: false,
                    ...(screen.name === 'SearchScreen' ||
                    screen.name === 'PostScreen'
                      ? { presentation: 'containedModal' }
                      : {}),
                  }}
                />
              ))
            )
          ) : (
            <MainStack.Screen
              key="Login"
              name="LoginPage"
              component={LoginPage}
              options={{ headerShown: false }}
            />
          )}
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
