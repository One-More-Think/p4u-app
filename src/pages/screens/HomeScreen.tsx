import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Common from 'components/Common';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { HomeScreenStyle } from 'style';
import Question from 'components/Question';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import FilterSheet from 'components/FilterSheet';
import SkeletonBar from 'components/SkeletonBar';

const HomeScreen = ({ navigation }: any): React.JSX.Element => {
  const dispatch: any = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const nextPageIdentifierRef = useRef();
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(false);
  const LIMIT = 10;
  const bottomSheetRef = useRef<BottomSheet>(null);

  const MockData = [
    {
      id: '1',
      country: 'kr',
      gender: 'male',
      age: 27,
      occupation: 'programmer',
      title: 'I have a question something about my career',
      timestamp: '10/26 03:40',
    },
    {
      id: '2',
      country: 'de',
      gender: 'female',
      age: 21,
      occupation: 'teacher',
      title: 'Why my student does not like to do their',
      timestamp: '10/26 03:40',
    },
    {
      id: '3',
      country: 'jp',
      gender: 'male',
      age: 22,
      occupation: 'student',
      title: `I don't know what to eat for today's lunch please `,
      timestamp: '10/26 03:40',
    },
    {
      id: '4',
      country: 'ca',
      gender: 'female',
      age: 24,
      occupation: 'none',
      title: 'Canada rent fee is getting higher',
      timestamp: '10/26 03:40',
    },
    {
      id: '5',
      country: 'ca',
      gender: 'female',
      age: 24,
      occupation: 'none',
      title: 'Canada rent fee is getting higher',
      timestamp: '10/26 03:40',
    },
    {
      id: '6',
      country: 'ca',
      gender: 'female',
      age: 24,
      occupation: 'none',
      title: 'Canada rent fee is getting higher',
      timestamp: '10/26 03:40',
    },
    {
      id: '7',
      country: 'ca',
      gender: 'female',
      age: 24,
      occupation: 'none',
      title: 'Canada rent fee is getting higher',
      timestamp: '10/26 03:40',
    },
    {
      id: '8',
      country: 'ca',
      gender: 'female',
      age: 24,
      occupation: 'none',
      title: 'Canada rent fee is getting higher',
      timestamp: '10/26 03:40',
    },
    {
      id: '9',
      country: 'ca',
      gender: 'female',
      age: 24,
      occupation: 'none',
      title: 'Canada rent fee is getting higher',
      timestamp: '10/26 03:40',
    },
    {
      id: '10',
      country: 'ca',
      gender: 'female',
      age: 24,
      occupation: 'none',
      title: 'Canada rent fee is getting higher',
      timestamp: '10/26 03:40',
    },
    {
      id: '11',
      country: 'ca',
      gender: 'female',
      age: 24,
      occupation: 'none',
      title: 'Canada rent fee is getting higher',
      timestamp: '10/26 03:40',
    },
  ];
  const [data, setData] = useState<any>(MockData);
  const [refreshing, setRefreshing] = useState(false);

  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const onRefresh = () => {
    setRefreshing(true);
  };
  const fetchData = async () => {
    // pagination implement
    setIsLoading(true);
    await new Promise((resolve: any) =>
      setTimeout(() => {
        console.log('refresh main page');
        resolve();
      }, 3000)
    );
    // await fecth data
    // const newData: any = data[Math.round(Math.random() % data.length)];
    // console.log(Math.round(Math.random() % data.length));
    // console.log(data[Math.round(Math.random() % data.length)]);
    // newData['id'] = `unique-${Math.random().toString()}`;
    // console.log(newData);
    // setData([...data, newData]);
    // getDataFromApi(nextPageIdentifierRef.current).then(response => {
    // const {data: newData, nextPageIdentifier} = parseResponse(response);
    // setData([...data, newData]);
    //   nextPageIdentifierRef.current = nextPageIdentifier;
    !isFirstPageReceived && setIsFirstPageReceived(true);
    console.log('get data');
    setIsLoading(false);
    //   !isFirstPageReceived && setIsFirstPageReceived(true);
    // });
  };
  const fetchNextProblem = () => {
    // if (nextPageIdentifierRef.current == null) {
    //   // End of data.
    //   return;
    // }
    fetchData();
  };

  const handlePresentModal = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  useEffect(() => {
    const refreshMainPage = async () => {
      try {
        await new Promise((resolve: any) =>
          setTimeout(() => {
            console.log('refresh HomeScreen page');
            resolve();
          }, 1000)
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
    // fetchData();
  }, [navigation]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Common>
      <SafeAreaView style={HomeScreenStyle.SafeArea}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? '#222428' : 'white'}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchScreen')}
          style={{ marginLeft: 15 }}
        >
          <Ionicons name="search" size={30} color="#222428" />
        </TouchableOpacity>
        <Text style={HomeScreenStyle.SafeAreaText}>Forum</Text>
        <TouchableOpacity
          onPress={handlePresentModal}
          style={{ marginRight: 15 }}
        >
          <Ionicons name="filter" size={30} color="#222428" />
        </TouchableOpacity>
      </SafeAreaView>
      <GestureHandlerRootView style={{ width: '100%' }}>
        <FlatList
          style={HomeScreenStyle.ScrollView}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={fetchNextProblem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="black"
            />
          }
          renderItem={({ item }) => (
            <Question
              isLoading={isLoading}
              navigation={navigation}
              country={item.country}
              gender={item.gender}
              age={item.age}
              occupation={item.occupation}
              title={item.title}
              timestamp={item.timestamp}
              id={item.id}
            />
          )}
          scrollEventThrottle={16}
          ListHeaderComponent={
            <View style={HomeScreenStyle.Container}>
              <BannerAd
                unitId={TestIds.BANNER}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              />
            </View>
          }
          ListFooterComponent={
            isLoading ? <ActivityIndicator size="small" /> : null
          }
        />
        <FilterSheet bottomSheetRef={bottomSheetRef} />
      </GestureHandlerRootView>
    </Common>
  );
};

export default React.memo(HomeScreen);
