import { Platform } from 'react-native';
import { showAlert } from 'reducers/alertSlice';
import { setIsLoading } from 'reducers/configSlice';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import api from 'utils/api';
import { userLogin } from 'reducers/userSlice';
export const OAuth2Login = (sns: string) => async (dispatch: any) => {
  try {
    const scopes = process.env.GOOGLE_SCOPE?.split(' ').map((scope) =>
      scope.trim()
    );

    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_WEB_CLNT_ID,
      scopes,
      offlineAccess: true,
      iosClientId: process.env.GOOGLE_IOS_CLNT_ID,
      forceCodeForRefreshToken: true,
    });

    await GoogleSignin.hasPlayServices();

    const response: any = await GoogleSignin.signIn();

    if (!response.data) throw new Error('Fail to login');

    dispatch(setIsLoading(true));

    const config: any = {
      'Content-Type': 'application/json',
    };

    const current_ip: any = await axios.get(
      'https://api.ipify.org/?format=json'
    );
    if (!current_ip.data?.ip) throw new Error('Fail to login');

    const current_country: any = await axios.get(
      `https://ipapi.co/${current_ip.data?.ip}/country/`
    );

    const userData = await axios.post(
      `${process.env.API_URL}user/login/${sns}`,
      {
        serverAuthCode: response.data.serverAuthCode,
        country: current_country.data.toLowerCase(),
      },
      config
    );

    if (!userData.data) throw new Error('Fail to login');

    await EncryptedStorage.setItem('token', userData.data?.access_token);

    await AsyncStorage.setItem('sns', sns);

    const userInfo: any = {
      id: userData.data?.sns_id || '',
      email: response.data.user.email || '',
      gender: userData.data?.gender || '',
      language: userData.data?.language || '',
      country: current_country?.data.toLowerCase() || '',
      age: userData.data?.age || 0,
    };

    dispatch(userLogin({ userInfo, sns }));

    if (isSuccessResponse(response)) userLogin({ data: response.data });
    else throw new Error('Fail to login');
  } catch (error: any) {
    const errorMessage: string =
      error.response?.data?.message ||
      error.message ||
      'Exceptional error occurred';
    dispatch(
      showAlert({
        message: errorMessage,
        type: 'error',
        id: Date.now().toString(),
      })
    );
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const LoginUser = () => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const token = await EncryptedStorage.getItem('token');
    if (!token) return;
    const sns = await AsyncStorage.getItem('sns');
    if (!sns) return;
    const userData = await api.get(`user/login/${sns}`);
    if (!userData.data) throw new Error('Fail to login');
    const userInfo: any = {
      id: userData.data?.sns_id || '',
      email: userData.data?.email || '',
      gender: userData.data?.gender || '',
      language: userData.data?.language || '',
      country: userData.data?.country || '',
      occupation: userData.data?.occupation || '',
      aboutme: userData.data?.aboutme || '',
      age: userData.data?.age || 0,
    };
    dispatch(userLogin({ userInfo, sns }));
  } catch (error: any) {
    const errorMessage: string =
      error.response?.data?.message ||
      error.message ||
      'Exceptional error occurred';
    console.log(errorMessage);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const GetUserDetail = (id: string) => async (dispatch: any) => {
  try {
    const userData = await api.get(`user/detail/${id}`);
    if (!userData.data) throw new Error('Fail to get user info');
    return userData.data;
  } catch (error: any) {
    const errorMessage: string =
      error.response?.data?.message ||
      error.message ||
      'Exceptional error occurred';
    dispatch(
      showAlert({
        message: errorMessage,
        type: 'error',
        id: Date.now().toString(),
      })
    );
  }
};

export const UpdateUser =
  (user_id: string, data: any) => async (dispatch: any) => {
    try {
      dispatch(setIsLoading(true));
      const { age, gender, occupation, aboutme } = data;
      const res = await api.patch(`/user/new/${user_id}`, {
        age,
        occupation,
        gender,
        aboutme,
      });
      if (res.status !== 200) throw new Error('Fail to Login');
    } catch (error: any) {
      const errorMessage: string =
        error.response?.data?.message ||
        error.message ||
        'Exceptional error occurred';
      dispatch(
        showAlert({
          message: errorMessage,
          type: 'error',
          id: Date.now().toString(),
        })
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const LogoutUser = () => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    await api.get('/user/logout');
    await EncryptedStorage.removeItem('token');
    dispatch(
      userLogin({
        userInfo: {
          id: '',
          email: '',
          country: '',
          age: 0,
          gender: 'none',
          occupation: 'none',
          aboutme: ``,
        },
        sns: '',
        authentication: false,
      })
    );
  } catch (error: any) {
    const errorMessage: string =
      error.response?.data?.message ||
      error.message ||
      'Exceptional error occurred';
    dispatch(
      showAlert({
        message: errorMessage,
        type: 'error',
        id: Date.now().toString(),
      })
    );
  } finally {
    dispatch(setIsLoading(false));
  }
};

// ==============================  User  ==============================

export const GetQuestions =
  (page: number, filter?: string) => async (dispatch: any) => {
    try {
    } catch (error: any) {
      const errorMessage: string =
        error.response?.data?.message ||
        error.message ||
        'Exceptional error occurred';
      dispatch(
        showAlert({
          message: errorMessage,
          type: 'error',
          id: Date.now().toString(),
        })
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const GetQuestionDetail = (id: string) => async (dispatch: any) => {
  try {
  } catch (error: any) {
    const errorMessage: string =
      error.response?.data?.message ||
      error.message ||
      'Exceptional error occurred';
    dispatch(
      showAlert({
        message: errorMessage,
        type: 'error',
        id: Date.now().toString(),
      })
    );
  }
};

export const SearchQuestion = () => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
  } catch (error: any) {
    const errorMessage: string =
      error.response?.data?.message ||
      error.message ||
      'Exceptional error occurred';
    dispatch(
      showAlert({
        message: errorMessage,
        type: 'error',
        id: Date.now().toString(),
      })
    );
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const PostQuestion = (data: any) => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    await api.post('question/create', data);
  } catch (error: any) {
    const errorMessage: string =
      error.response?.data?.message ||
      error.message ||
      'Exceptional error occurred';
    dispatch(
      showAlert({
        message: errorMessage,
        type: 'error',
        id: Date.now().toString(),
      })
    );
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const DeleteQuestion = () => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
  } catch (error: any) {
    const errorMessage: string =
      error.response?.data?.message ||
      error.message ||
      'Exceptional error occurred';
    dispatch(
      showAlert({
        message: errorMessage,
        type: 'error',
        id: Date.now().toString(),
      })
    );
  } finally {
    dispatch(setIsLoading(false));
  }
};

// ==============================  Question  ==============================

export const ReportQuestion = () => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
  } catch (error: any) {
    const errorMessage: string =
      error.response?.data?.message ||
      error.message ||
      'Exceptional error occurred';
    dispatch(
      showAlert({
        message: errorMessage,
        type: 'error',
        id: Date.now().toString(),
      })
    );
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const ReportComment = () => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
  } catch (error: any) {
    const errorMessage: string =
      error.response?.data?.message ||
      error.message ||
      'Exceptional error occurred';
    dispatch(
      showAlert({
        message: errorMessage,
        type: 'error',
        id: Date.now().toString(),
      })
    );
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const PostComment = () => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
  } catch (error: any) {
    const errorMessage: string =
      error.response?.data?.message ||
      error.message ||
      'Exceptional error occurred';
    dispatch(
      showAlert({
        message: errorMessage,
        type: 'error',
        id: Date.now().toString(),
      })
    );
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const DeleteComment = () => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
  } catch (error: any) {
    const errorMessage: string =
      error.response?.data?.message ||
      error.message ||
      'Exceptional error occurred';
    dispatch(
      showAlert({
        message: errorMessage,
        type: 'error',
        id: Date.now().toString(),
      })
    );
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const UpdateComment = () => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
  } catch (error: any) {
    const errorMessage: string =
      error.response?.data?.message ||
      error.message ||
      'Exceptional error occurred';
    dispatch(
      showAlert({
        message: errorMessage,
        type: 'error',
        id: Date.now().toString(),
      })
    );
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const LikeComment = () => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
  } catch (error: any) {
    const errorMessage: string =
      error.response?.data?.message ||
      error.message ||
      'Exceptional error occurred';
    dispatch(
      showAlert({
        message: errorMessage,
        type: 'error',
        id: Date.now().toString(),
      })
    );
  } finally {
    dispatch(setIsLoading(false));
  }
};

// ==============================  Comment  ==============================
