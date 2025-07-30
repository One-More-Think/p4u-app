import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import SettingCommonHeader from 'components/SettingCommonHeader';
import SettingBlock from 'components/SettingBlock';
import { CommonHeaderStyle } from 'screens/settings/style';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const AboutScreen = ({ route, navigation }: any): React.JSX.Element => {
  const { t } = useTranslation();
  const { title } = route.params;
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  // const policyList = [
  //   {
  //     title: 'Privacy Policy',
  //     onPress: () =>
  //       navigation.navigate('PrivacyPolicyScreen', {
  //         title: 'Privacy Policy',
  //         navigation,
  //       }),
  //   },
  // ];
  const config = useSelector((state: any) => state.config.appInfo);
  return (
    <SettingCommonHeader title={title} navigation={navigation}>
      <View style={CommonHeaderStyle.Container}>
        <Text style={CommonHeaderStyle.ContainerText}>
          {t('App_Version')} {config.version}
        </Text>
        {/* {policyList.map((policy: any) => (
          <SettingBlock
            title={policy.title}
            key={policy.title}
            onPress={policy.onPress}
          />
        ))} */}
        <ScrollView
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: isDarkMode ? 'white' : 'dark',
              width: '93%',
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{t('Terms_Conditions')}</Text>
            {t('Terms_Conditions_message')}
            <Text style={{ fontWeight: 'bold' }}>
              {t('Location-Based_Information')}
            </Text>
            {t('Location-Based_Information_message')}
            <Text style={{ fontWeight: 'bold' }}>
              {t('Youth_Protection_Policy')}
            </Text>
            {t('Youth_Protection_Policy_message')}
            <Text style={{ fontWeight: 'bold' }}>
              {t('Changes_Terms_Conditions')}
            </Text>
            {t('Changes_Terms_Conditions_message')}
            <Text style={{ fontWeight: 'bold' }}>{t('Contact_us')}</Text>
            {t('Contact_us_message')}
          </Text>
        </ScrollView>
      </View>
    </SettingCommonHeader>
  );
};

export default React.memo(AboutScreen);
