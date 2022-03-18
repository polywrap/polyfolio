import {Dispatch, SetStateAction} from 'react';

interface Filters {
  assets: {
    assets: boolean;
    allocation: boolean;
    price: boolean;
    value: boolean;
  };
  vaults: {
    protocols: boolean;
    allocation: boolean;
    value: boolean;
    claimable: boolean;
  };
  protocols: {
    protocols: boolean;
    value: boolean;
    claimable: boolean;
  };
}

interface FiltersContextProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
}

export {Filters, FiltersContextProps};
