import {showAlert} from 'reducers/alertSlice';
import {setIsLoading} from 'reducers/configSlice';
import api from 'utils/api';
export const OAuth2Login = () => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    // await to api send request
    // if there is no data throw new Error('something')
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
      }),
    );
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const GetUserDetail = (id: string) => async (dispatch: any) => {
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
      }),
    );
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
        }),
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
      }),
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
      }),
    );
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const PostQuestion = (data: any) => async (dispatch: any) => {
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
      }),
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
      }),
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
      }),
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
      }),
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
      }),
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
      }),
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
      }),
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
      }),
    );
  } finally {
    dispatch(setIsLoading(false));
  }
};

// ==============================  Comment  ==============================
