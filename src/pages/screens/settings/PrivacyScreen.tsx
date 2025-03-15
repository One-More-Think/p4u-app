import React, { useEffect, useState } from 'react';
import { Text, View, Switch } from 'react-native';
import SettingCommonHeader from 'components/SettingCommonHeader';
import { CommonHeaderStyle } from './style';
import SettingBlock from 'components/SettingBlock';
import EncryptedStorage from 'react-native-encrypted-storage';
import store from 'reducers/index';
import { showAlert } from 'reducers/alertSlice';

const PrivacyScreen = ({ route, navigation }: any): React.JSX.Element => {
  const { title } = route.params;

  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  const toggleSwitch = () => {
    setIsEnabled((previousState: boolean) => !previousState);
  };
  const privacyList = [
    {
      title: 'Lock Screen',
      description: (
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      ),
    },
    // {
    //   title: 'Biometric ID (Touch ID, Face ID)',
    // },
    {
      title: 'Change the Password',
      onPress: () => navigation.push('LockPage', { isSetPassword: true }),
    },
  ];

  useEffect(() => {
    const fetchDefaultValue = async () => {
      try {
        const value = await EncryptedStorage.getItem('isLockOn');
        setIsEnabled(value === 'true');
      } catch (error) {
        console.error('Error retrieving value:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    fetchDefaultValue();
  }, []);

  useEffect(() => {
    if (isInitializing) return;

    const changeLockOn = async () => {
      try {
        const LockPassword = await EncryptedStorage.getItem('password');
        if (isEnabled && !LockPassword) {
          navigation.push('LockPage', { isSetPassword: true });
        }
        await EncryptedStorage.setItem('isLockOn', isEnabled.toString());
      } catch (error: any) {
        const errorMessage: string =
          error.response?.data?.message ||
          error.message ||
          'Exceptional error occurred';
        store.dispatch(
          showAlert({
            message: errorMessage,
            type: 'error',
            id: Date.now().toString(),
          })
        );
      }
    };

    changeLockOn();
  }, [isEnabled, isInitializing]);
  return (
    <SettingCommonHeader title={title} navigation={navigation}>
      <View style={CommonHeaderStyle.Container}>
        <Text style={CommonHeaderStyle.ContainerText}>Security</Text>
        {privacyList.map((privacy) => (
          <SettingBlock
            key={privacy.title}
            title={privacy.title}
            description={privacy.description}
            onPress={privacy.onPress}
          />
        ))}
      </View>
    </SettingCommonHeader>
  );
};

export default React.memo(PrivacyScreen);
