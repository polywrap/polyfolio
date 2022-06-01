import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';

interface CacheContextProps {
  getCacheByKey: (key: string) => unknown;
  setCacheByKey: (key: string, value: unknown) => void;
  clearCache: () => void;
}

const CacheContext = createContext<CacheContextProps>(null);

function CacheProvider({children}: {children: React.ReactNode}) {
  const [cache, setCache] = useState({});

  const setCacheByKey = (key: string, value: unknown) => {
    setCache((cache) => ({...cache, [key]: value}));
  };

  const getCacheByKey = (key: string) => cache[key] || undefined;

  const clearCache = () => {
    setCache({});
  };

  return (
    <CacheContext.Provider value={{getCacheByKey, setCacheByKey, clearCache}}>
      {children}
    </CacheContext.Provider>
  );
}

export default CacheProvider;

export function useCache<T extends unknown>(key: string): [T, (value: T) => void] {
  const {getCacheByKey, setCacheByKey} = useContext(CacheContext);

  const setCache = (value: unknown) => {
    setCacheByKey(key, value);
  };
  const value = getCacheByKey(key);

  return [value as T, setCache];
}
