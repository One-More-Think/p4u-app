import React, { useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
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
import { useTranslation } from 'react-i18next';

const SettingPage = ({ route, navigation }: any): React.JSX.Element => {
  const { t, i18n } = useTranslation();
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const configInfo = useSelector((state: any) => state.config);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#222428' : 'white',
  };

  const settingList = [
    {
      name: 'person-circle',
      title: `${t('Account')}`,
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
      title: `${t('Privacy_Security')}`,
      description: '',
      page: 'Privacy',
    },
    {
      name: 'contrast',
      title: `${t('Themes')}`,
      description: `${t('System_Mode')}`,
      page: 'Theme',
    },
    {
      name: 'globe-outline',
      title: `${t('Languages')}`,
      description: `${i18n.language}`,
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
      title: `${t('About')}`,
      description: configInfo.appInfo.version,
      page: 'About',
    },
    {
      name: 'log-in-outline',
      title: `${t('LogOut')}`,
      page: 'LogOut',
      fontColor: '#e06666',
      onPress: () =>
        Alert.alert(t('LogOut'), t('LogOut_message'), [
          { text: t('Cancel'), style: 'cancel' },
          {
            text: t('OK'),
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
          {t('Settings')}
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
        unitId={
          Platform.OS === 'ios'
            ? process.env.BANNER_IOS_UNIT_ID || ''
            : process.env.BANNER_ANDROID_UNIT_ID || ''
        }
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </Common>
  );
};

export default SettingPage;
