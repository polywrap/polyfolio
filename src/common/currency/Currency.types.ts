import {Dispatch, SetStateAction} from 'react';

export enum Currency {
  USD = 'USD',
}

export interface CurrencyContextProps {
  currency: Currency;
  setCurrency: Dispatch<SetStateAction<Currency>>;
}
