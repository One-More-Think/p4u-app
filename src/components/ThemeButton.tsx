import React from 'react';
import { TouchableOpacity, View, Text, useColorScheme } from 'react-native';
import { RadioButtonStyle } from 'style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import store from 'reducers/index';
import { setDarkMode } from 'reducers/userSlice';
import { setMode } from 'reducers/configSlice';
import { useTranslation } from 'react-i18next';

const ThemeButton = ({
  name,
  title,
  description = '',
  selected,
  chooseButton,
}: any): React.JSX.Element => {
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const systemMode = useColorScheme() === 'dark';
  const { t } = useTranslation();
  const handleTheme = (mode: any) => {
    let darkMode = true;
    switch (mode) {
      case 'System Mode':
        darkMode = systemMode;
        break;
      case 'Dark Mode':
        break;
      case 'Light Mode':
        darkMode = false;
        break;
      default:
        break;
    }
    store.dispatch(setDarkMode(darkMode));
    store.dispatch(setMode(mode));
  };
  return (
    <View
      style={{
        ...RadioButtonStyle.Container,
        borderBottomColor: isDarkMode ? 'white' : '#222428',
      }}
    >
      <TouchableOpacity
        style={{
          ...RadioButtonStyle.TouchableOpacity,
          borderBottomColor: isDarkMode ? 'white' : '#222428',
        }}
        onPress={() => {
          chooseButton(title), handleTheme(title);
        }}
      >
        <View style={RadioButtonStyle.IconContainer}>
          <Ionicons
            name={name}
            size={40}
            style={{ color: isDarkMode ? 'white' : '#222428' }}
          />
          <View style={RadioButtonStyle.IconTextWrapper}>
            <Text style={{ color: isDarkMode ? 'white' : '#222428' }}>
              {t(title)}
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
              style={{ color: isDarkMode ? 'white' : '#222428' }}
            />
          ) : (
            <Ionicons
              name="radio-button-off"
              size={30}
              style={{ color: isDarkMode ? 'white' : '#222428' }}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(ThemeButton);
