import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useSelector } from 'react-redux';

const useAppStateListener = () => {
  const appState = useRef(AppState.currentState);
  const [Lock, setLock] = useState<boolean>(false);
  const isAuthenticated = useSelector(
    (state: any) => state.user.isAuthenticated
  );

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (!isAuthenticated) return;
    if (appState.current === 'background' && nextAppState === 'active') {
      setLock(true);
    } else setLock(false);

    appState.current = nextAppState;
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      handleAppStateChange(nextAppState);
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, [handleAppStateChange]);

  return Lock;
};

export default useAppStateListener;
