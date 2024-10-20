import React from 'react';
import {Text, View, SafeAreaView, StatusBar, ScrollView} from 'react-native';
import Common from 'components/Common';
import SettingBlock from 'components/SettingBlock';
import {SettingPageStyle} from 'style';
import {useSelector} from 'react-redux';

const SettingPage = ({route, navigation}: any): React.JSX.Element => {
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const language = useSelector((state: any) => state.config.language);
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const configInfo = useSelector((state: any) => state.config);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#222428' : 'white',
  };
  const settingList = [
    {
      name: 'person-circle',
      title: 'Account',
      description: userInfo.email,
      page: 'Account',
    },
    {
      name: 'notifications-sharp',
      title: 'Notification',
      description: '',
      page: 'Notification',
    },
    {
      name: 'lock-closed',
      title: 'Privacy & Security',
      description: '',
      page: 'Privacy',
    },
    {
      name: 'contrast',
      title: 'Themes',
      description: configInfo.mode,
      page: 'Theme',
    },
    {
      name: 'earth',
      title: 'Languages',
      description: language,
      page: 'Language',
    },
    {
      name: 'headset',
      title: 'Help and Support',
      description: '',
      page: 'Support',
    },
    {
      name: 'information-circle-outline',
      title: 'About',
      description: configInfo.appInfo.version,
      page: 'About',
    },
  ];
  return (
    <Common style={isDarkMode ? {backgroundColor: '#222428'} : {}}>
      <SafeAreaView
        style={{
          ...SettingPageStyle.SafeArea,
          borderBottomColor: isDarkMode ? 'white' : '#222428',
        }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Text
          style={{
            ...SettingPageStyle.SafeAreaText,
            color: isDarkMode ? 'white' : '#222428',
          }}>
          Settings
        </Text>
      </SafeAreaView>
      <ScrollView style={{width: '100%'}}>
        {settingList.map(block => (
          <SettingBlock
            key={block.name}
            name={block.name}
            title={block.title}
            description={block.description}
            page={block.page}
          />
        ))}
      </ScrollView>
    </Common>
  );
};

export default SettingPage;
