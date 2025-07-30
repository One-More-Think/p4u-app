import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  View,
  Modal,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Easing,
  Animated,
} from 'react-native';

import { LoginPageStyle, ModalStyle } from 'pages/LoginPage.style';
import Common from 'components/Common';
import SocialLoginButton from 'components/SocialLoginButton';
import store from 'reducers/index';
import { OAuth2Login } from 'reducers/actions/UserAction';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useTranslation } from 'react-i18next';
import { getLocales } from 'react-native-localize';

const LoginPage = (): React.JSX.Element => {
  const { t, i18n } = useTranslation();
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [AgreeAll, setAgreeAll] = useState<boolean>(false);
  const [OAuthAgree, setOAuthAgree] = useState<boolean>(false);
  const [checkList, setCheckList] = useState<string[]>([]);
  const [seeDetail, setSeeDetail] = useState<any>({
    Gender: false,
    Country: false,
    Age: false,
  });
  const [language, setLanguage] = useState('en');

  const animations = useRef<any>({
    Gender: new Animated.Value(0),
    Country: new Animated.Value(0),
    Age: new Animated.Value(0),
  }).current;

  const toggleCollapse = (item: any) => {
    const isOpen: boolean = seeDetail[item];

    Animated.timing(animations[item], {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
    setSeeDetail((prev: any) => ({ ...prev, [item]: !isOpen }));
  };

  const nameList = useMemo((): string[] => {
    return ['Gender', 'Country', 'Age'];
  }, []);
  const descriptionList = useMemo((): any => {
    return {
      Gender: t('Gender_Term'),
      Country: t('Country_Term'),
      Age: t('Age_Term'),
    };
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onAgreeToContinue = useCallback(async () => {
    await EncryptedStorage.setItem('isAgreement', 'true');
    onClose();
  }, []);

  const onAgreeAll = useCallback(() => {
    if (!EnalbeAgree) {
      setCheckList(['Gender', 'Country', 'Age']);
      setOAuthAgree(true);
    } else {
      setCheckList([]);
      setOAuthAgree(false);
    }
    setAgreeAll(!AgreeAll);
  }, [AgreeAll, checkList, OAuthAgree]);

  const onOAuthAgree = useCallback(() => {
    setOAuthAgree(!OAuthAgree);
  }, [OAuthAgree]);

  const onAgreeCheck = useCallback(
    (item: string) => {
      if (checkList.includes(item)) {
        setCheckList(checkList.filter((check: string) => check !== item));
      } else setCheckList([...checkList, item]);
    },
    [checkList]
  );

  const EnalbeAgree = useMemo(() => {
    return (
      checkList.includes('Gender') &&
      checkList.includes('Country') &&
      checkList.includes('Age') &&
      OAuthAgree
    );
  }, [checkList, OAuthAgree]);

  const onPress = useCallback(
    async (snsType: string) => {
      const isAgreement = await EncryptedStorage.getItem('isAgreement');
      if (isAgreement !== 'true') {
        setIsOpen(true);
      } else store.dispatch(OAuth2Login(snsType));
    },
    [EnalbeAgree]
  );

  const BorderLine = (): React.JSX.Element => {
    return (
      <>
        <View
          style={{
            width: '100%',
            borderBottomWidth: 0.5,
            borderColor: isDarkMode ? 'white' : '#222428',
            height: 10,
          }}
        />
      </>
    );
  };

  const InterpolateValue: any = useMemo(() => {
    return {
      ko: { Gender: 240, Country: 200, Age: 420 },
      en: { Gender: 330, Country: 220, Age: 740 },
      es: { Gender: 360, Country: 280, Age: 880 },
      ja: { Gender: 250, Country: 230, Age: 410 },
      zh: { Gender: 230, Country: 200, Age: 390 },
      vn: { Gender: 350, Country: 280, Age: 470 },
    };
  }, [language]);

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLanguage =
        (await EncryptedStorage.getItem('language')) ||
        getLocales()[0].languageCode;
      setLanguage(storedLanguage);
    };
    loadLanguage();
  }, []);

  return (
    <Common>
      <View style={LoginPageStyle.topBodyContainer}>
        {isOpen && (
          <Modal transparent animationType="fade" visible={isOpen}>
            <View style={ModalStyle.Container}>
              <View style={ModalStyle.SubContainer}>
                <View
                  style={{
                    width: '90%',
                    height: '80%',
                    marginBottom: 65,
                  }}
                >
                  <TouchableOpacity
                    style={{ position: 'absolute', right: -10, top: -20 }}
                    onPress={onClose}
                  >
                    <Ionicons
                      name="close-sharp"
                      size={35}
                      style={{
                        color: 'gray',
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      source={require('assets/images/logo.png')}
                      resizeMode="contain"
                      style={{
                        height: 40,
                        width: 40,
                        backgroundColor: '#cec3ee',
                        borderRadius: 10,
                      }}
                    />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        marginLeft: 10,
                        color: '#8373a2',
                      }}
                    >
                      P4U
                    </Text>
                  </View>
                  <BorderLine />
                  <ScrollView
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 10,
                        }}
                      >
                        <TouchableOpacity onPress={onAgreeAll}>
                          <Ionicons
                            name="checkmark-circle"
                            size={30}
                            style={{
                              color: EnalbeAgree ? '#8373a2' : 'gray',
                            }}
                          />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 5 }}>{t('All_Term')}</Text>
                      </View>
                      <Text style={{ marginLeft: 35 }}>
                        {t('All_Term_message')}
                      </Text>
                    </View>
                    <BorderLine />
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                      }}
                    >
                      <TouchableOpacity onPress={onOAuthAgree}>
                        <Ionicons
                          name="checkmark-sharp"
                          size={30}
                          style={{ color: OAuthAgree ? '#8373a2' : 'gray' }}
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          marginLeft: 5,
                          width: '90%',
                        }}
                      >
                        {`[${t('Mandatory')}] Google/Apple`}
                        {'\n'}
                        {t('SNS_Term')}
                      </Text>
                    </View>
                    <BorderLine />
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: 10,
                        marginLeft: 35,
                      }}
                    >
                      <Text>{`[${t('Mandatory')}] ${t(
                        'User_Provided_information'
                      )}\n`}</Text>
                      <Text>{t('User_Term')}</Text>
                      {nameList.map((item: string) => {
                        return (
                          <View
                            key={`${item}-nameList-key`}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              marginTop: 5,
                            }}
                          >
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => onAgreeCheck(item)}
                              >
                                <Ionicons
                                  name="checkmark-sharp"
                                  size={30}
                                  style={{
                                    color: checkList.includes(item)
                                      ? '#8373a2'
                                      : 'gray',
                                  }}
                                />
                              </TouchableOpacity>
                              <Text>{t(item)}</Text>
                              <TouchableOpacity
                                style={{
                                  position: 'absolute',
                                  right: 10,
                                }}
                                onPress={() => toggleCollapse(item)}
                              >
                                <Text
                                  style={{
                                    color: 'gray',
                                    textDecorationLine: 'underline',
                                  }}
                                >
                                  {t('See_detail')}
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <Animated.View
                              style={{
                                height: animations[item].interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [
                                    0,
                                    InterpolateValue[language][item],
                                  ],
                                }),
                              }}
                            >
                              <Text style={{ flexShrink: 1 }}>
                                {descriptionList[item]}
                              </Text>
                            </Animated.View>
                          </View>
                        );
                      })}
                      <Text style={{ marginTop: 15 }}>
                        {t('Term_bottom_message')}
                      </Text>
                    </View>
                  </ScrollView>
                </View>
                <TouchableOpacity
                  disabled={!EnalbeAgree}
                  onPress={onAgreeToContinue}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    margin: 10,
                    width: '60%',
                    backgroundColor: EnalbeAgree ? '#8373a2' : 'gray',
                    height: 45,
                    borderRadius: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 17,
                      fontWeight: 'bold',
                    }}
                  >
                    {t('Term_Button')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
        <Image
          source={require('assets/images/logo.png')}
          resizeMode="contain"
          style={LoginPageStyle.topBodyLogo}
        />
      </View>
      <View style={LoginPageStyle.bottomBodyContainer}>
        <SocialLoginButton title="Google" onPress={() => onPress('google')} />
        <SocialLoginButton title="Apple" onPress={() => onPress('apple')} />
      </View>
    </Common>
  );
};

export default React.memo(LoginPage);
