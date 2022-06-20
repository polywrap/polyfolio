import React, {useEffect, useContext, createContext} from 'react';
import {atom, useRecoilState} from 'recoil';

import {CurrencyContextProps} from './Currency.types';
import useLocalStorage from 'common/hooks/useLocalStorage/useLocalStorage';
import {Currency} from 'common/types';

const CURRENCY_LS_KEY = 'polyfolio_currency';
const CURRENCY_STATE_KEY = 'polyfolio_currency_state';

const CurrencyContext = createContext<CurrencyContextProps>(null);
export const useCurrency = () => useContext(CurrencyContext);

export default function CurrencyContextProvider({children}) {
  const [persistedCurrency, setPersistedCurrency] = useLocalStorage<Currency>(
    CURRENCY_LS_KEY,
    null,
  );
  const themePersistState = atom({
    key: CURRENCY_STATE_KEY,
    default: persistedCurrency,
  });

  const [currency, setCurrency] = useRecoilState(themePersistState);

  useEffect(() => {
    setPersistedCurrency(currency ?? Currency.USD);
  }, [currency, setPersistedCurrency]);

  return (
    <CurrencyContext.Provider value={{currency, setCurrency}}>{children}</CurrencyContext.Provider>
  );
}
