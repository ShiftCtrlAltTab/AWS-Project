import React, { createContext, useContext, useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import Loader from '@/components/Loader';

 const LoaderContext = createContext();

 export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};

 export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
      <Loader />
    </LoaderContext.Provider>
  );
};