import React, { useState, useCallback } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import Common from 'components/Common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountryFlag from 'components/CountryFlag';
import { UserPageStyle } from 'style';
import { useSelector } from 'react-redux';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import CommentBox from 'components/CommentBox';
import SkeletonBar from 'components/SkeletonBar';
import store from 'reducers/index';
import { GetUserDetail } from 'reducers/actions/UserAction';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const UserDetailScreen = ({ route, navigation }: any): React.JSX.Element => {
  const { t } = useTranslation();
  const { userId } = route.params;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const [userData, setUserData] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      const getUserInfo = async () => {
        setIsLoading(true);
        const data = await store.dispatch(GetUserDetail(userId));
        setUserData(data);
      };
      getUserInfo();
      setIsLoading(false);
    }, [userId])
  );

  const renderItem = useCallback(
    ({ item }: any) => {
      return <CommentBox data={item} isLoading={isLoading} />;
    },
    [isLoading]
  );
  const GenderColor = useCallback((gender: string) => {
    if (gender === 'male') return '#7dc9e0';
    else if (gender === 'female') return '#ee92ba';
    return 'gray';
  }, []);
  return (
    <Common>
      <SafeAreaView
        style={{ ...UserPageStyle.SafeArea, justifyContent: 'center' }}
      >
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? '#222428' : 'white'}
        />
        <TouchableOpacity
          style={{ marginLeft: 10, position: 'absolute', left: 0 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={40} />
        </TouchableOpacity>
        <Text style={UserPageStyle.SafeAreaText}>{t('Profile')}</Text>
      </SafeAreaView>
      <View style={{ display: 'flex', marginTop: 16 }}>
        <BannerAd
          unitId={
            Platform.OS === 'ios'
              ? process.env.BANNER_IOS_UNIT_ID || ''
              : process.env.BANNER_ANDROID_UNIT_ID || ''
          }
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
      </View>
      <View style={UserPageStyle.Container}>
        <Text style={UserPageStyle.Text}>{t('User_Information')}</Text>
        {isLoading ? (
          <SkeletonBar style={UserPageStyle.UserInfoBox} />
        ) : (
          <View
            style={{
              ...UserPageStyle.UserInfoBox,
              backgroundColor: isDarkMode ? '#222428' : 'white',
            }}
          >
            <View style={UserPageStyle.UserInnerBox}>
              {/* <View style={UserPageStyle.TextContainer}> */}
              {/* Email will be shown only for owner */}
              {/* <Text
                  style={{
                    ...UserPageStyle.UserText,
                    color: isDarkMode ? 'white' : '#222428',
                  }}
                >
                  Email:
                </Text>
                <Text
                  style={{
                    marginLeft: 10,
                    color: isDarkMode ? 'white' : '#222428',
                  }}
                >
                  {userData?.email}
                </Text> */}
              {/* </View> */}
              <View style={UserPageStyle.TextContainer}>
                <Text
                  style={{
                    ...UserPageStyle.UserText,
                    color: isDarkMode ? 'white' : '#222428',
                  }}
                >
                  {t('Im_From')}
                </Text>
                <CountryFlag
                  isoCode={userData?.country}
                  size={20}
                  style={{
                    marginLeft: 10,
                    borderWidth: 0.5,
                    borderColor: 'black',
                  }}
                />
              </View>
              <View style={UserPageStyle.TextContainer}>
                <Text
                  style={{
                    ...UserPageStyle.UserText,
                    color: isDarkMode ? 'white' : '#222428',
                  }}
                >
                  {t('Im')}{' '}
                  <Text style={{ color: '#79699a' }}>{userData?.age}</Text>{' '}
                  {t('old')}{' '}
                  <Text style={{ color: GenderColor(userData?.gender) }}>
                    {t(
                      userData?.gender.at(0).toUpperCase() +
                        userData?.gender.slice(1)
                    )}
                  </Text>{' '}
                  <Text style={{ color: '#9a7969' }}>
                    {userData?.occupation
                      ? userData?.occupation.at(0).toUpperCase() +
                        userData?.occupation.slice(1)
                      : ''}
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  ...UserPageStyle.TextContainer,
                  flexDirection: 'column',
                }}
              >
                <Text
                  style={{
                    ...UserPageStyle.UserText,
                    color: isDarkMode ? 'white' : '#222428',
                  }}
                >
                  {t('About_Me')}
                </Text>
                <Text
                  style={{
                    marginTop: 5,
                    color: isDarkMode ? 'white' : '#222428',
                    flexWrap: 'wrap',
                  }}
                >
                  {userData?.aboutMe}
                </Text>
              </View>
            </View>
          </View>
        )}
        <Text style={UserPageStyle.Text}>{t('Written_Questions')}</Text>
        <View style={UserPageStyle.WrittenQuestionList}>
          <FlatList
            horizontal
            data={userData?.writtenQuestions}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Text style={UserPageStyle.Text}>{t('Commented_Questions')}</Text>
        <View style={UserPageStyle.CommentedQuestionList}>
          <FlatList
            horizontal
            data={userData?.commentedQuestions}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </Common>
  );
};

export default React.memo(UserDetailScreen);
