import React, { useState, useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';
import SettingCommonHeader from 'components/SettingCommonHeader';
import { SearchBar } from '@rneui/themed';
import { CommonHeaderStyle } from 'screens/settings/style';
import { useSelector } from 'react-redux';
import LanguageButton from 'components/LanguageButton';

const LanguageScreen = ({ route, navigation }: any): React.JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const language = useSelector((state: any) => state.config.language);
  const [filteredLanguage, setFilteredLanguage] = useState([]);
  const [selected, setSelected] = useState<string>(language);
  const { title } = route.params;
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const handleChange = (text: any) => {
    setSearch(text);
  };
  const chooseButton = useCallback(
    (name: string) => {
      setSelected(name);
    },
    [selected]
  );
  const LanguageList: any = [
    { name: 'us', title: 'English' },
    // {name: 'es', title: 'Español'},
    // {name: 'kr', title: '한국어'},
    // {name: 'jp', title: '日本語'},
    // {name: 'cn', title: '中國語'},
  ];

  useEffect(() => {
    setFilteredLanguage(
      LanguageList.filter((lan: any) => lan.title.includes(search))
    );
  }, [search]);

  return (
    <SettingCommonHeader title={title} navigation={navigation}>
      <View style={CommonHeaderStyle.Container}>
        <Text style={CommonHeaderStyle.ContainerText}>Language</Text>
        <SearchBar
          round
          placeholder="Search"
          cancelButtonTitle="Cancel"
          containerStyle={{
            backgroundColor: '#0000',
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}
          inputContainerStyle={{
            display: 'flex',
            height: 40,
            backgroundColor: isDarkMode ? '#4e4f52' : 'white',
          }}
          onChangeText={handleChange}
          value={search}
        />
        {filteredLanguage.map((language: any) => (
          <LanguageButton
            key={language.name}
            title={language.title}
            name={language.name}
            selected={selected}
            chooseButton={chooseButton}
          />
        ))}
      </View>
    </SettingCommonHeader>
  );
};

export default React.memo(LanguageScreen);
