import React from 'react';
import type {PropsWithChildren} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import {QuestionStyle} from 'style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
type QuestionProps = PropsWithChildren<{
  id: string;
  country: string;
  gender: string;
  age: number;
  occupation: string;
  description: string;
  navigation: any;
}>;
const Question = (props: QuestionProps): React.JSX.Element => {
  const dispatch = useDispatch();
  const {
    id,
    country = 'ca',
    gender = 'none',
    age = 0,
    occupation = 'none',
    description = '',
    navigation,
  } = props;
  const data = {
    id,
    country,
    gender,
    age,
    occupation,
    description,
  };
  const GenderColor = (gender: string) => {
    if (gender === 'male') return '#7dc9e0';
    else if (gender === 'female') return '#ee92ba';
    return 'gray';
  };
  const handleQuestion = async () => {
    // const data = dispatch({});
    navigation.navigate('QuestionDetailScreen', {data});
  };
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  return (
    <TouchableOpacity
      style={{
        ...QuestionStyle.Container,
        backgroundColor: isDarkMode ? '#222428' : 'white',
      }}
      onPress={handleQuestion}>
      <View style={QuestionStyle.IconContainer}>
        <View style={{...QuestionStyle.flagContainer, width: '30%'}}>
          <CountryFlag isoCode={country} size={25} style={{borderWidth: 0.5}} />
        </View>
        <View
          style={{
            width: '10%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name={gender} color={GenderColor(gender)} size={23} />
        </View>
        <View style={{...QuestionStyle.TopIconWrapper, width: '20%'}}>
          <Ionicons
            name="accessibility"
            size={20}
            color={isDarkMode ? 'white' : '#222428'}
          />
          <Text
            style={{
              ...QuestionStyle.IconTextContainer,
              color: isDarkMode ? 'white' : '#222428',
            }}>
            {age}
          </Text>
        </View>
        <View style={{...QuestionStyle.TopIconWrapper, width: '40%'}}>
          <Ionicons name="bag" size={20} color="#9a7969" />
          <Text
            style={{
              ...QuestionStyle.IconTextContainer,
              color: isDarkMode ? 'white' : '#222428',
            }}>
            {occupation}
          </Text>
        </View>
      </View>
      <Text
        style={{
          ...QuestionStyle.TextContainer,
          color: isDarkMode ? 'white' : '#222428',
        }}
        ellipsizeMode="tail"
        numberOfLines={1}>
        {description}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(Question);
