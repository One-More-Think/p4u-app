import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
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
        backgroundColor: isDarkMode ? '#878b96' : 'white',
        borderColor: '#877AA5',
        borderWidth: selected === data?.optionId ? 2 : 0,
        overflow: 'hidden',
      }}
      disabled={disabled}
    >
      {data?.timeout && (
        <>
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: `${parseFloat(data.percentage)}%`,
              backgroundColor: isDarkMode ? 'black' : '#878b96',
              borderRadius: 5,
            }}
          />
          <Text
            style={{
              position: 'absolute',
              right: 0,
              top: '25%',
              bottom: 0,
              marginRight: 20,
              height: '100%',
              fontSize: 15,
              fontWeight: '500',
              color: isDarkMode ? 'white' : '#222428',
            }}
          >
            {parseFloat(data.percentage)}%
          </Text>
        </>
      )}
      <Text
        style={{
          ...ChooseBoxStyle.ChooseBoxText,
          color: isDarkMode ? 'white' : '#222428',
          zIndex: 1,
        }}
      >
        {question}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(ChooseBox);
