import React, { useState, useEffect, PropsWithChildren } from 'react';
import { Text } from 'react-native';
import { UserBoxStyle } from 'style';

type CounterProps = PropsWithChildren<{
  initialTime: number;
}>;

const CountdownTimer = ({ initialTime }: CounterProps) => {
  const [remainingTime, setRemainingTime] = useState(
    Math.max(initialTime - Math.floor(Date.now()) / 1000, 0)
  );
  const formatTime = (time: number) => {
    if (time > 1700000000000) time = 0;
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = Math.round((initialTime - Date.now()) / 1000);
      setRemainingTime(Math.max(timeLeft, 0));
      if (timeLeft <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTime]);
  return (
    <Text
      style={{
        ...UserBoxStyle.TimeStamp,
        fontSize: 12,
        color: '#e06666',
        marginLeft: 10,
      }}
    >
      {formatTime(remainingTime)}
    </Text>
  );
};

export default React.memo(CountdownTimer);
