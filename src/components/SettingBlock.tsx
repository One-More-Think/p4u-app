import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SettingBlockStyle } from 'style';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const SettingBlock = ({
  name = null,
  title,
  description = '',
  page = null,
  onPress = null,
  fontColor = null,
}: any): React.JSX.Element => {
  const navigation: any = useNavigation();
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }
    if (page) {
      navigation.navigate(`${page}Screen`, { title });
      return;
    }
  };
  return (
    <View
      style={{
        ...SettingBlockStyle.Container,
        borderBottomColor: isDarkMode ? 'white' : '#222428',
      }}
    >
      <TouchableOpacity
        disabled={!page && !onPress}
        style={SettingBlockStyle.TouchableOpacity}
        onPress={handlePress}
      >
        <View style={SettingBlockStyle.IconContainer}>
          {name && (
            <Ionicons
              name={name}
              size={30}
              color={isDarkMode ? 'white' : '#222428'}
            />
          )}
          <Text
            style={{
              ...SettingBlockStyle.IconText,
              color: fontColor ? fontColor : isDarkMode ? 'white' : '#222428',
              marginLeft: name ? 15 : 0,
            }}
          >
            {title}
          </Text>
        </View>
        <Text style={SettingBlockStyle.Description}>{description}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(SettingBlock);
