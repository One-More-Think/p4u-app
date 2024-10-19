import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import type {PropsWithChildren} from 'react';
import {FilterBoxStyle} from 'style';
import {useSelector} from 'react-redux';

type FilterBoxProps = PropsWithChildren<{
  title: string;
  onFilter: any;
  filtered: string;
}>;
const FilterBox = ({
  title,
  onFilter,
  filtered,
}: FilterBoxProps): React.JSX.Element => {
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  return (
    <TouchableOpacity
      onPress={() => onFilter(title)}
      key={title}
      style={{
        ...FilterBoxStyle.FilterBoxButton,
        backgroundColor: isDarkMode ? '#222428' : 'white',
        opacity: filtered === title ? 1 : 0.4,
      }}>
      <Text
        style={{
          ...FilterBoxStyle.FilterBoxText,
          color: isDarkMode ? 'white' : '#222428',
        }}
        adjustsFontSizeToFit={true}
        numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterBox;
