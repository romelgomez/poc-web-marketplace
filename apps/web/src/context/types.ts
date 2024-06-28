import type { Listing } from '../modules/listings/listings.entity';
import type Publication from '../modules/publications/publication.entity';

export enum ActionEnum {
  SetAuth = 'SetAuth',
  SetError = 'SetError',
  SetLoading = 'SetLoading',
  SetPublication = 'SetPublication',
  SetListing = 'SetListing',
  SetDrawerPublication = 'SetDrawerPublication',
}

export type State = {
  error?: Error;
  drawerPublication?: boolean;
  publication?: Publication;
  listing?: Listing;
  loading?: string;
};

export type Action =
  | { type: ActionEnum.SetError; data: State['error'] | undefined }
  | { type: ActionEnum.SetLoading; data: State['loading'] | undefined }
  | { type: ActionEnum.SetPublication; data: State['publication'] | undefined }
  | { type: ActionEnum.SetListing; data: State['listing'] | undefined }
  | {
      type: ActionEnum.SetDrawerPublication;
      data: State['drawerPublication'] | undefined;
    };

export type Dispatch = (action: Action) => void;
