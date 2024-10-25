import React, {useCallback, useMemo} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from 'screens/HomeScreen';
import NotificationPage from './NotificationPage';
import UserPage from 'pages/UserPage';
import SettingPage from 'pages/SettingPage';
import {useSelector} from 'react-redux';
import PostPage from 'pages/PostPage';
import {View} from 'react-native';

const LandingPage = ({navigation}: any): React.JSX.Element => {
  const ScreenArray = [
    {
      name: 'HomeStack',
      page: HomeScreen,
    },
    {
      name: 'Post',
      page: null,
    },
    {
      name: 'User',
      page: UserPage,
    },
  ];
  const placeholder = useCallback((): React.JSX.Element => {
    <>
      <View />
    </>;
  }, []);
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const BottomTab = createBottomTabNavigator();

  return (
    <BottomTab.Navigator
      initialRouteName="HomeStack"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#222428' : 'white',
        },
        tabBarIcon: ({focused}: any) => {
          let iconName: any;
          if (route.name === 'HomeStack') iconName = 'home';
          else if (route.name === 'Notification') iconName = 'chatbox';
          else if (route.name === 'Post') iconName = 'add-circle';
          else if (route.name === 'User') iconName = 'person';
          else if (route.name === 'Setting') iconName = 'settings';
          return (
            <Ionicons
              name={iconName}
              size={route.name === 'Post' ? 75 : 35}
              style={{
                position: 'absolute',
                paddingBottom: route.name === 'Post' ? 10 : 0,
              }}
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
      {/* {ScreenArray.map((screen: any) => (
        <BottomTab.Screen
          name={screen.name}
          component={screen.page}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
          }}
          key={screen.name}
          listeners={({navigation}) => ({
            tabPress: e => {
              e.preventDefault();
              {
                screen.name === 'Post' && navigation.navigate('CustomModal');
              }
            },
          })}
        />
      ))} */}
      <BottomTab.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
        key="HomeStack"
      />

      <BottomTab.Screen
        name="Post"
        component={placeholder}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('PostScreen');
          },
        })}
        key="Post"
      />

      <BottomTab.Screen
        name="User"
        component={UserPage}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
        key="User"
      />
    </BottomTab.Navigator>
  );
};

export default LandingPage;
