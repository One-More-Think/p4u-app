import React from 'react';
import type {PropsWithChildren} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SettingBlockStyle} from 'style';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const SettingBlock = ({
  name,
  title,
  description = '',
  page = 'About',
}: any): React.JSX.Element => {
  const navigation = useNavigation();
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  return (
    <TouchableOpacity
      style={{
        ...SettingBlockStyle.Container,
        borderBottomColor: isDarkMode ? 'white' : '#222428',
      }}
      onPress={() => navigation.navigate(`${page}Screen`, {title})}>
      <View style={SettingBlockStyle.IconContainer}>
        <Ionicons
          name={name}
          size={30}
          color={isDarkMode ? 'white' : '#222428'}
        />
        <Text
          style={{
            ...SettingBlockStyle.IconText,
            color: isDarkMode ? 'white' : '#222428',
          }}>
          {title}
        </Text>
      </View>
      <Text style={SettingBlockStyle.Description}>{description}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(SettingBlock);
