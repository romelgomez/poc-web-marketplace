import React from 'react';
import Context from '../context';

export const useAppContext = () => {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }

  return context;
};
