import React, { useEffect, useMemo, useState, PropsWithChildren } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UserBoxStyle } from 'style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountryFlag from 'components/CountryFlag';
import { useNavigation } from '@react-navigation/native';
import CountdownTimer from 'components/CountdownTimer';

type UserBoxProps = PropsWithChildren<{
  data: any;
  timestamp: any;
  timeout: number;
}>;

const UserBox = ({
  data,
  timestamp,
  timeout,
}: UserBoxProps): React.JSX.Element => {
  const navigation: any = useNavigation();
  const { country, gender, age, occupation, writerId } = data;
  const GenderColor = (gender: string) => {
    if (gender === 'male') return '#7dc9e0';
    else if (gender === 'female') return '#ee92ba';
    return 'gray';
  };
  return (
    <TouchableOpacity
      style={{
        ...UserBoxStyle.HeaderBox,
        width: '100%',
      }}
      onPress={() =>
        navigation.navigate('UserDetailScreen', { userId: writerId })
      }
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
                width: 90,
                textAlign: 'center',
              }}
            >
              {occupation}
            </Text>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text
            style={{
              ...UserBoxStyle.TimeStamp,
              fontSize: 12,
            }}
          >
            {timestamp}
          </Text>
          <CountdownTimer initialTime={timeout} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default React.memo(UserBox);
