import React from 'react';
import {TouchableOpacity, View, Text, useColorScheme} from 'react-native';
import {ThemeButtonStyle} from 'style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import store from 'reducers/index';
import {setDarkMode} from 'reducers/userSlice';
import {setMode} from 'reducers/configSlice';

const ThemeButton = ({
  name,
  title,
  description = '',
  selected,
  chooseButton,
}: any): React.JSX.Element => {
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const systemMode = useColorScheme() === 'dark';
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
        ...ThemeButtonStyle.Container,
        borderBottomColor: isDarkMode ? 'white' : '#222428',
      }}>
      <TouchableOpacity
        style={{
          ...ThemeButtonStyle.TouchableOpacity,
          borderBottomColor: isDarkMode ? 'white' : '#222428',
        }}
        onPress={() => {
          chooseButton(title), handleTheme(title);
        }}>
        <View style={ThemeButtonStyle.IconContainer}>
          <Ionicons
            name={name}
            size={40}
            style={{color: isDarkMode ? 'white' : '#222428'}}
          />
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

export default React.memo(ThemeButton);
