import React from 'react';
import type {PropsWithChildren} from 'react';
import {TouchableOpacity, Text, Image, useColorScheme} from 'react-native';
import {SocialButtonStyle} from '../style';
import Google_Light from '../assets/images/google_light.png';
import Google_Dark from '../assets/images/google_dark.png';
import Apple_Light from '../assets/images/apple_light.png';
import Apple_Dark from '../assets/images/apple_dark.png';

type SocialLoginButtonProps = PropsWithChildren<{
  title: string;
}>;
const SocialLoginButton = ({
  title,
}: SocialLoginButtonProps): React.JSX.Element => {
  const isDark = useColorScheme() === 'dark';
  const LogoImage = (title: string, isDark: Boolean) => {
    switch (title) {
      case 'Google':
        return isDark ? Google_Dark : Google_Light;
      case 'Apple':
        return isDark ? Apple_Dark : Apple_Light;
      default:
        return isDark ? Google_Dark : Google_Light;
    }
  };
  return (
    <TouchableOpacity style={SocialButtonStyle.Container}>
      <Image
        source={LogoImage(title, isDark)}
        style={SocialButtonStyle.Image}
        resizeMode="stretch"
      />
    </TouchableOpacity>
  );
};

export default React.memo(SocialLoginButton);
