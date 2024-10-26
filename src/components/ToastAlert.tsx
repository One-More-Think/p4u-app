import React, {useEffect, useMemo} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {hideAlert} from 'reducers/alertSlice';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface ToastAlertProps {
  message: string;
  type: AlertType;
  visible: boolean;
}

const ToastComponent = React.memo(({item}: any): React.JSX.Element => {
  const dispatch = useDispatch();
  const opacity = useMemo(() => new Animated.Value(0), []);
  const backgroundColorMap: any = useMemo(() => {
    return {
      success: '#28a745',
      error: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8',
    };
  }, []);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => dispatch(hideAlert(item.id)));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      key={item.id}
      style={{
        backgroundColor: backgroundColorMap[item.type],
        opacity,
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
      }}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Ionicons
          name={
            item.type === 'success'
              ? 'checkmark-circle'
              : item.type === 'error'
              ? 'close-circle'
              : item.type === 'warning'
              ? 'warning'
              : 'information-circle'
          }
          size={24}
          color="#fff"
        />
        <Text style={styles.alertText}>{item.message}</Text>
      </View>
    </Animated.View>
  );
});

const ToastAlert: React.FC<ToastAlertProps> = () => {
  const alertList = useSelector((state: any) => state.alert.alerts);
  return (
    <View style={styles.alertBox}>
      {alertList.map((item: any) => (
        <ToastComponent item={item} key={item.id} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  alertBox: {
    position: 'absolute',
    top: 90,
    left: '10%',
    right: '10%',
    zIndex: 20,
  },
  alertText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default React.memo(ToastAlert);
