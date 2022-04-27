import {useEffect} from 'react';
import {atom, useRecoilState} from 'recoil';

import useLocalStorage from '../useLocalStorage/useLocalStorage';

const USER_LS_KEY = 'polyfolio_search';
const USER_STATE_KEY = 'polyfolio_search_state';

export default function useSearch() {
  const [persistedSearch, setPersistedSearch] = useLocalStorage<string>(USER_LS_KEY, null);
  const searchPersistState = atom({
    key: USER_STATE_KEY,
    default: persistedSearch,
  });

  const [search, setSearch] = useRecoilState(searchPersistState);

  useEffect(() => {
    setPersistedSearch(search);
  }, [setPersistedSearch, search]);

  return {search, setSearch};
}
