// import React, {useCallback} from 'react';
// import {useColorScheme} from 'react-native';
// import {useSelector} from 'react-redux';
// import store from 'reducers/index';
// import {setDarkMode} from 'reducers/userSlice';

// export const DarkModeInit = () => {
//   const mode = useSelector((state: any) => state.config.mode);
//   const isDarkMode: any = useColorScheme() === 'dark';
//   switch (mode) {
//     case 'System Mode':
//       store.dispatch(setDarkMode(isDarkMode));
//       break;
//     case 'Dark Mode':
//       store.dispatch(setDarkMode(true));
//       break;
//     case 'Light Mode':
//       store.dispatch(setDarkMode(false));
//       break;
//     default:
//       store.dispatch(setDarkMode(isDarkMode));
//       break;
//   }
// };
