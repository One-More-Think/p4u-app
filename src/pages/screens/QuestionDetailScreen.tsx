import React, { useEffect, useState, useCallback, useRef } from 'react';
import { MenuView } from '@react-native-menu/menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CATEGORY_MAP from 'utils/category';
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
  Alert,
  Keyboard,
  Share,
} from 'react-native';
import Common from 'components/Common';
import { useSelector } from 'react-redux';
import { QuestionDetailStyle } from 'style';
import ChooseBox from 'components/ChooseBox';
import FilterBox from 'components/FilterBox';
import Chart from 'components/Chart';
import UserBox from 'components/UserBox';
import QuestionComment from 'components/QuestionComment';
import store from 'reducers/index';
import {
  DeleteQuestion,
  GetQuestionDetail,
  PostComment,
  ReportQuestion,
  SelectOption,
} from 'reducers/actions/UserAction';
import { useFocusEffect } from '@react-navigation/native';
import { setIsLoading } from 'reducers/configSlice';

const QuestionDetailScreen = ({
  route,
  navigation,
}: any): React.JSX.Element => {
  const { data } = route.params;
  const title = data?.title || '';
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const [detailInfo, setDetailInfo] = useState<any>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(-1);
  const [filtered, setFiltered] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const [search, setSeacrh] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    const getQuestionDetail = async () => {
      const details = await store.dispatch(GetQuestionDetail(data.id));
      data['timestamp'] = details?.createdAt.replace('T', ' ').slice(0, -5);
      setDetailInfo(details);
      details?.options.forEach((opt: any) => {
        if (opt.selectedUsers.length > 0) {
          opt.selectedUsers.forEach((sct: any) => {
            if (sct.userId === userInfo.id) setSelected(sct.optionId);
          });
        }
      });
    };
    if (detailInfo === null) {
      getQuestionDetail();
    }
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshMainPage();
    });

    return unsubscribe;
  }, [navigation]);

  const filterList = ['Country', 'Gender', 'Age'];

  const refreshMainPage = async () => {
    try {
      const detailInfo = await store.dispatch(GetQuestionDetail(data.id));
      detailInfo?.options.forEach((opt: any) => {
        if (opt.selectedUsers.length > 0) {
          opt.selectedUsers.forEach((sct: any) => {
            if (sct.userId === userInfo.id) setSelected(sct.optionId);
          });
        }
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setDetailInfo(detailInfo);
    } catch (err) {
      console.error('Error refreshing the page:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleChange = (text: string) => {
    setSeacrh(text);
  };

  const handleComment = async () => {
    await store.dispatch(PostComment(data.id, comment));
    refreshMainPage();
    setComment('');
  };

  const onComment = useCallback(
    (text: string) => {
      setComment(text);
    },
    [comment]
  );

  const bannerRef = useRef<BannerAd>(null);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const onSelect = useCallback(
    async (questionId: any, optionId: any) => {
      await store.dispatch(SelectOption(questionId, optionId));
      setSelected(optionId);
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
    if (refreshing) {
      refreshMainPage();
    }
  }, [refreshing, selected]);

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
            onPressAction={async ({ nativeEvent }) => {
              switch (JSON.parse(JSON.stringify(nativeEvent)).event) {
                case 'delete':
                  Alert.alert(
                    'Delete question',
                    'Are you sure to delete this question?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Ok',
                        style: 'destructive',
                        onPress: async () => {
                          await store.dispatch(DeleteQuestion(data.id)),
                            navigation.goBack();
                        },
                      },
                    ]
                  );
                  break;
                case 'edit':
                  navigation.navigate('EditQuestionScreen', {
                    data: {
                      id: data?.id,
                      title: data?.title,
                      description: detailInfo?.description,
                      options: detailInfo?.options,
                      category: detailInfo?.category,
                    },
                  });
                  break;
                case 'report':
                  Alert.alert(
                    'Report Question',
                    'Do you want to report this question?',
                    [
                      {
                        text: 'Cancel',
                        style: 'destructive',
                      },
                      {
                        text: 'OK',
                        onPress: async () =>
                          await store.dispatch(ReportQuestion(data.id)),
                      },
                    ]
                  );
                  break;
                  // case 'share':
                  //   const result = await Share.share({
                  //     title: 'App link',
                  //     message:
                  //       Platform.OS === 'android'
                  //         ? 'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en'
                  //         : 'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
                  //     url: 'itms-apps://apps.apple.com/id/app/younghoonyu/id1492671277?l=id',
                  //   });
                  break;
                default:
                  break;
              }
            }}
            actions={
              data.writerId === userInfo.id
                ? detailInfo && detailInfo?.timeout > Math.round(Date.now())
                  ? [
                      {
                        id: 'edit',
                        title: 'Edit',
                        titleColor: '#2367A2',
                        image: Platform.select({
                          ios: 'pencil',
                          android: 'ic_menu_pencil',
                        }),
                        imageColor: '#2367A2',
                      },
                      // {
                      //   id: 'share',
                      //   title: 'Share',
                      //   titleColor: '#46F289',
                      //   image: Platform.select({
                      //     ios: 'square.and.arrow.up',
                      //     android: 'ic_menu_share',
                      //   }),
                      //   imageColor: '#46F289',
                      // },
                      {
                        id: 'delete',
                        title: 'Delete',
                        attributes: {
                          destructive: true,
                        },
                        image: Platform.select({
                          ios: 'trash',
                          android: 'ic_menu_delete',
                        }),
                      },
                    ]
                  : [
                      // {
                      //   id: 'share',
                      //   title: 'Share',
                      //   titleColor: '#46F289',
                      //   image: Platform.select({
                      //     ios: 'square.and.arrow.up',
                      //     android: 'ic_menu_share',
                      //   }),
                      //   imageColor: '#46F289',
                      // },
                      {
                        id: 'delete',
                        title: 'Delete',
                        attributes: {
                          destructive: true,
                        },
                        image: Platform.select({
                          ios: 'trash',
                          android: 'ic_menu_delete',
                        }),
                      },
                    ]
                : [
                    // {
                    //   id: 'share',
                    //   title: 'Share',
                    //   titleColor: '#46F289',
                    //   image: Platform.select({
                    //     ios: 'square.and.arrow.up',
                    //     android: 'ic_menu_share',
                    //   }),
                    //   imageColor: '#46F289',
                    // },
                    {
                      id: 'report',
                      title: 'Report',
                      image: Platform.select({
                        ios: 'flag',
                        android: 'ic_menu_report_image',
                      }),
                      imageColor: 'red',
                    },
                  ]
            }
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
        unitId={
          Platform.OS === 'ios'
            ? process.env.BANNER_IOS_UNIT_ID || ''
            : process.env.BANNER_ANDROID_UNIT_ID || ''
        }
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
        {detailInfo && (
          <View style={QuestionDetailStyle.Container}>
            <View style={QuestionDetailStyle.HeaderBox}>
              <UserBox
                data={data}
                timeout={detailInfo?.timeout}
                timestamp={data.timestamp}
              />
              <View style={QuestionDetailStyle.CategoryBox}>
                <Ionicons
                  name={CATEGORY_MAP[detailInfo?.category]}
                  size={35}
                  color="#222428"
                />
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
            <Text style={QuestionDetailStyle.Content}>
              {detailInfo?.description}
            </Text>
            <View style={QuestionDetailStyle.ChooseBox}>
              {detailInfo?.options.map((option: any, idx: number) => (
                <ChooseBox
                  question={`A${idx + 1}. ${option?.context}`}
                  key={`${idx}-choosebox`}
                  onSelect={onSelect}
                  selected={selected}
                  disabled={
                    data.writerId === userInfo.id ||
                    detailInfo?.timeout >= Math.floor(Date.now()) / 1000
                  }
                  data={{
                    questionId: option?.questionId,
                    optionId: option?.id,
                  }}
                />
              ))}
            </View>
            <View style={QuestionDetailStyle.CommentContainer}>
              {detailInfo?.comments.map((data: any, idx: number) => (
                <QuestionComment
                  key={`${idx}-userbox`}
                  data={data}
                  timestamp={data.createdAt.replace('T', ' ').slice(0, -5)}
                  refreshMainPage={refreshMainPage}
                />
              ))}
            </View>
            {/* {MockData.timeout && (
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
          )} */}
          </View>
        )}
      </ScrollView>
      <SafeAreaView style={{ width: '100%' }}>
        <Input
          placeholder="Comment"
          placeholderTextColor={isDarkMode ? 'white' : '#222428'}
          rightIcon={
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={handleComment}
            >
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
            opacity: 0.4,
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
          value={comment}
          onChangeText={(text) => onComment(text)}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
      </SafeAreaView>
    </Common>
  );
};

export default React.memo(QuestionDetailScreen);
