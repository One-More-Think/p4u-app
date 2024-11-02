import React from 'react';
import type { PropsWithChildren } from 'react';
import { TouchableOpacity, Image, useColorScheme } from 'react-native';
import { SocialButtonStyle } from '../style';

type SocialLoginButtonProps = PropsWithChildren<{
  title: string;
  onPress: any;
}>;
const SocialLoginButton = ({
  title,
  onPress,
}: SocialLoginButtonProps): React.JSX.Element => {
  const isDark = useColorScheme() === 'dark';
  const LogoImage = (title: string, isDark: Boolean) => {
    switch (title) {
      case 'Google':
        return isDark
          ? require('assets/images/google_dark.png')
          : require('assets/images/google_light.png');
      case 'Apple':
        return isDark
          ? require('assets/images/apple_dark.png')
          : require('assets/images/apple_light.png');
      default:
        return isDark
          ? require('assets/images/google_dark.png')
          : require('assets/images/google_light.png');
    }
  };
  return (
    <TouchableOpacity style={SocialButtonStyle.Container} onPress={onPress}>
      <Image
        source={LogoImage(title, isDark)}
        style={SocialButtonStyle.Image}
        resizeMode="stretch"
      />
    </TouchableOpacity>
  );
};

export default React.memo(SocialLoginButton);
