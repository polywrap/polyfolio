import {atom} from "recoil";

const FORMATTED_BALANCE_KEY = 'polyfolio_formatted_balance';

export default atom({
  key: FORMATTED_BALANCE_KEY,
  default: {},
});
