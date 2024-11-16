import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from 'reducers/index';
import { showAlert } from 'reducers/alertSlice';
import { useNavigation } from '@react-navigation/native';
import { LogoutUser } from 'reducers/actions/UserAction';
const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.defaults.baseURL = process.env.API_URL;

api.interceptors.request.use(
  async (config: any) => {
    const token = await EncryptedStorage.getItem('token');
    if (!token) return config;
    const sns = await AsyncStorage.getItem('sns');
    if (!sns) return config;

    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['x-sns-name'] = sns;
    // config.headers['SECRET-KEY'] = process.env.HEADER_SECRET_KEY;
    return config;
  },
  (error) => {
    const navigation: any = useNavigation();
    if (error.response.status === 401) {
      store.dispatch(LogoutUser());
      navigation.navigate('LoginPage');
    }
  }
);

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response.status === 401 || err.response.status === 403) {
      try {
        store.dispatch(LogoutUser());
        const navigation: any = useNavigation();
        navigation.navigate('LoginPage');
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    return Promise.reject(new Error('Invalid data'));
  }
);

export default api;
