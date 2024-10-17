import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './LoginPage';
import LandingPage from './LandingPage';
import QuestionDetailPage from './screens/QuestionDetailPage';
export const MainPage = (): React.JSX.Element => {
  const MainStack = createNativeStackNavigator();
  useEffect(() => {}, []);
  const MainStackScreen = () => {
    return (
      <NavigationContainer>
        <MainStack.Navigator
          initialRouteName="LandingPage"
          screenOptions={({route}) => ({
            gestureEnabled: route.name === 'QuestionDetail',
          })}>
          <MainStack.Screen
            options={{headerShown: false}}
            name="LandingPage"
            component={LandingPage}
          />
          <MainStack.Screen
            options={{headerShown: false}}
            name="QuestionDetail"
            component={QuestionDetailPage}
          />
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
