import React, {useEffect, useState} from 'react';
import {MenuView} from '@react-native-menu/menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type {PropsWithChildren} from 'react';
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
import Common from '../../components/Common';
import {useSelector} from 'react-redux';
import {QuestionDetailStyle} from '../../style';
import CountryFlag from 'react-native-country-flag';
// show the detail about the result of pick and they can set the deadline and show the result of the result
// show ratio of gender and country and something specific industry
const QuestionDetailPage = ({route, navigation}: any): React.JSX.Element => {
  const {data} = route.params;
  const {country, gender, age, occupation, description} = data;
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
  };
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

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#222428' : 'white',
  };

  return (
    <Common>
      <SafeAreaView style={QuestionDetailStyle.SafeArea}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={40}
            color={isDarkMode ? 'white' : 'black'}
          />
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
            <TouchableOpacity>
              <Ionicons
                name="ellipsis-vertical"
                size={30}
                color={isDarkMode ? 'white' : 'black'}
              />
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
                  <Ionicons
                    name="accessibility"
                    size={20}
                    color={isDarkMode ? 'white' : '#222428'}
                  />
                  <Text
                    style={{
                      ...QuestionDetailStyle.IconText,
                      color: isDarkMode ? 'white' : '#222428',
                    }}>
                    {age}
                  </Text>
                </View>
                <View style={QuestionDetailStyle.IconWrapper}>
                  <Ionicons name="bag" size={20} color="#9a7969" />
                  <Text
                    style={{
                      ...QuestionDetailStyle.IconText,
                      color: isDarkMode ? 'white' : '#222428',
                    }}>
                    {occupation}
                  </Text>
                </View>
              </View>
              <Text style={QuestionDetailStyle.TimeStamp}>10/26 10:40</Text>
            </View>
            <View style={QuestionDetailStyle.CategoryBox}>
              <Ionicons name="bag" size={35} color="#9a7969" />
            </View>
          </View>
          <Text
            style={{
              ...QuestionDetailStyle.Title,
              color: isDarkMode ? 'white' : '#222428',
            }}>
            {description}
          </Text>
          <View style={QuestionDetailStyle.BottomBox}>
            <Text>TEST</Text>
          </View>
        </View>
      </ScrollView>
    </Common>
  );
};

export default React.memo(QuestionDetailPage);
