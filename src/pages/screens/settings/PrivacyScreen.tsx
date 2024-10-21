import React, {useCallback} from 'react';
import {Text, View} from 'react-native';
import SettingCommonHeader from 'components/SettingCommonHeader';
import {CommonHeaderStyle} from './style';
import SettingBlock from 'components/SettingBlock';

const PrivacyScreen = ({route, navigation}: any): React.JSX.Element => {
  const {title} = route.params;
  const privacyList = [
    {title: 'Change the Password', onPress: () => console.log('Privacy')},
  ];
  return (
    <SettingCommonHeader title={title} navigation={navigation}>
      <View style={CommonHeaderStyle.Container}>
        <Text style={CommonHeaderStyle.ContainerText}>Security</Text>
        {privacyList.map(privacy => (
          <SettingBlock
            key={privacy.title}
            title={privacy.title}
            onPress={privacy.onPress}
          />
        ))}
      </View>
    </SettingCommonHeader>
  );
};

export default React.memo(PrivacyScreen);
