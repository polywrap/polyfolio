import React, {useEffect, useContext, createContext} from 'react';
import {atom, useRecoilState} from 'recoil';

import {Language, LocalizationContextProps} from './Localization.types';
import useLocalStorage from 'common/hooks/useLocalStorage/useLocalStorage';

const LOCALIZATION_LS_KEY = 'polyfolio_localization';
const LOCALIZATION_STATE_KEY = 'polyfolio_localization_state';

const LanguageContext = createContext<LocalizationContextProps>(null);
export const useLanguageContext = () => useContext(LanguageContext);

export default function LanguageContextProvider({children}) {
  const [persistedLanguage, setPersistedLanguage] = useLocalStorage<Language>(
    LOCALIZATION_LS_KEY,
    null,
  );
  const themePersistState = atom({
    key: LOCALIZATION_STATE_KEY,
    default: persistedLanguage,
  });

  const [language, setLanguage] = useRecoilState(themePersistState);

  useEffect(() => {
    setPersistedLanguage(language ?? Language.EN);
  }, [language, setPersistedLanguage]);

  return (
    <LanguageContext.Provider value={{language, setLanguage}}>{children}</LanguageContext.Provider>
  );
}
