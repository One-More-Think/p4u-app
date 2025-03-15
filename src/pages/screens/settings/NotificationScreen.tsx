import React, { useState } from 'react';
import { Text, View, Switch } from 'react-native';
import SettingCommonHeader from 'components/SettingCommonHeader';
import { CommonHeaderStyle } from './style';
import SettingBlock from 'components/SettingBlock';

const NotificationScreen = ({ route, navigation }: any): React.JSX.Element => {
  const { title } = route.params;
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const toggleSwitch = () =>
    setIsEnabled((previousState: boolean) => !previousState);

  const notificationList = [
    {
      title: 'Notification Sound',
      description: 'P4U',
      onPress: () => console.log('pop up to change the sounds'),
    },
    {
      title: 'In-app Notifications',
      description: (
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      ),
    },
    { title: 'In-app Sounds', description: <Switch /> },
    { title: 'In-app Vibration', description: <Switch /> },
  ];
  return (
    <SettingCommonHeader title={title} navigation={navigation}>
      <View style={CommonHeaderStyle.Container}>
        <Text style={CommonHeaderStyle.ContainerText}>Notification</Text>
        {notificationList.map((notification) => (
          <SettingBlock
            key={notification.title}
            title={notification.title}
            description={notification.description}
            onPress={notification.onPress}
          />
        ))}
      </View>
    </SettingCommonHeader>
  );
};

export default React.memo(NotificationScreen);
