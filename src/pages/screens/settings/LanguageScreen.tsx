import React, { useState, useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';
import SettingCommonHeader from 'components/SettingCommonHeader';
import { SearchBar } from '@rneui/themed';
import { CommonHeaderStyle } from 'screens/settings/style';
import { useSelector } from 'react-redux';
import LanguageButton from 'components/LanguageButton';
import { useTranslation } from 'react-i18next';

const LanguageScreen = ({ route, navigation }: any): React.JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const { t, i18n } = useTranslation();
  const [filteredLanguage, setFilteredLanguage] = useState([]);
  const [selected, setSelected] = useState<string>(i18n.language);
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
    { name: 'us', title: 'English', language: 'en' },
    { name: 'es', title: 'Español', language: 'es' },
    { name: 'kr', title: '한국어', language: 'ko' },
    { name: 'jp', title: '日本語', language: 'ja' },
    { name: 'cn', title: '中國語', language: 'zh' },
    { name: 'vn', title: 'Tiếng Việt', language: 'vn' },
  ];

  useEffect(() => {
    setFilteredLanguage(
      LanguageList.filter((lan: any) => lan.title.includes(search))
    );
  }, [search]);

  return (
    <SettingCommonHeader title={t('Languages')} navigation={navigation}>
      <View style={CommonHeaderStyle.Container}>
        <Text style={CommonHeaderStyle.ContainerText}>{t('Languages')}</Text>
        <SearchBar
          round
          placeholder={t('Search')}
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
            chooseButton={() => chooseButton(language.language)}
            language={language.language}
          />
        ))}
      </View>
    </SettingCommonHeader>
  );
};

export default React.memo(LanguageScreen);
