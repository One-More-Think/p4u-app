import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import PostScreen from './screens/PostScreen';
import UserScreen from './screens/UserScreen';
import SettingScreen from './screens/SettingScree';
import {useSelector} from 'react-redux';

const LandingPage = (): React.JSX.Element => {
  const ScreenArray = [
    {
      name: 'HomeStack',
      page: HomeScreen,
    },
    {
      name: 'Search',
      page: SearchScreen,
    },
    {
      name: 'Post',
      page: PostScreen,
    },
    {
      name: 'User',
      page: UserScreen,
    },
    {
      name: 'Setting',
      page: SettingScreen,
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
          else if (route.name === 'Search') iconName = 'search';
          else if (route.name === 'Post') iconName = 'add-circle-outline';
          else if (route.name === 'User') iconName = 'person';
          else if (route.name === 'Setting') iconName = 'settings';
          return (
            <Ionicons
              name={iconName}
              size={30}
              color={
                isDarkMode
                  ? focused
                    ? '#70747e'
                    : 'white'
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
