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
import { useTranslation } from 'react-i18next';

type SocialLoginButtonProps = PropsWithChildren<{
  title: string;
  onPress: any;
}>;
const SocialLoginButton = ({
  title,
  onPress,
}: SocialLoginButtonProps): React.JSX.Element => {
  const { t } = useTranslation();
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
        resizeMode="contain"
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
          {t('Social_Login')} {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(SocialLoginButton);
