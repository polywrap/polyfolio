import React, {createContext, useContext, useRef, useState} from 'react';

interface CacheContextProps {
  getCacheByKey: (key: string) => unknown;
  setCacheByKey: (key: string, value: unknown) => void;
  clearCache: () => void;
}

const CacheContext = createContext<CacheContextProps>(null);

// TODO implement cache processing stete, e.g to prevent multiple requests for same cache key
function CacheProvider({children}: {children: React.ReactNode}) {
  const cache = useRef({});

  const setCacheByKey = (key: string, value: unknown) => {
    cache.current = {...cache.current, [key]: value};
  };

  const getCacheByKey = (key: string) => cache.current[key] ?? undefined;

  const clearCache = () => {
    cache.current = {};
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
  const [cachedValue, setCachedValue] = useState<T>(getCacheByKey(key) as T);

  const setCache = (value: T) => {
    setCacheByKey(key, value);
    setCachedValue(value);
  };

  return [cachedValue, setCache];
}
