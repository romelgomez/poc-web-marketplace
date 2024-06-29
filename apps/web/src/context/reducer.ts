import { type Action, ActionEnum, type State } from './types';

export default function Reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionEnum.SetPublication:
      return { ...state, publication: action.data };
    case ActionEnum.SetDrawerPublication:
      return { ...state, drawerPublication: action.data };
    case ActionEnum.SetLoading:
      return { ...state, loading: action.data };
    case ActionEnum.SetListing:
      return { ...state, listing: action.data };
    case ActionEnum.SetError:
      return { ...state, error: action.data };
    default:
      return state;
  }
}
