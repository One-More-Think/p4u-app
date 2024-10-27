import React from 'react';
import {Skeleton} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
const SkeletonBar = ({style}: any) => {
  return (
    <Skeleton
      animation="wave"
      LinearGradientComponent={() => (
        <LinearGradient
          colors={['#a0a0a0', '#b0b0b0', '#a0a0a0']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[{flex: 1}, {width: '100%', height: '100%'}]}
        />
      )}
      style={{
        ...style,
        alignSelf: 'center',
        backgroundColor: '#a0a0a0',
      }}
    />
  );
};

export default React.memo(SkeletonBar);
