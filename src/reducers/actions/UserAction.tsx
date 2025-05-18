import { showAlert } from 'reducers/alertSlice';
import { setIsLoading } from 'reducers/configSlice';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  GoogleSignin,
  isSuccessResponse,
  isCancelledResponse,
  SignInResponse,
} from '@react-native-google-signin/google-signin';
import {
  appleAuth,
  appleAuthAndroid,
  AppleRequestResponse,
} from '@invertase/react-native-apple-authentication';
import axios from 'axios';
import api from 'utils/api';
import { v4 as uuid } from 'uuid';
import { userLogin, UserInfoType, userLogOut } from 'reducers/userSlice';
import { Platform } from 'react-native';
const GoogleButtonPress = async () => {
  const scopes = process.env.GOOGLE_SCOPE?.split(' ').map((scope) =>
    scope.trim()
  );

  GoogleSignin.configure({
    webClientId: process.env.GOOGLE_WEB_CLNT_ID,
    scopes,
    offlineAccess: true,
    // androidClientId: process.env.GOOGLE_ANDROID_CLNT_ID,
    iosClientId: process.env.GOOGLE_IOS_CLNT_ID,
    forceCodeForRefreshToken: true,
  });

  await GoogleSignin.hasPlayServices();

  const signData: SignInResponse = await GoogleSignin.signIn();
  return signData;
};

const AppleButtonPress = async () => {
  if (Platform.OS === 'ios') {
    const appleAuthRequestResponse: AppleRequestResponse =
      await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    if (credentialState === appleAuth.State.AUTHORIZED) {
      return { data: { idToken: appleAuthRequestResponse.identityToken } };
    }
  } else if (Platform.OS === 'android') {
    const rawNonce = uuid();
    const state = uuid();

    appleAuthAndroid.configure({
      clientId: 'com.example.client-android',
      redirectUri: `${process.env.API_URL}users/sign-in/apple`,
      responseType: appleAuthAndroid.ResponseType.ALL,
      scope: appleAuthAndroid.Scope.ALL,
      // nonce: rawNonce,
      // state,
    });
  }
};
export const OAuth2Login = (snsType: string) => async (dispatch: any) => {
  try {
    let response: any = null;
    switch (snsType) {
      case 'google':
        response = await GoogleButtonPress();
        if (isCancelledResponse(response)) return;
        break;
      case 'apple':
        response = await AppleButtonPress();
        break;
      default:
        break;
    }

    if (!response || !response.data)
      throw new Error('No response from Social Login');

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

    if (current_country.status !== 200) {
      throw new Error(current_country?.data.reason);
    }

    const userData = await axios.post(
      `${process.env.API_URL}users/sign-in/${snsType}`,
      {
        idToken: response.data?.idToken,
      },
      config
    );

    if (!userData.data) throw new Error('Fail to login');

    await EncryptedStorage.setItem('token', userData.data?.accessToken);
    await EncryptedStorage.setItem('sns', snsType);

    const userInfo: UserInfoType = {
      id: userData.data?.userInfo?.id,
      email: userData.data?.userInfo?.email,
      gender: userData.data?.userInfo?.gender || 'None',
      occupation: userData.data?.userInfo?.occupation || '',
      aboutMe: userData.data?.userInfo?.aboutMe || '',
      country: current_country?.data.toLowerCase(),
      age: userData.data?.userInfo?.age,
    };

    if (snsType === 'google' && isSuccessResponse(response))
      dispatch(userLogin({ userInfo, snsType }));
    else if (snsType === 'apple') dispatch(userLogin({ userInfo, snsType }));
    else throw new Error('Fail to login');
  } catch (error: any) {
    const errorMessage: string =
      error.response?.data?.message ||
      error.message ||
      'Exceptional error occurred';
    console.log(errorMessage);
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
    const snsType = await EncryptedStorage.getItem('sns');
    if (!snsType) return;
    const userData = await api.get(`auth/me`);
    if (!userData.data) throw new Error('Fail to login');

    const userInfo: UserInfoType = userData.data?.userInfo;

    dispatch(userLogin({ userInfo, snsType }));
  } catch (error: any) {
    const errorMessage: string =
      error.response?.data?.message ||
      error.message ||
      'Exceptional error occurred';
    console.log(errorMessage);
    await EncryptedStorage.clear();
    // dispatch(
    //   showAlert({
    //     message: errorMessage,
    //     type: 'error',
    //     id: Date.now().toString(),
    //   })
    // );
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const GetUserDetail = (id: number) => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const userData = await api.get(`users/${id}`);
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
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const UpdateUser =
  (data: any, userId: number) => async (dispatch: any) => {
    try {
      dispatch(setIsLoading(true));

      const { country, age, gender, occupation, aboutMe } = data;

      const res = await api.put(`users/${userId}`, {
        country,
        age,
        occupation,
        gender,
        aboutMe,
      });
      if (res.status !== 204) throw new Error('Fail to Login');
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
    // await api.get('/user/logout');
    await EncryptedStorage.clear();
    dispatch(userLogOut());
    dispatch(
      showAlert({
        message: 'User logout',
        type: 'info',
        id: Date.now().toString(),
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

export const DeleteUser = (userId: number) => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const res = await api.delete(`users/${userId}`);
    if (res.status === 200) {
      dispatch(
        showAlert({
          message: 'Delete Account',
          type: 'success',
          id: Date.now().toString(),
        })
      );
      await EncryptedStorage.clear();
      dispatch(userLogOut());
    }
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
  (
    page: number,
    search: any = null,
    category: any = null,
    sort: any = null,
    age: any = null,
    gender: any = null,
    country: any = null
  ) =>
  async (dispatch: any) => {
    try {
      if (page === 0) dispatch(setIsLoading(true));
      let queryString: string = `questions?offset=${page}`;
      if (search) queryString += `&search=${search}`;
      else {
        if (category) queryString += `&category=${category}`;
        if (sort) queryString += `&sort=${sort}`;
        if (age) queryString += `&age=${age}`;
        if (gender) queryString += `&gender=${gender}`;
        if (country) queryString += `&country=${country}`;
      }
      const questions = (await api.get(queryString)) || [];
      return questions.data;
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

export const GetQuestionDetail = (id: number) => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const res = await api.get(`questions/${id}`);
    return res.data;
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

export const PostQuestion =
  (data: any, navigation: any) => async (dispatch: any) => {
    try {
      dispatch(setIsLoading(true));
      const res = await api.post('questions', data);

      if (res.status !== 201) throw new Error('Fail to create question');
      else
        dispatch(
          showAlert({
            message: 'Question created',
            type: 'success',
            id: Date.now().toString(),
          })
        );
      navigation.goBack();
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

export const DeleteQuestion = (id: number) => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const res = await api.delete(`questions/${id}`);
    if (res.status === 200)
      dispatch(
        showAlert({
          message: 'Question deleted',
          type: 'success',
          id: Date.now().toString(),
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

export const ReportQuestion = (questionId: number) => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const res = await api.post(`questions/${questionId}/report`);
    if (res.status === 201) {
      dispatch(
        showAlert({
          message: 'Reported Question',
          type: 'info',
          id: Date.now().toString(),
        })
      );
    }
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

export const SelectOption =
  (questionId: number, optionId: number) => async (dispatch: any) => {
    try {
      await api.post('user-options', { questionId, optionId });
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

export const UpdateQuestion =
  (data: any, id: number) => async (dispatch: any) => {
    try {
      dispatch(setIsLoading(true));
      const res = await api.put(`questions/${id}`, {
        category: data.category,
        title: data.title,
        description: data.description,
      });
      if (res.status !== 200) throw new Error('Fail to update');
      return res.status;
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

export const ReportComment = (commentId: number) => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const res = await api.post(`comments/${commentId}/report`);
    if (res.status === 201) {
      dispatch(
        showAlert({
          message: 'Reported Comment',
          type: 'info',
          id: Date.now().toString(),
        })
      );
    }
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
export const PostComment =
  (questionId: number, context: string) => async (dispatch: any) => {
    try {
      dispatch(setIsLoading(true));
      await api.post(`questions/${questionId}/comments`, { context });
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
export const DeleteComment = (commentId: number) => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const res = await api.delete(`comments/${commentId}`);
    if (res.status === 200) {
      dispatch(
        showAlert({
          message: 'Comment deleted',
          type: 'success',
          id: Date.now().toString(),
        })
      );
    }
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
// export const UpdateComment = () => async (dispatch: any) => {
//   try {
//     dispatch(setIsLoading(true));
//   } catch (error: any) {
//     const errorMessage: string =
//       error.response?.data?.message ||
//       error.message ||
//       'Exceptional error occurred';
//     dispatch(
//       showAlert({
//         message: errorMessage,
//         type: 'error',
//         id: Date.now().toString(),
//       })
//     );
//   } finally {
//     dispatch(setIsLoading(false));
//   }
// };
export const LikeComment =
  (id: number, reaction: string) => async (dispatch: any) => {
    try {
      dispatch(setIsLoading(true));
      reaction === 'isLike'
        ? await api.put(`comments/${id}/reactions`, {
            isLike: true,
            isDislike: false,
          })
        : await api.put(`comments/${id}/reactions`, {
            isLike: false,
            isDislike: true,
          });
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
