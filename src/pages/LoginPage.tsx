import React from 'react';
import {View, Text, Image} from 'react-native';
import {LoginPageStyle} from 'style';
import Common from 'components/Common';
import SocialLoginButton from 'components/SocialLoginButton';
import Logo from 'assets/images/logo.png';
const LoginPage = (): React.JSX.Element => {
  return (
    <Common>
      <View style={LoginPageStyle.topBodyContainer}>
        <Image
          source={Logo}
          resizeMode="contain"
          style={LoginPageStyle.topBodyLogo}
        />
        <Text style={LoginPageStyle.topBodyText}>Pick For You</Text>
      </View>
      <View style={LoginPageStyle.bottomBodyContainer}>
        <SocialLoginButton title="Google" />
        <SocialLoginButton title="Apple" />
      </View>
    </Common>
  );
};

export default LoginPage;
