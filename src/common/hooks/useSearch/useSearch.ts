import {atom, useRecoilState} from 'recoil';

const USER_STATE_KEY = 'polyfolio_search_state';

export default function useSearch() {
  const searchPersistState = atom({
    key: USER_STATE_KEY,
    default: null,
  });

  const [search, setSearch] = useRecoilState(searchPersistState);

  return {search, setSearch};
}
