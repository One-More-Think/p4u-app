import React, {useEffect, useState, useCallback, useRef} from 'react';
import {MenuView} from '@react-native-menu/menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
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
import {useSelector} from 'react-redux';
import {QuestionDetailStyle} from 'style';
import CountryFlag from 'react-native-country-flag';
import ChooseBox from 'components/ChooseBox';
import FilterBox from 'components/FilterBox';
import Chart from 'components/Chart';

const QuestionDetailScreen = ({route, navigation}: any): React.JSX.Element => {
  const {data} = route.params;
  const {country, gender, age, occupation, description} = data;
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');
  const [filtered, setFiltered] = useState<string>('');
  const filterList = ['Country', 'Gender', 'Age', 'Occupation'];
  const MockData = {
    content: `I graduated in BCIT school but I can not find a job for a long time I don't know what should I do give let me know If I need to go school for master or keep it up for job hunting?`,
    choose: ['Go to get master degree', 'Keep it up', 'Find antoher job'],
    category: 'home-sharp', //shcool, fast-food, heart
  };
  const bannerRef = useRef<BannerAd>(null);
  const onRefresh = () => {
    setRefreshing(true);
  };

  const onSelect = useCallback(
    (question: any) => {
      setSelected(question);
    },
    [selected],
  );
  const onFilter = useCallback(
    (filter: any) => {
      setFiltered(filter);
    },
    [filtered],
  );
  const GenderColor = (gender: string) => {
    if (gender === 'male') return '#7dc9e0';
    else if (gender === 'female') return '#ee92ba';
    return 'gray';
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
    // dispatch
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
          style={{marginLeft: 10}}>
          <Ionicons name="chevron-back" size={40} color="#222428" />
        </TouchableOpacity>
        <Text style={QuestionDetailStyle.SafeAreaText}>Contents</Text>
        <View>
          <MenuView
            title="Options"
            onPressAction={({nativeEvent}) => {
              console.log(JSON.stringify(nativeEvent));
            }}
            actions={[
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
            shouldOpenOnLongPress={false}>
            <TouchableOpacity style={{marginRight: 10}}>
              <Ionicons name="ellipsis-vertical" size={30} color="#222428" />
            </TouchableOpacity>
          </MenuView>
        </View>
      </SafeAreaView>
      <ScrollView
        style={{width: '100%'}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="black"
          />
        }>
        <View style={QuestionDetailStyle.Container}>
          <View style={QuestionDetailStyle.HeaderBox}>
            <CountryFlag
              isoCode={country}
              size={40}
              style={{borderWidth: 0.5}}
            />
            <View style={QuestionDetailStyle.UserBox}>
              <View style={QuestionDetailStyle.InfoBox}>
                <View style={QuestionDetailStyle.IconWrapper}>
                  <Ionicons
                    name={gender}
                    color={GenderColor(gender)}
                    size={23}
                  />
                </View>
                <View style={QuestionDetailStyle.IconWrapper}>
                  <Ionicons name="accessibility" size={20} color="#222428" />
                  <Text
                    style={{
                      ...QuestionDetailStyle.IconText,
                      color: '#222428',
                    }}>
                    {age}
                  </Text>
                </View>
                <View style={QuestionDetailStyle.IconWrapper}>
                  <Ionicons name="bag" size={20} color="#9a7969" />
                  <Text
                    style={{
                      ...QuestionDetailStyle.IconText,
                      color: '#222428',
                    }}>
                    {occupation}
                  </Text>
                </View>
              </View>
              <Text style={QuestionDetailStyle.TimeStamp}>10/26 10:40</Text>
            </View>
            <View style={QuestionDetailStyle.CategoryBox}>
              <Ionicons name={MockData.category} size={35} color="#222428" />
            </View>
          </View>
          <Text
            style={{
              ...QuestionDetailStyle.Title,
              color: '#222428',
            }}>
            {description}
          </Text>
          <Text style={QuestionDetailStyle.Content}>{MockData.content}</Text>
          <View style={QuestionDetailStyle.ChooseBox}>
            {MockData.choose.map((question, idx) => (
              <ChooseBox
                question={`A${idx + 1}. ${question}`}
                key={question}
                onSelect={onSelect}
                selected={selected}
              />
            ))}
          </View>
          {selected && (
            <View style={QuestionDetailStyle.BottomBox}>
              <View style={QuestionDetailStyle.FilterBox}>
                {filterList.map(filter => (
                  <FilterBox
                    key={filter}
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
      <SafeAreaView>
        <BannerAd
          ref={bannerRef}
          unitId={TestIds.BANNER}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
      </SafeAreaView>
    </Common>
  );
};

export default React.memo(QuestionDetailScreen);
