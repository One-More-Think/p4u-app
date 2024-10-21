import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AnonymousButtonStyle} from 'style';
const AnonymousButton = ({onCheck, checked}: any): React.JSX.Element => {
  return (
    <TouchableOpacity style={AnonymousButtonStyle.Container} onPress={onCheck}>
      {checked ? (
        <Ionicons name="square-sharp" size={20} />
      ) : (
        <Ionicons name="square-outline" size={20} />
      )}
      <Text style={{fontSize: 10, fontWeight: 'bold'}}>anonymous</Text>
    </TouchableOpacity>
  );
};

export default React.memo(AnonymousButton);
