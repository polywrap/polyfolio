import {Dispatch, SetStateAction} from 'react';

export enum Currency {
  USD = 'USD',
}

export enum CurrencySymbol {
  USD = '$',
  INR = '\u20B9',
  EUR = '\u20AC',
  CNY = '\u00A5',
  GBP = '\u00A3',
  CAD = '$',
}

export interface CurrencyContextProps {
  currency: Currency;
  setCurrency: Dispatch<SetStateAction<Currency>>;
}
