import React, { useCallback, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CountryFlag from 'components/CountryFlag';
import { QuestionStyle } from 'style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonBar from 'components/SkeletonBar';
type QuestionProps = PropsWithChildren<{
  id: string;
  country: string;
  gender: string;
  age: number;
  occupation: string;
  title: string;
  navigation: any;
  search?: boolean;
  isLoading?: boolean;
  writerId?: string;
}>;
const Question = (props: QuestionProps): React.JSX.Element => {
  const dispatch = useDispatch();
  const [popular, setPopular] = useState(false);
  const {
    id,
    country = 'ca',
    gender = 'none',
    age = 0,
    occupation = 'none',
    title = '',
    navigation,
    search = false,
    isLoading = false,
    writerId,
  } = props;

  const data = {
    id,
    country,
    gender,
    age,
    occupation,
    title,
    writerId,
  };

  const GenderColor = useCallback((gender: string) => {
    if (gender === 'male') return '#7dc9e0';
    else if (gender === 'female') return '#ee92ba';
    return 'gray';
  }, []);

  const handleQuestion = async () => {
    if (search) navigation.goBack();
    navigation.navigate('QuestionDetailScreen', { data });
  };
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  return isLoading ? (
    <>
      <SkeletonBar style={QuestionStyle.Container} />
    </>
  ) : (
    <TouchableOpacity
      style={{
        ...QuestionStyle.Container,
        alignSelf: 'center',
        backgroundColor: isDarkMode ? '#222428' : 'white',
      }}
      onPress={handleQuestion}
    >
      {popular && (
        <Ionicons
          name="flame-sharp"
          size={30}
          style={{
            position: 'absolute',
            top: -10,
            left: -10,
            color: '#e06666',
          }}
        />
      )}
      <View style={QuestionStyle.IconContainer}>
        <View style={{ ...QuestionStyle.flagContainer, width: '30%' }}>
          <CountryFlag
            isoCode={country}
            size={25}
            style={{ borderWidth: 0.5, borderColor: 'black' }}
          />
        </View>
        <View
          style={{
            width: '10%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons
            name={gender === 'none' ? 'remove' : gender}
            color={GenderColor(gender)}
            size={23}
          />
        </View>
        <View style={{ ...QuestionStyle.TopIconWrapper, width: '20%' }}>
          <Ionicons
            name="accessibility"
            size={20}
            color={isDarkMode ? 'white' : '#222428'}
          />
          <Text
            style={{
              ...QuestionStyle.IconTextContainer,
              color: isDarkMode ? 'white' : '#222428',
            }}
          >
            {age}
          </Text>
        </View>
        <View style={{ ...QuestionStyle.TopIconWrapper, width: '40%' }}>
          <Ionicons name="bag" size={20} color="#9a7969" />
          <Text
            style={{
              ...QuestionStyle.IconTextContainer,
              color: isDarkMode ? 'white' : '#222428',
            }}
          >
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
        numberOfLines={1}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(Question);
