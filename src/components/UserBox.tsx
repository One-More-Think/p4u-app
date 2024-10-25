import React from 'react';
import {View, Text} from 'react-native';
import {UserBoxStyle} from 'style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountryFlag from 'react-native-country-flag';
const UserBox = ({data = null, comment = null}: any): React.JSX.Element => {
  const {country, gender, age, occupation, timestamp} = data;
  const GenderColor = (gender: string) => {
    if (gender === 'male') return '#7dc9e0';
    else if (gender === 'female') return '#ee92ba';
    return 'gray';
  };
  return (
    <View
      style={{
        ...UserBoxStyle.HeaderBox,
        marginTop: comment ? 20 : 0,
      }}>
      <CountryFlag
        isoCode={country}
        size={comment ? 20 : 40}
        style={{borderWidth: 0.5}}
      />

      <View style={UserBoxStyle.UserBox}>
        <View style={UserBoxStyle.InfoBox}>
          <View style={UserBoxStyle.IconWrapper}>
            <Ionicons
              name={gender}
              color={GenderColor(gender)}
              size={comment ? 18 : 23}
            />
          </View>
          <View style={UserBoxStyle.IconWrapper}>
            <Ionicons
              name="accessibility"
              size={comment ? 15 : 20}
              color="#222428"
            />
            <Text
              style={{
                ...UserBoxStyle.IconText,
                color: '#222428',
                fontSize: comment ? 12 : 15,
              }}>
              {age}
            </Text>
          </View>
          <View style={UserBoxStyle.IconWrapper}>
            <Ionicons name="bag" size={comment ? 13 : 20} color="#9a7969" />
            <Text
              style={{
                ...UserBoxStyle.IconText,
                color: '#222428',
                fontSize: comment ? 10 : 14,
              }}>
              {occupation}
            </Text>
          </View>
        </View>
        <Text
          style={{
            ...UserBoxStyle.TimeStamp,
            fontSize: comment ? 9 : 12,
          }}>
          {timestamp}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(UserBox);
