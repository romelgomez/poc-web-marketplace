import { ActionEnum, type Dispatch } from '../../context/types';
import { Listing } from './listings.entity';
import type { IListing } from './listings.types';

export const editListing = (dispatch: Dispatch, data: Partial<IListing>) => {
  dispatch({
    type: ActionEnum.SetListing,
    data: new Listing(data),
  });
};

export const clearListing = (dispatch: Dispatch) => {
  dispatch({ type: ActionEnum.SetListing, data: undefined });
};
