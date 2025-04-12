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

const UserDetailScreen = ({ route, navigation }: any): React.JSX.Element => {
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
  const GenderColor = (gender: string) => {
    if (gender === 'male') return '#7dc9e0';
    else if (gender === 'female') return '#ee92ba';
    return 'gray';
  };
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
          style={{ marginLeft: 20, position: 'absolute', left: 0 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={30} />
        </TouchableOpacity>
        <Text style={UserPageStyle.SafeAreaText}>Profile</Text>
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
        <Text style={UserPageStyle.Text}>User Information</Text>
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
              <View style={UserPageStyle.TextContainer}>
                {/* Email will be shown only for owner */}
                <Text
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
                </Text>
              </View>
              <View style={UserPageStyle.TextContainer}>
                <Text
                  style={{
                    ...UserPageStyle.UserText,
                    color: isDarkMode ? 'white' : '#222428',
                  }}
                >
                  I'm From
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
                  I'm <Text style={{ color: '#79699a' }}>{userData?.age}</Text>{' '}
                  old{' '}
                  <Text style={{ color: GenderColor(userData?.gender) }}>
                    {userData?.gender.at(0).toUpperCase() +
                      userData?.gender.slice(1)}
                  </Text>{' '}
                  <Text style={{ color: '#9a7969' }}>
                    {userData?.occupation.at(0).toUpperCase() +
                      userData?.occupation.slice(1)}
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
                  About Me
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
        <Text style={UserPageStyle.Text}>Written Questions</Text>
        <View style={UserPageStyle.WrittenQuestionList}>
          <FlatList
            horizontal
            data={userData?.writtenQuestions}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Text style={UserPageStyle.Text}>Commented Questions</Text>
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
