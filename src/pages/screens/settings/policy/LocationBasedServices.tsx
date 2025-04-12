import React from 'react';
import SettingCommonHeader from 'components/SettingCommonHeader';
const LocationBasedServiceScreen = ({ route, navigation }: any) => {
  const { title }: any = route.params;
  return (
    <SettingCommonHeader
      title={title}
      navigation={navigation}
    ></SettingCommonHeader>
  );
};

export default React.memo(LocationBasedServiceScreen);
