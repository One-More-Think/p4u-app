import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Common from './Common';
import {useSelector} from 'react-redux';
import {SettingCommonHeaderStyle} from 'style';

const SettingCommonHeader = ({
  title,
  navigation,
  children,
}: any): React.JSX.Element => {
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  return (
    <Common style={isDarkMode ? {backgroundColor: '#222428'} : {}}>
      <SafeAreaView
        style={{
          ...SettingCommonHeaderStyle.SafeArea,
          borderBottomColor: isDarkMode ? 'white' : '#222428',
        }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? '#222428' : 'white'}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={SettingCommonHeaderStyle.BackButton}>
          <Ionicons
            name="chevron-back"
            size={40}
            color={isDarkMode ? 'white' : '#222428'}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...SettingCommonHeaderStyle.SafeAreaText,
            color: isDarkMode ? 'white' : '#222428',
          }}>
          {title}
        </Text>
        {/* <TouchableOpacity
          onPress={() => {}}
          style={{marginLeft: 10, position: 'absolute', left: 0}}>
          <Ionicons
            name="chevron-back"
            size={40}
            color={isDarkMode ? 'white' : '#222428'}
          />
        </TouchableOpacity> */}
      </SafeAreaView>
      {children}
    </Common>
  );
};

export default SettingCommonHeader;
