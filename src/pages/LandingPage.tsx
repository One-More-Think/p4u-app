import React, { useCallback, useMemo } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from 'screens/HomeScreen';
import UserPage from 'pages/UserPage';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { UserInactivityProvider } from 'utils/lock';

const LandingPage = ({ navigation }: any): React.JSX.Element => {
  const placeholder = useCallback((): React.JSX.Element => {
    return (
      <>
        <View />
      </>
    );
  }, []);
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const isLoading = useSelector((state: any) => state.config.isLoading);
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const BottomTab = createBottomTabNavigator();

  return (
    <UserInactivityProvider>
      <BottomTab.Navigator
        initialRouteName="HomeStack"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#222428' : 'white',
          },
          tabBarIcon: ({ focused }: any) => {
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
        })}
      >
        <BottomTab.Screen
          name="HomeStack"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              if (isLoading) e.preventDefault();
            },
          })}
          key="HomeStack"
        />

        <BottomTab.Screen
          name="Post"
          component={placeholder}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              if (isLoading) return;
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
          listeners={({ navigation, route }: any) => ({
            tabPress: (e) => {
              if (isLoading) e.preventDefault();
              else navigation.setParams({ userId: userInfo.id });
            },
          })}
          key="User"
        />
      </BottomTab.Navigator>
    </UserInactivityProvider>
  );
};

export default React.memo(LandingPage);
