import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from 'screens/HomeScreen';
import PostScreen from 'screens/PostScreen';
import NotificationScreen from 'screens/settings/NotificationScreen';
import UserScreen from 'screens/UserScreen';
import SettingPage from 'pages/screens/SettingPage';
import {useSelector} from 'react-redux';

const LandingPage = (): React.JSX.Element => {
  const ScreenArray = [
    {
      name: 'HomeStack',
      page: HomeScreen,
    },
    {
      name: 'User',
      page: UserScreen,
    },
    {
      name: 'Notification',
      page: NotificationScreen,
    },
    {
      name: 'Setting',
      page: SettingPage,
    },
  ];
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const BottomTab = createBottomTabNavigator();

  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#222428' : 'white',
        },
        tabBarIcon: ({focused}: any) => {
          let iconName: any;
          if (route.name === 'HomeStack') iconName = 'home';
          else if (route.name === 'Notification')
            iconName = 'notifications-sharp';
          else if (route.name === 'Post') iconName = 'pencil';
          else if (route.name === 'User') iconName = 'person';
          else if (route.name === 'Setting') iconName = 'settings';
          return (
            <Ionicons
              name={iconName}
              size={30}
              color={
                isDarkMode
                  ? focused
                    ? 'white'
                    : '#70747e'
                  : focused
                  ? '#2d2e32'
                  : '#cad1e2'
              }
            />
          );
        },
      })}>
      {ScreenArray.map((screen: any) => (
        <BottomTab.Screen
          name={screen.name}
          component={screen.page}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
          }}
          key={screen.name}
        />
      ))}
    </BottomTab.Navigator>
  );
};

export default LandingPage;
