import React, { useCallback, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { LoginPageStyle } from 'style';
import Common from 'components/Common';
import SocialLoginButton from 'components/SocialLoginButton';
import store from 'reducers/index';
import { setAuthenticated } from 'reducers/userSlice';
import { OAuth2Login } from 'reducers/actions/UserAction';
const LoginPage = (): React.JSX.Element => {
  const onPress = useCallback((sns: string) => {
    // do Oauth2 and set user and authentication
    store.dispatch(OAuth2Login(sns));
  }, []);

  // useEffect(() => {
  //   store.dispatch(OAuth2Login('google'));
  // }, []);

  return (
    <Common>
      <View style={LoginPageStyle.topBodyContainer}>
        <Image
          source={require('assets/images/logo.png')}
          resizeMode="contain"
          style={LoginPageStyle.topBodyLogo}
        />
        <Text style={LoginPageStyle.topBodyText}>Pick For You</Text>
      </View>
      <View style={LoginPageStyle.bottomBodyContainer}>
        <SocialLoginButton title="Google" onPress={() => onPress('google')} />
        <SocialLoginButton title="Apple" onPress={() => onPress('apple')} />
      </View>
    </Common>
  );
};

export default LoginPage;
