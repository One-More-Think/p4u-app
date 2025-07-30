import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LockPage from 'pages/LockPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { setAppState } from 'reducers/configSlice';
import EncryptedStorage from 'react-native-encrypted-storage';

const LOCK_TIME = 3000;

export const UserInactivityProvider = ({ children }: any) => {
  const appState = useRef(AppState.currentState);
  const navigation: any = useNavigation();
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );
    return () => subscription.remove();
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    const isLockOn = await EncryptedStorage.getItem('isLockOn');
    if (
      navigation.getState().routes[navigation.getState().routes.length - 1]
        .name === 'LockPage'
    )
      return;
    if (
      isLockOn === 'true' &&
      appState.current === 'inactive' &&
      nextAppState === 'active'
    ) {
      navigation.push('LockPage', { isSetPassword: false });
    }
    if (isLockOn === 'true' && appState.current === 'background') {
      navigation.push('LockPage', { isSetPassword: false });
    }

    // Update the app state
    appState.current = nextAppState;
  };

  return children;
};
