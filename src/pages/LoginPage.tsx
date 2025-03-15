import React, { useCallback } from 'react';
import { View, Text, Image } from 'react-native';
import { LoginPageStyle } from 'style';
import Common from 'components/Common';
import SocialLoginButton from 'components/SocialLoginButton';
import store from 'reducers/index';
import { OAuth2Login } from 'reducers/actions/UserAction';
const LoginPage = (): React.JSX.Element => {
  const onPress = useCallback((snsType: string) => {
    store.dispatch(OAuth2Login(snsType));
  }, []);

  return (
    <Common>
      <View style={LoginPageStyle.topBodyContainer}>
        <Image
          source={require('assets/images/logo.png')}
          resizeMode="contain"
          style={LoginPageStyle.topBodyLogo}
        />
        {/* <Text style={LoginPageStyle.topBodyText}>Pick For You</Text> */}
      </View>
      <View style={LoginPageStyle.bottomBodyContainer}>
        <SocialLoginButton title="Google" onPress={() => onPress('google')} />
        {/* <SocialLoginButton title="Apple" onPress={() => onPress('apple')} /> */}
        {/* <Text>
          By clicking Log in, you agree to Terms. Learn how we process your data
          in our Privacy Policy.
        </Text> */}
      </View>
    </Common>
  );
};

export default LoginPage;
