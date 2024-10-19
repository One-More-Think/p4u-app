import React from 'react';
import {Dimensions} from 'react-native';
import type {PropsWithChildren} from 'react';
import {StackedBarChart} from 'react-native-chart-kit';
import {ChartStyle} from 'style';
import {useSelector} from 'react-redux';

type ChartProps = PropsWithChildren<{
  data: any;
  filtered: string;
}>;

const Chart = ({data, filtered}: ChartProps): React.JSX.Element => {
  const isDarkMode = useSelector((state: any) => state.user.darkmode);
  const chartConfig = {
    backgroundGradientFrom: isDarkMode ? '#222428' : '#9fb3f2',
    backgroundGradientFromOpacity: 0.7,
    backgroundGradientTo: isDarkMode ? 'black' : '#d8e0f9',
    backgroundGradientToOpacity: 0.3,
    color: (opacity = 1) =>
      isDarkMode
        ? `rgba(255, 255, 255, ${opacity})`
        : `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 1,
    propsForLabels: {
      fontWeight: 'bold',
    },
    propsForHorizontalLabels: {
      fontWeight: 'normal',
    },
  };

  const targetData = [
    [10, 20, 70],
    [15, 25, 60],
    [20, 30, 50],
  ];

  const Mockdata = {
    labels: ['A1', 'A2', 'A3'],
    legend: ['Canada', 'Korea', 'Japan'],
    data: targetData,
    barColors: isDarkMode
      ? ['#909193', '#38393d', '#000000']
      : ['#ebeffc', '#7f8fc1', '#5f6b91'],
  };

  return (
    <>
      <StackedBarChart
        hideLegend={false}
        style={ChartStyle.StackBar}
        data={Mockdata}
        width={Dimensions.get('window').width / 1.1}
        height={350}
        chartConfig={chartConfig}
      />
    </>
  );
};

export default React.memo(Chart);
