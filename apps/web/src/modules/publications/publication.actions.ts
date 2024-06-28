import _ from 'lodash';
import { ActionEnum, type Dispatch } from '../../context/types';
import PublicationEntity from './publication.entity';
import type { IPublication } from './publication.types';

export const editPublication = (
  dispatch: Dispatch,
  publication: Partial<IPublication | undefined>,
) => {
  dispatch({
    type: ActionEnum.SetPublication,
    data: new PublicationEntity(publication),
  });
};

export const viewPublication = (
  dispatch: Dispatch,
  publicacion: Partial<IPublication | undefined>,
) => {
  dispatch({
    type: ActionEnum.SetPublication,
    data: new PublicationEntity(publicacion),
  });

  dispatch({
    type: ActionEnum.SetDrawerPublication,
    data: true,
  });
};

export const clearPublication = (dispatch: Dispatch) => {
  dispatch({
    type: ActionEnum.SetDrawerPublication,
    data: false,
  });
  dispatch({ type: ActionEnum.SetPublication, data: undefined });
};
