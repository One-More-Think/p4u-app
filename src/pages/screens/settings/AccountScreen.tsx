import React from 'react';
import { Alert, Text, View } from 'react-native';
import SettingCommonHeader from 'components/SettingCommonHeader';
import { CommonHeaderStyle } from './style';
import SettingBlock from 'components/SettingBlock';
import CountryFlag from 'components/CountryFlag';
import { useSelector } from 'react-redux';
import store from 'reducers/index';
import { DeleteUser } from 'reducers/actions/UserAction';
import { useTranslation } from 'react-i18next';

const AccountScreen = ({ route, navigation }: any): React.JSX.Element => {
  const { title } = route.params;
  const { t } = useTranslation();
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const AccountList = [
    { title: `${t('Email')}`, description: userInfo.email },
    {
      title: `${t('Country')}`,
      description: (
        <CountryFlag
          isoCode={userInfo.country}
          size={20}
          style={{ borderWidth: 0.5, borderColor: 'black' }}
        />
      ),
    },
    {
      title: `${t('Gender')}`,
      description: t(
        userInfo.gender.at(0).toUpperCase() + userInfo.gender.slice(1)
      ),
    },
    {
      title: `${t('Occupation')}`,
      description:
        userInfo.occupation.at(0).toUpperCase() + userInfo.occupation.slice(1),
    },
    {
      title: `${t('Delete_Account')}`,
      onPress: () =>
        Alert.alert(t('Delete_Account'), t('Delete_Account_message'), [
          {
            text: t('Cancel'),
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: t('OK'),
            onPress: async () => {
              await store.dispatch(DeleteUser(userInfo.id));
              navigation.reset({
                key: 'Login',
                index: 0,
                routes: [{ name: 'LoginPage' }],
              });
            },
          },
        ]),
      fontColor: '#e06666',
    },
  ];
  return (
    <SettingCommonHeader title={title} navigation={navigation}>
      <View style={CommonHeaderStyle.Container}>
        <Text style={CommonHeaderStyle.ContainerText}>{t('Account')}</Text>
        {AccountList.map((account) => (
          <SettingBlock
            key={account.title}
            title={account.title}
            description={account.description}
            onPress={account.onPress}
            fontColor={account.fontColor}
          />
        ))}
      </View>
    </SettingCommonHeader>
  );
};

export default React.memo(AccountScreen);
