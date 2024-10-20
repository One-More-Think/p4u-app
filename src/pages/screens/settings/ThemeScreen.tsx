import React, {useState, useCallback} from 'react';
import {Text, View, Button} from 'react-native';
import SettingCommonHeader from 'components/SettingCommonHeader';
import {CommonHeaderStyle} from './style';
import ThemeButton from 'components/ThemeButton';
import {useSelector} from 'react-redux';

const ThemeScreen = ({route, navigation}: any): React.JSX.Element => {
  const {title} = route.params;
  const selectedMode = useSelector((state: any) => state.config.mode);
  const [selected, setSelected] = useState<string>(selectedMode);
  const chooseButton = useCallback(
    (name: string) => {
      setSelected(name);
    },
    [selected],
  );
  const themeList = [
    {
      name: 'cog',
      title: 'System Mode',
      description: 'Automatically apply the mode from OS Settings',
    },
    {name: 'moon', title: 'Dark Mode'},
    {name: 'sunny', title: 'Light Mode'},
  ];
  return (
    <SettingCommonHeader title={title} navigation={navigation}>
      <View style={CommonHeaderStyle.Container}>
        <Text style={CommonHeaderStyle.ContainerText}>Default</Text>
        {themeList.map(theme => (
          <ThemeButton
            key={theme.title}
            name={theme.name}
            title={theme.title}
            description={theme.description}
            selected={selected}
            chooseButton={chooseButton}
          />
        ))}
      </View>
    </SettingCommonHeader>
  );
};

export default React.memo(ThemeScreen);
