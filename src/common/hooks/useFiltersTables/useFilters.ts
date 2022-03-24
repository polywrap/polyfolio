import {useFilters} from 'common/hooks/useFiltersTables/Filters.context';

export default function useFiltersTables() {
  const {filters, setFilters} = useFilters();

  return {filters, setFilters};
}
