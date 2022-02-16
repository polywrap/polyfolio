import {Dispatch, SetStateAction} from 'react';

enum Currency {
  USD = 'USD',
}

interface CurrencyContextProps {
  currency: Currency;
  setCurrency: Dispatch<SetStateAction<Currency>>;
}

export {Currency, CurrencyContextProps};
