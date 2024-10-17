import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {CommonStyle} from '../style';
import {useSelector} from 'react-redux';
type CommonProps = PropsWithChildren<{}>;
const Common = ({children}: CommonProps): React.JSX.Element => {
  const isDarkMode = useSelector((state: any) => state.user.darkmode);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#222428' : 'white',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          ...CommonStyle.mainContainer,
          backgroundColor: isDarkMode ? '#b4bac9' : '#e1e9fc',
        }}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(Common);
