import {atom} from 'recoil';

const BALANCE_STATE_KEY = 'polyfolio_balance';

export default atom({
  key: BALANCE_STATE_KEY,
  default: null,
});
