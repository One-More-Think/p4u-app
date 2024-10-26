import {showAlert} from 'reducers/alertSlice';
import {setIsLoading} from 'reducers/configSlice';

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
