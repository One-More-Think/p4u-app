import Common from 'components/Common';
import React, {useState, useCallback, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {SearchScreenStyle} from 'style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchBar} from '@rneui/themed';
import {BannerAd, TestIds, BannerAdSize} from 'react-native-google-mobile-ads';
import Question from 'components/Question';

const SearhScreen = ({navigation}: any): React.JSX.Element => {
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const renderItem = useCallback(
    ({item}: any) => (
      <Question
        navigation={navigation}
        country={item.country}
        gender={item.gender}
        age={item.age}
        occupation={item.occupation}
        title={item.title}
        timestamp={item.timestamp}
        id={item.id}
        search
      />
    ),
    [search],
  );
  const handleSearch = useCallback(
    (text: string) => {
      setSearch(text);
    },
    [search],
  );
  const handleSubmit = useCallback(() => {
    // dispatch to call the data list
  }, [search]);
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
  ];
  return (
    <Common>
      <SafeAreaView style={SearchScreenStyle.SafeArea}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? '#222428' : 'white'}
        />
        <Text style={SearchScreenStyle.SafeAreaText}>Search</Text>
        <TouchableOpacity
          style={{position: 'absolute', left: 0, marginLeft: 20}}
          onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={30} color="gray" />
        </TouchableOpacity>
      </SafeAreaView>
      <SearchBar
        round
        placeholder="Search"
        cancelButtonTitle="Cancel"
        containerStyle={{
          backgroundColor: '#0000',
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
        inputContainerStyle={{
          display: 'flex',
          height: 40,
          backgroundColor: isDarkMode ? '#4e4f52' : 'white',
          width: '100%',
        }}
        onChangeText={text => handleSearch(text)}
        onSubmitEditing={handleSubmit}
        value={search}
      />
      <FlatList
        style={{width: '100%', marginBottom: 50}}
        showsVerticalScrollIndicator={false}
        data={MockData}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        scrollEventThrottle={16}
        ListHeaderComponent={
          <BannerAd
            unitId={TestIds.BANNER}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          />
        }
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="small" /> : null
        }
      />
    </Common>
  );
};

export default SearhScreen;
