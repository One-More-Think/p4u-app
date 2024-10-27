import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {CommentBoxStyle} from 'style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import CountryFlag from 'components/CountryFlag';
import {useNavigation} from '@react-navigation/native';
import SkeletonBar from './SkeletonBar';
const CommentBox = ({data, isLoading}: any): React.JSX.Element => {
  const navigation: any = useNavigation();
  const {country, gender, age, title} = data;
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const GenderColor = (gender: string) => {
    if (gender === 'male') return '#7dc9e0';
    else if (gender === 'female') return '#ee92ba';
    return 'gray';
  };
  return isLoading ? (
    <SkeletonBar style={CommentBoxStyle.Container} />
  ) : (
    <TouchableOpacity
      style={{
        ...CommentBoxStyle.Container,
        backgroundColor: isDarkMode ? '#222428' : 'white',
      }}
      onPress={() => navigation.navigate('QuestionDetailScreen', {data})}>
      <View style={CommentBoxStyle.ViewContainer}>
        <View style={CommentBoxStyle.UserBox}>
          <CountryFlag
            isoCode={country}
            size={25}
            style={{borderWidth: 0.5, borderColor: 'black'}}
          />
          <Ionicons name={gender} size={20} color={GenderColor(gender)} />
          <Text
            style={{
              fontWeight: 'bold',
              color: isDarkMode ? 'white' : '#222428',
              fontSize: 20,
            }}>
            {age}
          </Text>
        </View>
        <Text
          ellipsizeMode="tail"
          numberOfLines={2}
          style={{
            ...CommentBoxStyle.Title,
            color: isDarkMode ? 'white' : '#222428',
            fontSize: 16,
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(CommentBox);
