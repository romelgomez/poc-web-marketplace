import React from 'react';
import type { Dispatch, State } from './types';

const Context = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export default Context;
