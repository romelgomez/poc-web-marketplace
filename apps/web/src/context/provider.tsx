import React, { type ReactNode } from 'react';
import Context from './context';
import Reducer from './reducer';
import type { State } from './types';

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const initState: State = {
    error: undefined,
    publication: undefined,
    listing: undefined,
    drawerPublication: false,
    loading: undefined,
  };

  const [state, dispatch] = React.useReducer(Reducer, initState);

  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
