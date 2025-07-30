import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import SettingCommonHeader from 'components/SettingCommonHeader';
import { CommonHeaderStyle } from 'screens/settings/style';
import { SearchBar } from '@rneui/themed';
import SettingBlock from 'components/SettingBlock';
import { useSelector } from 'react-redux';

const SupportScreen = ({ route, navigation }: any): React.JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const [filteredTips, setFilteredTips] = useState<any>([]);
  const [filteredPolicies, setFilteredPolicy] = useState<any>([]);
  const { title } = route.params;
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const handleChange = (text: any) => {
    setSearch(text);
  };
  const customerTipList = [
    {
      title: `Q.   I can't remember my Account email`,
      onPress: () => console.log('Show Account'),
    },
    {
      title: `Q.   How can I create my problems`,
      onPress: () => console.log('Show Problem'),
    },
  ];
  const policyList = [
    {
      title: 'Terms of Service',
      onPress: () => console.log('Show Terms of Service'),
    },
    {
      title: 'Location-Based Services',
      onPress: () => console.log('Show Location-Based Services'),
    },
    {
      title: 'Privacy Policy',
      onPress: () => console.log('Show Privacy Policy'),
    },
    {
      title: 'Youth Protection Policy',
      onPress: () => console.log('Show Youth Protection Policy'),
    },
  ];
  useEffect(() => {
    setFilteredPolicy(
      policyList.filter((policy: any) =>
        policy.title.toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredTips(
      customerTipList.filter((tip: any) =>
        tip.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);
  return (
    <SettingCommonHeader title={title} navigation={navigation}>
      <View style={CommonHeaderStyle.Container}>
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
        <Text style={CommonHeaderStyle.ContainerText}>Customer Tips</Text>
        {filteredTips.map((tip: any) => (
          <SettingBlock
            title={tip.title}
            key={tip.title}
            onPress={tip.onPress}
          />
        ))}
        <Text style={CommonHeaderStyle.ContainerText}>Terms and Policies</Text>
        {filteredPolicies.map((policy: any) => (
          <SettingBlock
            title={policy.title}
            key={policy.title}
            onPress={policy.onPress}
          />
        ))}
      </View>
    </SettingCommonHeader>
  );
};

export default React.memo(SupportScreen);
