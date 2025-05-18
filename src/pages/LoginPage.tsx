import React, { useCallback, useMemo, useState, useRef } from 'react';
import {
  View,
  Modal,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

import { LoginPageStyle, ModalStyle } from 'pages/LoginPage.style';
import Common from 'components/Common';
import SocialLoginButton from 'components/SocialLoginButton';
import store from 'reducers/index';
import { OAuth2Login } from 'reducers/actions/UserAction';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EncryptedStorage from 'react-native-encrypted-storage';
const LoginPage = (): React.JSX.Element => {
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [AgreeAll, setAgreeAll] = useState<boolean>(false);
  const [OAuthAgree, setOAuthAgree] = useState<boolean>(false);
  const [checkList, setCheckList] = useState<string[]>([]);
  const [seeDetail, setSeeDetail] = useState<any>({
    gender: false,
    country: false,
    age: false,
  });

  const animations = useRef<any>({
    gender: new Animated.Value(0),
    country: new Animated.Value(0),
    age: new Animated.Value(0),
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

  const nameList = useMemo(() => {
    return ['gender', 'country', 'age'];
  }, []);
  const descriptionList = useMemo((): any => {
    return {
      gender: `We may collect optional information about your gender, which may include "Male", "Female", or "None".

Purpose of collection:
- To better understand our user demographics.
- To improve our services and user experience through analytics.
- To ensure diversity and inclusion in our design and content decisions.

Your choices:
- Providing gender information is completely optional.
- You may choose "None" or opt not to provide this data at all.
- You can request to access, update, or delete your gender information at any time by contacting us.`,
      country: `We may collect and use information about your location:

We may collect location data via your device's IP address, Wi-Fi, or other technologies.

To provide location-based services, enhance user experience, improve our services, and for analytics purposes.

We do not share your precise location data with third parties without your explicit consent, except as required by law or to provide services you have requested.`,
      age: `Age Data Collection
We may collect your age as part of the registration process, and this information is used to tailor content, ads, and other services to better suit your preferences. Specifically, we may collect:

Age Range: For analytics purposes, we may ask for your age or an age range to better understand the demographic composition of our users. This helps us to improve the user experience and deliver content that aligns with your interests.

Personalized Content and Ads: Based on your age, we may personalize the content and advertisements you see within the app. This ensures that you are presented with relevant information, promotions, and recommendations.
      
How We Use Your Age Information
Analytics: Your age data may be used in aggregate to generate reports for internal analysis. This helps us improve the app and ensure it meets the needs of all users.

User Experience: By knowing your age or age group, we can customize app features, content, and ads to provide a more engaging experience tailored to your interests.
      
Data Security:
We take the privacy and security of your personal information seriously. Any data, including your age, is stored securely and will not be shared with third parties without your explicit consent, except as required by law.
      
Your Rights:
You have the right to update or delete any personal information you have shared with us, including age data. If you no longer wish to provide this data, you can update your profile settings within the app.
      `,
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
      setCheckList(['gender', 'country', 'age']);
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
      checkList.includes('gender') &&
      checkList.includes('country') &&
      checkList.includes('age') &&
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
      gender: 330,
      country: 220,
      age: 740,
    };
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
                        <Text style={{ marginLeft: 5 }}>
                          Agree All Terms of Use
                        </Text>
                      </View>
                      <Text style={{ marginLeft: 35 }}>
                        Full consent means consent to all information provided
                        by individual P4U
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
                        {`[Mandatory] Google/Apple`}
                        {'\n'}
                        {`Third party consent to personal information`}
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
                      <Text>{`[Mandatory] User Provided information\n`}</Text>
                      <Text>{`User can report improper question or comment. The user who reported by 3 people will be block account as abuse user.`}</Text>
                      {nameList.map((item: string) => (
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
                            <Text>{item}</Text>
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
                                See detail
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <Animated.View
                            style={{
                              height: animations[item].interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, InterpolateValue[item]], // adjust height based on your content
                              }),
                            }}
                          >
                            <Text style={{ flexShrink: 1 }}>
                              {descriptionList[item]}
                            </Text>
                          </Animated.View>
                        </View>
                      ))}
                      <Text
                        style={{ marginTop: 15 }}
                      >{`User also can delete its account. After deletion, all question and comment will be deleted too.`}</Text>
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
                    Agree to continue
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

export default LoginPage;
