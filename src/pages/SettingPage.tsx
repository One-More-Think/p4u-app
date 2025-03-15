import React from 'react';
import {
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Common from 'components/Common';
import SettingBlock from 'components/SettingBlock';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SettingPageStyle } from 'style';
import { useSelector } from 'react-redux';
import store from 'reducers/index';
import { LogoutUser } from 'reducers/actions/UserAction';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import { CommonActions } from '@react-navigation/native';
import { userLogOut } from 'reducers/userSlice';

const SettingPage = ({ route, navigation }: any): React.JSX.Element => {
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
    // {
    //   name: 'notifications-sharp',
    //   title: 'Notification',
    //   description: '',
    //   page: 'Notification',
    // },
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
      name: 'globe-outline',
      title: 'Languages',
      description: language,
      page: 'Language',
    },
    // {
    //   name: 'headset',
    //   title: 'Help and Support',
    //   description: '',
    //   page: 'Support',
    // },
    {
      name: 'information-circle-outline',
      title: 'About',
      description: configInfo.appInfo.version,
      page: 'About',
    },
    {
      name: 'log-in-outline',
      title: 'LogOut',
      page: 'LogOut',
      fontColor: '#e06666',
      onPress: () =>
        Alert.alert('LogOut', 'Do you want to logout?', [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'OK',
            onPress: () => {
              store.dispatch(LogoutUser());
              navigation.reset({
                key: 'Login',
                index: 0,
                routes: [{ name: 'LoginPage' }],
              });
            },
          },
        ]),
    },
  ];
  return (
    <Common style={isDarkMode ? { backgroundColor: '#222428' } : {}}>
      <SafeAreaView
        style={{
          ...SettingPageStyle.SafeArea,
          borderBottomColor: isDarkMode ? 'white' : '#222428',
        }}
      >
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: 'absolute', left: 0 }}
        >
          <Ionicons
            name="chevron-back"
            size={30}
            color={isDarkMode ? 'white' : '#222428'}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...SettingPageStyle.SafeAreaText,
            color: isDarkMode ? 'white' : '#222428',
          }}
        >
          Settings
        </Text>
      </SafeAreaView>
      <ScrollView style={{ width: '100%' }}>
        {settingList.map((block) => (
          <SettingBlock
            key={block.name}
            name={block.name}
            title={block.title}
            description={block.description}
            page={block.page}
            fontColor={block?.fontColor}
            onPress={block?.onPress}
          />
        ))}
      </ScrollView>
      <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </Common>
  );
};

export default SettingPage;
