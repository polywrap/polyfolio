import {useRecoilState} from 'recoil';
import {searchPersistState} from 'common/modules/atoms/searchState';

export default function useSearch() {
  const [search, setSearch] = useRecoilState(searchPersistState);

  return {search, setSearch};
}
