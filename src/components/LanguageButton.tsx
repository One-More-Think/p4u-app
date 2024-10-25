import React from 'react';
import {TouchableOpacity, View, Text, useColorScheme} from 'react-native';
import {RadioButtonStyle} from 'style';
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
        ...RadioButtonStyle.Container,
        borderBottomColor: isDarkMode ? 'white' : '#222428',
      }}>
      <TouchableOpacity
        style={{
          ...RadioButtonStyle.TouchableOpacity,
          borderBottomColor: isDarkMode ? 'white' : '#222428',
        }}
        onPress={() => {
          chooseButton(title), handleLanguage(title);
        }}>
        <View style={RadioButtonStyle.IconContainer}>
          <CountryFlag isoCode={name} size={40} style={{borderWidth: 0.5}} />
          <View style={RadioButtonStyle.IconTextWrapper}>
            <Text style={{color: isDarkMode ? 'white' : '#222428'}}>
              {title}
            </Text>
            {description && (
              <Text style={RadioButtonStyle.DescriptionText}>
                {description}
              </Text>
            )}
          </View>
        </View>
        <View style={RadioButtonStyle.RadioButton}>
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
