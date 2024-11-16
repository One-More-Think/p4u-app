import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UserBoxStyle } from 'style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountryFlag from 'components/CountryFlag';
import store from 'reducers/index';
import { useNavigation } from '@react-navigation/native';
const QuestionComment = ({ data = null }: any): React.JSX.Element => {
  const navigation: any = useNavigation();
  const { country, gender, age, occupation, timestamp, comment, like } = data;
  const GenderColor = (gender: string) => {
    if (gender === 'male') return '#7dc9e0';
    else if (gender === 'female') return '#ee92ba';
    return 'gray';
  };
  const handleLikeComment = useCallback(() => {
    // store.dispatch()
  }, []);

  const handleReportComment = useCallback(() => {
    // store.dispatch()
  }, []);
  return (
    <View
      style={{
        borderBottomWidth: 0.2,
      }}
    >
      <TouchableOpacity
        style={{
          ...UserBoxStyle.HeaderBox,
          marginTop: 20,
        }}
        onPress={() => navigation.navigate('UserDetailScreen', { id: 7 })}
      >
        <CountryFlag
          isoCode={country}
          size={20}
          style={{ borderWidth: 0.5, borderColor: 'black' }}
        />

        <View style={UserBoxStyle.UserBox}>
          <View style={UserBoxStyle.InfoBox}>
            <View style={UserBoxStyle.IconWrapper}>
              <Ionicons name={gender} color={GenderColor(gender)} size={18} />
            </View>
            <View style={UserBoxStyle.IconWrapper}>
              <Ionicons name="accessibility" size={15} color="#222428" />
              <Text
                style={{
                  ...UserBoxStyle.IconText,
                  color: '#222428',
                  fontSize: 12,
                }}
              >
                {age}
              </Text>
            </View>
            <View style={UserBoxStyle.IconWrapper}>
              <Ionicons name="bag" size={13} color="#9a7969" />
              <Text
                style={{
                  ...UserBoxStyle.IconText,
                  color: '#222428',
                  fontSize: 10,
                }}
              >
                {occupation}
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                right: 0,
                width: '35%',
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TouchableOpacity onPress={handleLikeComment}>
                    <Ionicons
                      name="thumbs-up-sharp"
                      size={20}
                      color="#2a6096"
                    />
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>
                    {like}
                  </Text>
                </View>
                <TouchableOpacity onPress={handleReportComment}>
                  <Ionicons name="warning" size={20} color="#d73c3c" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text
            style={{
              ...UserBoxStyle.TimeStamp,
              fontSize: 9,
            }}
          >
            {timestamp}
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={{ fontFamily: 'Rubik', marginBottom: 10 }}>{comment}</Text>
    </View>
  );
};

export default React.memo(QuestionComment);
