import React, { useMemo, useState, useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import Common from 'components/Common';
import { useDispatch, useSelector } from 'react-redux';
import { NewMemberScreenStyle } from 'style';
import { Picker } from '@react-native-picker/picker';
import {
  BannerAd,
  TestIds,
  BannerAdSize,
} from 'react-native-google-mobile-ads';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountryFlag from 'components/CountryFlag';
import { Input } from '@rneui/themed';
import { userLogin } from 'reducers/userSlice';
import { UpdateUser } from 'reducers/actions/UserAction';
import { useTranslation } from 'react-i18next';
import store from 'reducers/index';

const EditUserScreen = ({ navigation }: any): React.JSX.Element => {
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const { t } = useTranslation();
  const [age, setAge] = useState<number>(userInfo.age);
  const [gender, setGender] = useState<string>(userInfo.gender);
  const [occupation, setOccupation] = useState<string>(userInfo.occupation);
  const [aboutMe, setAboutMe] = useState<string>(userInfo.aboutMe);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const ageList = useMemo(() => {
    return Array.from({ length: 100 - 15 + 1 }, (_, i) => i + 15);
  }, []);
  const onAge = useCallback(
    (text: number) => {
      setAge(text);
    },
    [age]
  );
  const genderList = useMemo(() => {
    return ['none', 'Male', 'Female'];
  }, []);
  const onGender = useCallback(
    (text: string) => {
      setGender(text);
    },
    [gender]
  );

  const onOccupation = useCallback(
    (text: string) => {
      setOccupation(text);
    },
    [occupation]
  );

  const onAboutMe = useCallback(
    (text: string) => {
      setAboutMe(text);
    },
    [aboutMe]
  );

  const handleEditUser = useCallback(() => {
    const country = userInfo.country;
    const userData: any = {
      country,
      age,
      gender,
      occupation,
      aboutMe,
    };

    store.dispatch(UpdateUser(userData, userInfo.id));
    store.dispatch(userLogin({ userInfo: userData }));
    navigation.goBack();
  }, [age, gender, occupation, aboutMe]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      <Common style={{ backgroundColor: isDarkMode ? '#222428' : '#e1e9fc' }}>
        <SafeAreaView style={NewMemberScreenStyle.SafeArea}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={isDarkMode ? '#222428' : 'white'}
          />
          <TouchableOpacity
            style={{ position: 'absolute', left: 0, marginLeft: 20 }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={30} color="gray" />
          </TouchableOpacity>
          <Text
            style={{
              ...NewMemberScreenStyle.SafeAreaText,
              color: isDarkMode ? 'white' : '#222428',
            }}
          >
            {t('Edit_User')}
          </Text>
        </SafeAreaView>
        <ScrollView
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 15,
            height: '100%',
            width: '100%',
          }}
        >
          <View style={NewMemberScreenStyle.Container}>
            <View style={NewMemberScreenStyle.RowContainer}>
              <Text
                style={{
                  ...NewMemberScreenStyle.Text,
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                {t('Email')}
              </Text>
              <Text
                style={{
                  color: isDarkMode ? 'white' : '#222428',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}
              >
                {userInfo.email}
              </Text>
              <Text
                style={{
                  ...NewMemberScreenStyle.Text,
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                {t('Country')}
              </Text>
              <CountryFlag isoCode={userInfo.country} size={30} />
            </View>
            <View style={NewMemberScreenStyle.RowContainer}>
              <View style={NewMemberScreenStyle.ColumnContainer}>
                <Text
                  style={{
                    ...NewMemberScreenStyle.Text,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  {t('Age')}
                </Text>
                <Picker
                  onValueChange={(itemValue) => onAge(itemValue)}
                  selectedValue={age}
                  style={{ width: '100%' }}
                >
                  {ageList.map((item: any) => (
                    <Picker.Item
                      label={item}
                      value={item}
                      key={age}
                      color={
                        Platform.OS === 'android'
                          ? '#7a7b7e'
                          : isDarkMode
                          ? 'white'
                          : '#222428'
                      }
                    />
                  ))}
                </Picker>
              </View>
              <View style={NewMemberScreenStyle.ColumnContainer}>
                <Text
                  style={{
                    ...NewMemberScreenStyle.Text,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  {t('Gender')}
                </Text>
                <Picker
                  onValueChange={(itemValue) => onGender(itemValue)}
                  selectedValue={gender}
                  style={{ width: '100%' }}
                >
                  {genderList.map((item: any) => (
                    <Picker.Item
                      label={t(item)}
                      value={item}
                      key={gender}
                      color={
                        Platform.OS === 'android'
                          ? '#7a7b7e'
                          : isDarkMode
                          ? 'white'
                          : '#222428'
                      }
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <Text
              style={{
                ...NewMemberScreenStyle.Text,
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 10,
              }}
            >
              {t('Occupation')}
            </Text>
            <Input
              placeholder={t('Occupation_Input')}
              leftIconContainerStyle={{
                position: 'absolute',
                left: 0,
              }}
              leftIcon={
                occupation ? (
                  <Ionicons
                    name="close-circle"
                    onPress={() => setOccupation('')}
                    size={20}
                    color={isDarkMode ? '#222428' : 'gray'}
                  />
                ) : undefined
              }
              placeholderTextColor="darkgray"
              inputStyle={{
                ...NewMemberScreenStyle.TextContainer,
                color: isDarkMode ? 'white' : '#222428',
              }}
              inputContainerStyle={{
                ...NewMemberScreenStyle.inputContainerStyle,
                width: '45%',
                height: 40,
                backgroundColor: isDarkMode ? '#70747e' : 'white',
                flexWrap: 'wrap',
              }}
              value={occupation}
              onChangeText={(text) => onOccupation(text)}
            />
            <Text
              style={{
                ...NewMemberScreenStyle.Text,
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 10,
              }}
            >
              {t('About_Me')}
            </Text>
            <Input
              placeholder={String(t('About_Me') + '...')}
              leftIconContainerStyle={{
                position: 'absolute',
                left: 0,
                top: -3,
              }}
              leftIcon={
                aboutMe ? (
                  <Ionicons
                    name="close-circle"
                    onPress={() => setAboutMe('')}
                    size={20}
                    color={isDarkMode ? '#222428' : 'gray'}
                  />
                ) : undefined
              }
              placeholderTextColor="darkgray"
              inputStyle={{
                ...NewMemberScreenStyle.TextContainer,
                color: isDarkMode ? 'white' : '#222428',
              }}
              inputContainerStyle={{
                ...NewMemberScreenStyle.inputContainerStyle,
                height: 100,
                backgroundColor: isDarkMode ? '#70747e' : 'white',
                flexWrap: 'wrap',
              }}
              value={aboutMe}
              onChangeText={(text) => onAboutMe(text)}
            />
            <TouchableOpacity
              style={NewMemberScreenStyle.ConfirmButton}
              onPress={handleEditUser}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: isDarkMode ? 'white' : '#222428',
                }}
              >
                {t('Confirm')}
              </Text>
            </TouchableOpacity>
          </View>
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
    </>
  );
};

export default EditUserScreen;
