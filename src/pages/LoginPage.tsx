import React, { useCallback, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { LoginPageStyle } from 'style';
import Common from 'components/Common';
import SocialLoginButton from 'components/SocialLoginButton';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import store from 'reducers/index';
import { OAuth2Login } from 'reducers/actions/UserAction';
import { useSelector } from 'react-redux';
const LoginPage = (): React.JSX.Element => {
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
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
        {/* <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={
            isDarkMode
              ? GoogleSigninButton.Color.Dark
              : GoogleSigninButton.Color.Light
          }
          style={{ width: 312, height: 48 }}
          // style={{ backgroundColor: 'black' }}
          onPress={() => onPress('google')}
        />
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{ width: 312, height: 48 }}
          onPress={() => onPress('apple')}
        /> */}
        <SocialLoginButton title="Google" onPress={() => onPress('google')} />
        <SocialLoginButton title="Apple" onPress={() => onPress('apple')} />
        {/* <Text>
          By clicking Log in, you agree to Terms. Learn how we process your data
          in our Privacy Policy.
        </Text> */}
      </View>
    </Common>
  );
};

export default LoginPage;
