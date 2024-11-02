import React from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const LoadingIndicator = (): React.JSX.Element => {
  const isLoading = useSelector((state: any) => state.config.isLoading);
  return (
    <>
      {isLoading && (
        <View
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
          }}
        >
          <ActivityIndicator
            size="large"
            color="white"
            style={{ transform: [{ scale: 50 / 30 }] }}
          />
        </View>
      )}
    </>
  );
};

export default LoadingIndicator;
