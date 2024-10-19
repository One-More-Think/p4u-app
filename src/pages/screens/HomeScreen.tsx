import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Common from 'components/Common';
import {useDispatch, useSelector} from 'react-redux';
import {HomeScreenStyle} from 'style';
import Question from 'components/Question';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MenuView} from '@react-native-menu/menu';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const HomeScreen = ({navigation}: any): React.JSX.Element => {
  const dispatch = useDispatch();
  const MockData = [
    {
      id: '1',
      country: 'kr',
      gender: 'male',
      age: 27,
      occupation: 'programmer',
      description: 'I have a question something about my career',
    },
    {
      id: '2',
      country: 'de',
      gender: 'female',
      age: 21,
      occupation: 'teacher',
      description: 'Why my student does not like to do their',
    },
    {
      id: '3',
      country: 'jp',
      gender: 'male',
      age: 22,
      occupation: 'student',
      description: `I don't know what to eat for today's lunch please `,
    },
    {
      id: '4',
      country: 'ca',
      gender: 'female',
      age: 24,
      occupation: 'none',
      description: 'Canada rent fee is getting higher',
    },
    {
      id: '5',
      country: 'ca',
      gender: 'female',
      age: 24,
      occupation: 'none',
      description: 'Canada rent fee is getting higher',
    },
    {
      id: '6',
      country: 'ca',
      gender: 'female',
      age: 24,
      occupation: 'none',
      description: 'Canada rent fee is getting higher',
    },
    {
      id: '7',
      country: 'ca',
      gender: 'female',
      age: 24,
      occupation: 'none',
      description: 'Canada rent fee is getting higher',
    },
    {
      id: '8',
      country: 'ca',
      gender: 'female',
      age: 24,
      occupation: 'none',
      description: 'Canada rent fee is getting higher',
    },
    {
      id: '9',
      country: 'ca',
      gender: 'female',
      age: 24,
      occupation: 'none',
      description: 'Canada rent fee is getting higher',
    },
    {
      id: '10',
      country: 'ca',
      gender: 'female',
      age: 24,
      occupation: 'none',
      description: 'Canada rent fee is getting higher',
    },
    {
      id: '11',
      country: 'ca',
      gender: 'female',
      age: 24,
      occupation: 'none',
      description: 'Canada rent fee is getting higher',
    },
  ];
  const [refreshing, setRefreshing] = useState(false);
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const onRefresh = () => {
    setRefreshing(true);
  };
  useEffect(() => {
    const refreshMainPage = async () => {
      try {
        await new Promise(resolve =>
          setTimeout(() => {
            console.log('refresh main page');
            resolve();
          }, 1000),
        );
        console.log('refresh done');
        // dispatch to get list of problems
      } catch (err) {
        console.error('Error refreshing the page:', err);
      } finally {
        console.log('set refreshing');
        setRefreshing(false);
      }
    };
    if (refreshing) {
      refreshMainPage();
    }
  }, [refreshing]);
  useEffect(() => {
    // dispatch()
  }, [navigation]);
  return (
    <Common>
      <SafeAreaView style={HomeScreenStyle.SafeArea}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? '#222428' : 'white'}
        />
        <TouchableOpacity onPress={() => {}} style={{marginLeft: 15}}>
          <Ionicons name="search" size={30} color="#222428" />
        </TouchableOpacity>
        <Text style={HomeScreenStyle.SafeAreaText}>Forum</Text>
        <TouchableOpacity onPress={() => {}} style={{marginRight: 15}}>
          <Ionicons name="create-outline" size={30} color="#222428" />
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView
        style={HomeScreenStyle.ScrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="black"
          />
        }>
        <View style={HomeScreenStyle.Container}>
          <BannerAd
            unitId={TestIds.BANNER}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          />
          {MockData.map(map => (
            <Question
              navigation={navigation}
              country={map.country}
              gender={map.gender}
              age={map.age}
              occupation={map.occupation}
              description={map.description}
              key={map.id}
              id={map.id}
            />
          ))}
        </View>
      </ScrollView>
    </Common>
  );
};

export default React.memo(HomeScreen);
