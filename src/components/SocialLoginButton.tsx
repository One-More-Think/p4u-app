import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  TouchableOpacity,
  Image,
  useColorScheme,
  Text,
  View,
} from 'react-native';
import { SocialButtonStyle } from '../style';

type SocialLoginButtonProps = PropsWithChildren<{
  title: string;
  onPress: any;
}>;
const SocialLoginButton = ({
  title,
  onPress,
}: SocialLoginButtonProps): React.JSX.Element => {
  const LogoImage = (title: string) => {
    switch (title) {
      case 'Google':
        return require('assets/images/google_light.png');
      case 'Apple':
        return require('assets/images/apple_light.png');
      default:
        return require('assets/images/google_light.png');
    }
  };
  return (
    <TouchableOpacity
      style={{
        ...SocialButtonStyle.Container,
        backgroundColor: 'white',
      }}
      onPress={onPress}
    >
      <Image
        source={LogoImage(title)}
        resizeMode="center"
        style={SocialButtonStyle.Image}
      />
      <View style={SocialButtonStyle.TextContainer}>
        <Text
          style={{
            fontSize: 15,
            color: 'black',
            fontFamily: 'Robot',
            fontWeight: 'bold',
          }}
        >
          Sign In with {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(SocialLoginButton);
