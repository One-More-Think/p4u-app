import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import type { PropsWithChildren } from 'react';
import { ChooseBoxStyle } from 'style';
import { useSelector } from 'react-redux';

type ChooseBoxProps = PropsWithChildren<{
  question: string;
  onSelect: any;
  selected: number;
  disabled: boolean;
  data: any;
}>;

const ChooseBox = ({
  question,
  onSelect,
  selected,
  disabled = false,
  data,
}: ChooseBoxProps): React.JSX.Element => {
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  return (
    <TouchableOpacity
      onPress={() => onSelect(data?.questionId, data?.optionId)}
      key={question}
      style={{
        ...ChooseBoxStyle.ChooseBoxButton,
        backgroundColor: isDarkMode ? '#222428' : 'white',
        opacity: selected === data?.optionId ? 1 : 0.4,
      }}
      disabled={disabled}
    >
      <Text
        style={{
          ...ChooseBoxStyle.ChooseBoxText,
          color: isDarkMode ? 'white' : '#222428',
        }}
      >
        {question}
      </Text>
    </TouchableOpacity>
  );
};

export default ChooseBox;
