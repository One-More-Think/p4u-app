import React from 'react';
import {Text, View} from 'react-native';
import SettingCommonHeader from 'components/SettingCommonHeader';
import {CommonHeaderStyle} from './style';

const SupportScreen = ({route, navigation}: any): React.JSX.Element => {
  const {title} = route.params;
  return (
    <SettingCommonHeader title={title} navigation={navigation}>
      <View style={CommonHeaderStyle.Container}>
        <Text style={CommonHeaderStyle.ContainerText}>Support</Text>
      </View>
    </SettingCommonHeader>
  );
};

export default React.memo(SupportScreen);
