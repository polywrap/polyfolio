import {atom} from 'recoil';

const TRANSACTION_STATE_KEY = 'polyfolio_transactions';

export default atom({
  key: TRANSACTION_STATE_KEY,
  default: null,
});
