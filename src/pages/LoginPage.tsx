import React, {useCallback} from 'react';
import {View, Text, Image} from 'react-native';
import {LoginPageStyle} from 'style';
import Common from 'components/Common';
import SocialLoginButton from 'components/SocialLoginButton';
import store from 'reducers/index';
import {setAuthenticated} from 'reducers/userSlice';
const LoginPage = (): React.JSX.Element => {
  const onPress = useCallback(() => {
    // do Oauth2 and set user and authentication
    store.dispatch(setAuthenticated(true));
  }, []);
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
        <SocialLoginButton title="Google" onPress={onPress} />
        <SocialLoginButton title="Apple" onPress={onPress} />
      </View>
    </Common>
  );
};

export default LoginPage;
