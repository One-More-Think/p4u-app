import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import type {PropsWithChildren} from 'react';
import {ChooseBoxStyle} from 'style';
import {useSelector} from 'react-redux';

type ChooseBoxProps = PropsWithChildren<{
  question: string;
  onSelect: any;
  selected: string;
}>;

const ChooseBox = ({
  question,
  onSelect,
  selected,
}: ChooseBoxProps): React.JSX.Element => {
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  return (
    <TouchableOpacity
      onPress={() => onSelect(question)}
      key={question}
      style={{
        ...ChooseBoxStyle.ChooseBoxButton,
        backgroundColor: isDarkMode ? '#222428' : 'white',
        opacity: selected === question ? 1 : 0.4,
      }}>
      <Text
        style={{
          ...ChooseBoxStyle.ChooseBoxText,
          color: isDarkMode ? 'white' : '#222428',
        }}>
        {question}
      </Text>
    </TouchableOpacity>
  );
};

export default ChooseBox;
