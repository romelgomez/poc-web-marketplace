import { ActionEnum, type Dispatch } from '../types';

export const setError = (dispatch: Dispatch, error: Error) => {
  dispatch({ type: ActionEnum.SetError, data: error });
};
