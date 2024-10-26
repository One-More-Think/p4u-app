import React, {useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Common from 'components/Common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountryFlag from 'components/CountryFlag';
import {UserPageStyle} from 'style';
import {useSelector} from 'react-redux';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import CommentBox from 'components/CommentBox';
const UserPage = ({route, navigation}: any): React.JSX.Element => {
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const MockData = [
    {
      id: '11',
      country: 'kr',
      age: 23,
      gender: 'male',
      occupation: 'programmer',
      title: 'This is serious problem',
    },
    {
      id: '12',
      country: 'jp',
      age: 21,
      gender: 'female',
      occupation: 'teacher',
      title: 'This is serious problem',
    },
    {
      id: '13',
      country: 'kr',
      age: 25,
      gender: 'male',
      occupation: 'none',
      title: 'This is serious problem',
    },
  ];
  useEffect(() => {
    // dispatch
  }, []);
  const GenderColor = (gender: string) => {
    if (gender === 'male') return '#7dc9e0';
    else if (gender === 'female') return '#ee92ba';
    return 'gray';
  };
  return (
    <Common>
      <SafeAreaView style={UserPageStyle.SafeArea}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? '#222428' : 'white'}
        />
        <Text style={UserPageStyle.SafeAreaText}>Profile</Text>
        <TouchableOpacity
          style={{position: 'absolute', right: 0, marginRight: 20}}
          onPress={() => navigation.navigate('SettingPage')}>
          <Ionicons name="settings" size={30} />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={{display: 'flex', marginTop: 16}}>
        <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
      </View>
      <View style={UserPageStyle.Container}>
        <Text style={UserPageStyle.Text}>User Information</Text>
        <View
          style={{
            ...UserPageStyle.UserInfoBox,
            backgroundColor: isDarkMode ? '#222428' : 'white',
          }}>
          <View style={UserPageStyle.UserInnerBox}>
            <View style={UserPageStyle.TextContainer}>
              {/* Email will be shown only for owner */}
              <Text
                style={{
                  ...UserPageStyle.UserText,
                  color: isDarkMode ? 'white' : '#222428',
                }}>
                Email:
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  color: isDarkMode ? 'white' : '#222428',
                }}>
                {userInfo.email}
              </Text>
            </View>
            <View style={UserPageStyle.TextContainer}>
              <Text
                style={{
                  ...UserPageStyle.UserText,
                  color: isDarkMode ? 'white' : '#222428',
                }}>
                I'm From
              </Text>
              <CountryFlag
                isoCode={userInfo.country}
                size={20}
                style={{marginLeft: 10, borderWidth: 0.5, borderColor: 'black'}}
              />
            </View>
            <View style={UserPageStyle.TextContainer}>
              <Text
                style={{
                  ...UserPageStyle.UserText,
                  color: isDarkMode ? 'white' : '#222428',
                }}>
                I'm <Text style={{color: '#79699a'}}>{userInfo.age}</Text> old{' '}
                <Text style={{color: GenderColor(userInfo.gender)}}>
                  {userInfo.gender.at(0).toUpperCase() +
                    userInfo.gender.slice(1)}
                </Text>{' '}
                <Text style={{color: '#9a7969'}}>
                  {userInfo.occupation.at(0).toUpperCase() +
                    userInfo.occupation.slice(1)}
                </Text>
              </Text>
            </View>
            <View
              style={{...UserPageStyle.TextContainer, flexDirection: 'column'}}>
              <Text
                style={{
                  ...UserPageStyle.UserText,
                  color: isDarkMode ? 'white' : '#222428',
                }}>
                About Me
              </Text>
              <Text
                style={{
                  marginTop: 5,
                  color: isDarkMode ? 'white' : '#222428',
                  flexWrap: 'wrap',
                }}>
                {userInfo.aboutme}
              </Text>
            </View>
          </View>
        </View>
        <Text style={UserPageStyle.Text}>Written Questions</Text>
        <View style={UserPageStyle.WrittenQuestionList}>
          <FlatList
            horizontal
            data={MockData}
            renderItem={({item}) => <CommentBox data={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Text style={UserPageStyle.Text}>Commented Questions</Text>
        <View style={UserPageStyle.CommentedQuestionList}>
          <FlatList
            horizontal
            data={MockData}
            renderItem={({item}) => <CommentBox data={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </Common>
  );
};

export default React.memo(UserPage);
