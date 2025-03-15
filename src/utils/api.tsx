import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import store from 'reducers/index';
import { useNavigation } from '@react-navigation/native';
import { LogoutUser } from 'reducers/actions/UserAction';
import { showAlert } from 'reducers/alertSlice';
const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.defaults.baseURL = process.env.API_URL;

api.interceptors.request.use(
  async (config: any) => {
    try {
      const token = await EncryptedStorage.getItem('token');
      if (!token) return config;
      const sns = await EncryptedStorage.getItem('sns');
      if (!sns) return config;

      config.headers['Authorization'] = `Bearer ${token}`;
      // config.headers['x-sns-name'] = sns;
      // config.headers['SECRET-KEY'] = process.env.HEADER_SECRET_KEY;
      return config;
    } catch (error: any) {
      const errorMessage: string =
        error.response?.data?.message ||
        error.message ||
        'Exceptional error occurred';
      console.log(errorMessage);
    }
  },
  (error) => {
    const errorMessage: string =
      error.response?.data?.message ||
      error.message ||
      'Exceptional error occurred';
    store.dispatch(
      showAlert({
        message: errorMessage,
        type: 'error',
        id: Date.now().toString(),
      })
    );
  }
);

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response.status === 401 || err.response.status === 403) {
      try {
        // store.dispatch(LogoutUser());
        // const navigation: any = useNavigation();
        // navigation.reset({
        //   key: 'Login',
        //   index: 0,
        //   routes: [{ name: 'LoginPage' }],
        // });
      } catch (_error: any) {
        const errorMessage: string =
          _error.response?.data?.message ||
          _error.message ||
          'Exceptional error occurred';
        console.log(errorMessage);
        return Promise.reject(new Error(errorMessage));
      }
    }
    const errorMessage: string =
      err.response?.data?.message ||
      err.message ||
      'Exceptional error occurred';
    console.log(errorMessage, err.response?.status);
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;
