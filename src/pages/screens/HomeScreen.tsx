import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Common from 'components/Common';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSelector } from 'react-redux';
import { HomeScreenStyle } from 'style';
import Question from 'components/Question';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import FilterSheet from 'components/FilterSheet';
import store from 'reducers/index';
import { GetQuestions } from 'reducers/actions/UserAction';

const HomeScreen = ({ navigation }: any): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [endOfPage, isEndOfPage] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [data, setData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const onRefresh = () => {
    setRefreshing(true);
  };
  const fetchData: (current_page: number) => Promise<void> = useCallback(
    async (current_page: number): Promise<void> => {
      if (isLoading || endOfPage) return;
      setIsLoading(true);
      try {
        if (!endOfPage) {
          const questionList = await store.dispatch(GetQuestions(current_page));
          if (questionList.length === 10) setPage(current_page + 1);
          else isEndOfPage(true);
          current_page === 0
            ? setData(questionList)
            : setData((prevData) => [...prevData, ...questionList]);
        } else console.log('reached end of page');
      } catch (error: any) {
        console.error('error fetching data', error);
      } finally {
        setIsLoading(false);
      }
    },
    [endOfPage, page, isLoading]
  );

  const handlePresentModal = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleScroll: (event: any) => void = (event: any): void => {
    const contentHeight: any = event.nativeEvent.contentSize.height;
    const contentOffsetY: any = event.nativeEvent.contentOffset.y;
    const layoutHeight: any = event.nativeEvent.layoutMeasurement.height;

    if (contentHeight - contentOffsetY <= layoutHeight + 20) {
      fetchData(page);
    }
  };

  useEffect(() => {
    const refreshMainPage = async () => {
      try {
        await new Promise<void>((resolve) => {
          setTimeout(async () => {
            await fetchData(0);
            resolve();
          }, 500);
        });
      } catch (err) {
        console.error('Error refreshing the page:', err);
      } finally {
        setRefreshing(false);
        isEndOfPage(false);
      }
    };
    if (refreshing) refreshMainPage();
  }, [refreshing]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await fetchData(0);
    });
    return unsubscribe;
  }, [navigation]);

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
      <GestureHandlerRootView style={{ width: '100%', height: '100%' }}>
        <FlatList
          style={HomeScreenStyle.ScrollView}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item: any, index: number): any => index.toString()}
          onScroll={handleScroll}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="black"
            />
          }
          renderItem={({ item }) => {
            return (
              <Question
                isLoading={isLoading}
                navigation={navigation}
                country={item.writer.country}
                gender={item.writer.gender}
                age={item.writer.age}
                occupation={item.writer.occupation}
                title={item.title}
                writerId={item.writer.id}
                id={item.id}
                key={`${item.id}-${Date.now()}`}
              />
            );
          }}
          scrollEventThrottle={40}
          ListHeaderComponent={
            <View style={HomeScreenStyle.Container}>
              <BannerAd
                unitId={
                  Platform.OS === 'ios'
                    ? process.env.BANNER_IOS_UNIT_ID || ''
                    : process.env.BANNER_ANDROID_UNIT_ID || ''
                }
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              />
            </View>
          }
          ListFooterComponent={
            isLoading ? <ActivityIndicator animating size="large" /> : null
          }
        />
        <FilterSheet bottomSheetRef={bottomSheetRef} setData={setData} />
      </GestureHandlerRootView>
    </Common>
  );
};

export default React.memo(HomeScreen);
