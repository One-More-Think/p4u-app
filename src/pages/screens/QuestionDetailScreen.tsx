import React, { useEffect, useState, useCallback, useRef } from 'react';
import { MenuView } from '@react-native-menu/menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import { Input } from '@rneui/themed';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  RefreshControl,
} from 'react-native';
import Common from 'components/Common';
import { useSelector } from 'react-redux';
import { QuestionDetailStyle } from 'style';
import ChooseBox from 'components/ChooseBox';
import FilterBox from 'components/FilterBox';
import Chart from 'components/Chart';
import UserBox from 'components/UserBox';
import QuestionComment from 'components/QuestionComment';

const QuestionDetailScreen = ({
  route,
  navigation,
}: any): React.JSX.Element => {
  const { data } = route.params;
  const title = data?.title || '';
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');
  const [filtered, setFiltered] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const [search, setSeacrh] = useState<string>('');

  const filterList = ['Country', 'Gender', 'Age'];
  const MockData = {
    content: `I graduated in BCIT school but I can not find a job for a long time I don't know what should I do give let me know If I need to go school for master or keep it up for job hunting?`,
    choose: ['Go to get master degree', 'Keep it up', 'Find antoher job'],
    category: 'school', //home-sharp, fast-food, heart
    timeout: false,
    comments: [
      {
        id: 1,
        country: 'cn',
        gender: 'female',
        age: 24,
        occupation: 'professor',
        comment: `I think it's better to go school again`,
        timestamp: '10/26 03:40',
        like: 3,
      },
      {
        id: 2,
        country: 'ca',
        gender: 'male',
        age: 22,
        occupation: 'none',
        comment: `Just do what ever you like`,
        timestamp: '11/26 10:20',
        like: 5,
      },
    ],
  };

  const handleChange = (text: string) => {
    setSeacrh(text);
  };
  const bannerRef = useRef<BannerAd>(null);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const onSelect = useCallback(
    (question: any) => {
      setSelected(question);
    },
    [selected]
  );
  const onFilter = useCallback(
    (filter: any) => {
      setFiltered(filter);
    },
    [filtered]
  );
  const onCheck = useCallback(() => {
    setChecked(!checked);
  }, [checked]);
  const GenderColor = (gender: string) => {
    if (gender === 'male') return '#7dc9e0';
    else if (gender === 'female') return '#ee92ba';
    return 'gray';
  };
  useEffect(() => {
    const refreshMainPage = async () => {
      try {
        await new Promise((resolve: any) =>
          setTimeout(() => {
            console.log('refresh Question Detail page');
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
    // dispatch to get the information about the Questions
    // the
  }, []);

  return (
    <Common>
      <SafeAreaView style={QuestionDetailStyle.SafeArea}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? '#222428' : 'white'}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 10 }}
        >
          <Ionicons name="chevron-back" size={40} color="#222428" />
        </TouchableOpacity>
        <Text style={QuestionDetailStyle.SafeAreaText}>Contents</Text>
        <View>
          <MenuView
            title="Options"
            onPressAction={({ nativeEvent }) => {
              console.log(JSON.stringify(nativeEvent));
            }}
            actions={[
              {
                id: 'edit', // only when the writerId is same as userId
                title: 'Edit',
                titleColor: '#2367A2',
                image: Platform.select({
                  ios: 'pencil',
                  android: 'ic_menu_pencil',
                }),
                imageColor: '#2367A2',
              },
              {
                id: 'share',
                title: 'Share',
                titleColor: '#46F289',
                image: Platform.select({
                  ios: 'square.and.arrow.up',
                  android: 'ic_menu_share',
                }),
                imageColor: '#46F289',
              },
              {
                id: 'delete', // writer == user if not only
                title: 'Delete', // Report
                attributes: {
                  destructive: true,
                },
                image: Platform.select({
                  ios: 'trash', // bell
                  android: 'ic_menu_delete',
                }),
              },
            ]}
            shouldOpenOnLongPress={false}
          >
            <TouchableOpacity style={{ marginRight: 10 }}>
              <Ionicons name="ellipsis-vertical" size={30} color="#222428" />
            </TouchableOpacity>
          </MenuView>
        </View>
      </SafeAreaView>
      <BannerAd
        ref={bannerRef}
        unitId={TestIds.BANNER}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
      <ScrollView
        style={{ width: '100%' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="black"
          />
        }
      >
        <View style={QuestionDetailStyle.Container}>
          <View style={QuestionDetailStyle.HeaderBox}>
            <UserBox data={data} />
            <View style={QuestionDetailStyle.CategoryBox}>
              <Ionicons name={MockData.category} size={35} color="#222428" />
            </View>
          </View>
          <Text
            style={{
              ...QuestionDetailStyle.Title,
              color: '#222428',
            }}
          >
            {title}
          </Text>
          <Text style={QuestionDetailStyle.Content}>{MockData.content}</Text>
          <View style={QuestionDetailStyle.ChooseBox}>
            {MockData.choose.map((question, idx) => (
              <ChooseBox
                question={`A${idx + 1}. ${question}`}
                key={`${idx}-choosebox`}
                onSelect={onSelect}
                selected={selected}
              />
            ))}
          </View>
          <View style={QuestionDetailStyle.CommentContainer}>
            {MockData.comments.map((data: any, idx) => (
              <QuestionComment key={`${idx}-userbox`} data={data} />
            ))}
          </View>
          {MockData.timeout && (
            <View style={QuestionDetailStyle.BottomBox}>
              <View style={QuestionDetailStyle.FilterBox}>
                {filterList.map((filter) => (
                  <FilterBox
                    key={`${filter}-filterBox`}
                    title={filter}
                    onFilter={onFilter}
                    filtered={filtered}
                  />
                ))}
              </View>
              {filtered && (
                <View style={QuestionDetailStyle.ChartBox}>
                  <Chart data={''} filtered={filtered} />
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      <SafeAreaView style={{ width: '100%' }}>
        <Input
          placeholder="Comment"
          placeholderTextColor={isDarkMode ? 'white' : '#222428'}
          rightIcon={
            <TouchableOpacity style={{ marginRight: 10 }}>
              <Ionicons
                name="paper-plane-outline"
                size={25}
                color={isDarkMode ? 'white' : '#222428'}
              />
            </TouchableOpacity>
          }
          containerStyle={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          inputContainerStyle={{
            borderWidth: 0,
            borderRadius: 25,
            backgroundColor: isDarkMode ? '#222428' : 'white',
          }}
          inputStyle={{
            marginLeft: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isDarkMode ? 'white' : '#222428',
          }}
        />
      </SafeAreaView>
    </Common>
  );
};

export default React.memo(QuestionDetailScreen);
