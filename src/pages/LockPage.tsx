import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { LockPageStyle } from 'style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Common from 'components/Common';
import { useSelector } from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import store from 'reducers/index';
import { showAlert } from 'reducers/alertSlice';

const LockPage = ({ route }: any): React.JSX.Element => {
  const navigation = useNavigation();
  const { isSetPassword } = route.params;
  const passwordLength = Array(4).fill(-1);
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const [password, setPassword] = useState<number[]>([]);
  const KEYPAD = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const handleNumber = useCallback(
    (number: number) => {
      if (password.length !== 4) {
        setPassword([...password, number]);
      }
    },
    [password]
  );
  useEffect(() => {
    if (password.length === 4) {
      if (isSetPassword) {
        const newPassword = password.join('');
        const setPassword = async () => {
          await EncryptedStorage.setItem('password', newPassword);
        };
        setPassword();
        navigation.goBack();
        return;
      } else {
        const getPassword = async () => {
          return await EncryptedStorage.getItem('password');
        };
        const handlePasswordValidation = async () => {
          const currentPassword = await getPassword();

          if (!currentPassword) {
            store.dispatch(
              showAlert({
                message: 'Set your password',
                type: 'error',
                id: Date.now().toString(),
              })
            );
            return;
          }

          const inputPassword = password.join('');
          if (currentPassword === inputPassword) {
            navigation.goBack();
          } else {
            store.dispatch(
              showAlert({
                message: 'Incorrect password',
                type: 'error',
                id: Date.now().toString(),
              })
            );
            setPassword([]);
          }
        };
        handlePasswordValidation();
      }
    }
  }, [password]);
  return (
    <Common style={isDarkMode ? { backgroundColor: '#222428' } : {}}>
      <SafeAreaView style={LockPageStyle.SafeArea}>
        <View
          style={{
            height: '15%',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: isDarkMode ? 'white' : '#222428',
            }}
          >
            Enter Password
          </Text>
        </View>
        <View style={[LockPageStyle.PasswordContainer]}>
          {passwordLength.map((_, idx) => (
            <View
              key={`password-idx-${idx}`}
              style={[
                LockPageStyle.PasswordEmpty,
                {
                  backgroundColor: isDarkMode
                    ? password[idx] >= 0
                      ? 'white'
                      : 'black'
                    : password[idx] >= 0
                    ? '#222428'
                    : 'lightgrey',
                },
              ]}
            />
          ))}
        </View>
        <View style={LockPageStyle.NumberContainer}>
          {KEYPAD.map((row, idx) => (
            <View
              key={`numberContainer-idx-${idx}`}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              {row.map((number) => (
                <TouchableOpacity
                  key={`number-${idx}-${number}`}
                  style={LockPageStyle.NumberTouchContainer}
                  onPress={() => handleNumber(number)}
                >
                  <Text
                    key={`Keypad-idx-${idx}-${number}`}
                    style={{
                      ...LockPageStyle.NumberText,
                      color: isDarkMode ? '#222428' : 'white',
                    }}
                  >
                    {number}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              key={`number-0`}
              style={LockPageStyle.NumberTouchContainer}
              onPress={() => handleNumber(0)}
            >
              <Text style={LockPageStyle.NumberText}>0</Text>
            </TouchableOpacity>
            <Ionicons
              name="backspace-outline"
              size={35}
              style={{
                position: 'absolute',
                right: 0,
                display: 'flex',
                alignSelf: 'center',
                justifyContent: 'center',
                color: isDarkMode ? 'white' : '#222428',
              }}
              onPress={() => setPassword((prev) => prev.slice(0, -1))}
            />
          </View>
        </View>
      </SafeAreaView>
    </Common>
  );
};

export default LockPage;
