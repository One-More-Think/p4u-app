import React from 'react';
import { View, Text } from 'react-native';
import { UserBoxStyle } from 'style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountryFlag from 'components/CountryFlag';
const UserBox = ({ data = null }: any): React.JSX.Element => {
  const { country, gender, age, occupation, timestamp } = data;
  const GenderColor = (gender: string) => {
    if (gender === 'male') return '#7dc9e0';
    else if (gender === 'female') return '#ee92ba';
    return 'gray';
  };
  return (
    <View
      style={{
        ...UserBoxStyle.HeaderBox,
      }}
    >
      <CountryFlag
        isoCode={country}
        size={40}
        style={{ borderWidth: 0.5, borderColor: 'black' }}
      />
      <View style={UserBoxStyle.UserBox}>
        <View style={UserBoxStyle.InfoBox}>
          <View style={UserBoxStyle.IconWrapper}>
            <Ionicons name={gender} color={GenderColor(gender)} size={23} />
          </View>
          <View style={UserBoxStyle.IconWrapper}>
            <Ionicons name="accessibility" size={20} color="#222428" />
            <Text
              style={{
                ...UserBoxStyle.IconText,
                color: '#222428',
                fontSize: 15,
              }}
            >
              {age}
            </Text>
          </View>
          <View style={UserBoxStyle.IconWrapper}>
            <Ionicons name="bag" size={20} color="#9a7969" />
            <Text
              style={{
                ...UserBoxStyle.IconText,
                color: '#222428',
                fontSize: 14,
              }}
            >
              {occupation}
            </Text>
          </View>
        </View>
        <Text
          style={{
            ...UserBoxStyle.TimeStamp,
            fontSize: 12,
          }}
        >
          {timestamp}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(UserBox);
