import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { CommonStyle } from 'style';
import { useSelector } from 'react-redux';
import LoadingIndicator from './LoadingIndicator';
import ToastAlert from 'components/ToastAlert';
import useAppStateListener from 'components/../hooks/useAppStateListener';
import { useNavigation } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

type CommonProps = PropsWithChildren<{
  style?: any;
}>;
const Common = ({ children, style = {} }: CommonProps): React.JSX.Element => {
  const isDarkMode = useSelector((state: any) => state.user.darkmode);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#222428' : 'white',
  };
  const alerts = useSelector((state: any) => state.alert.alerts);
  const isVisible = useSelector((state: any) => state.alert.isVisible);

  return (
    <>
      {alerts.map((item: any) => (
        <ToastAlert
          key={item.id}
          message={item.message}
          type={item.type}
          visible={isVisible}
        />
      ))}
      <LoadingIndicator />
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            ...CommonStyle.mainContainer,
            backgroundColor: isDarkMode ? '#b4bac9' : '#e1e9fc',
            ...style,
          }}
        >
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default React.memo(Common);
