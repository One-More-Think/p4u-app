import React from 'react';
import {TouchableOpacity, View, Text, useColorScheme} from 'react-native';
import {ThemeButtonStyle} from 'style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import store from 'reducers/index';
import {setLanguage} from 'reducers/configSlice';
import CountryFlag from 'react-native-country-flag';

const LanguageButton = ({
  name,
  title,
  description = '',
  selected,
  chooseButton,
}: any): React.JSX.Element => {
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const handleLanguage = (lan: any) => {
    store.dispatch(setLanguage(lan));
  };
  return (
    <View
      style={{
        ...ThemeButtonStyle.Container,
        borderBottomColor: isDarkMode ? 'white' : '#222428',
      }}>
      <TouchableOpacity
        style={{
          ...ThemeButtonStyle.TouchableOpacity,
          borderBottomColor: isDarkMode ? 'white' : '#222428',
        }}
        onPress={() => {
          chooseButton(title), handleLanguage(title);
        }}>
        <View style={ThemeButtonStyle.IconContainer}>
          <CountryFlag isoCode={name} size={40} />
          <View style={ThemeButtonStyle.IconTextWrapper}>
            <Text style={{color: isDarkMode ? 'white' : '#222428'}}>
              {title}
            </Text>
            {description && (
              <Text style={ThemeButtonStyle.DescriptionText}>
                {description}
              </Text>
            )}
          </View>
        </View>
        <View style={ThemeButtonStyle.RadioButton}>
          {selected === title ? (
            <Ionicons
              name="radio-button-on"
              size={30}
              style={{color: isDarkMode ? 'white' : '#222428'}}
            />
          ) : (
            <Ionicons
              name="radio-button-off"
              size={30}
              style={{color: isDarkMode ? 'white' : '#222428'}}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(LanguageButton);
