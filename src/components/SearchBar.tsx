import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, TextInput} from 'react-native';

const SearchBar = (): React.JSX.Element => {
  return (
    <View>
      <Ionicons name="search" size={30} />
      <TextInput />
    </View>
  );
};

export default SearchBar;
