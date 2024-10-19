import React from 'react';
import {Text, View} from 'react-native';
import SettingCommonHeader from 'components/SettingCommonHeader';

const NotificationScreen = ({route, navigation}: any): React.JSX.Element => {
  const {title} = route.params;
  return (
    <SettingCommonHeader title={title} navigation={navigation}>
      <View>
        <Text>Notification</Text>
      </View>
    </SettingCommonHeader>
  );
};

export default NotificationScreen;
