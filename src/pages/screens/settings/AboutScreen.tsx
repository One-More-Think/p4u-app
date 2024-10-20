import React from 'react';
import {Text, View} from 'react-native';
import SettingCommonHeader from 'components/SettingCommonHeader';
import {CommonHeaderStyle} from 'screens/settings/style';
import {useSelector} from 'react-redux';

const AboutScreen = ({route, navigation}: any): React.JSX.Element => {
  const {title} = route.params;
  const config = useSelector((state: any) => state.config.appInfo);
  return (
    <SettingCommonHeader title={title} navigation={navigation}>
      <View style={CommonHeaderStyle.Container}>
        <Text style={CommonHeaderStyle.ContainerText}>
          Version {config.version}
        </Text>
      </View>
    </SettingCommonHeader>
  );
};

export default React.memo(AboutScreen);
