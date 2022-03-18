/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext, createContext} from 'react';
import {atom, useRecoilState} from 'recoil';

import {Filters, FiltersContextProps} from './Filters.types';
import useLocalStorage from 'common/hooks/useLocalStorage/useLocalStorage';

const FILTERS_LS_KEY = 'polyfolio_filters';
const FILTERS_STATE_KEY = 'polyfolio_filters_state';

const FiltersContext = createContext<FiltersContextProps>(null);
export const useFilters = () => useContext(FiltersContext);

export default function FiltersContextProvider({children}) {
  const [persistedFilters, setPersistedFilters] = useLocalStorage<Filters>(FILTERS_LS_KEY, {
    assets: {
      assets: true,
      allocation: false,
      price: false,
      value: false,
    },
    vaults: {
      protocols: true,
      allocation: false,
      value: false,
      claimable: false,
    },
    protocols: {
      protocols: true,
      value: false,
      claimable: false,
    },
  });
  const filtersPersistState = atom({
    key: FILTERS_STATE_KEY,
    default: persistedFilters,
  });

  const [filters, setFilters] = useRecoilState(filtersPersistState);

  useEffect(() => {
    setPersistedFilters(filters);
  }, []);

  useEffect(() => {
    if (filters !== persistedFilters) setPersistedFilters(filters);
  }, [filters]);

  return (
    <FiltersContext.Provider value={{filters, setFilters}}>{children}</FiltersContext.Provider>
  );
}
