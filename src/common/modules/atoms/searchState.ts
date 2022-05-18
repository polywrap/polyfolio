import {atom} from "recoil";

const USER_STATE_KEY = 'polyfolio_search_state';

export const searchPersistState = atom({
  key: USER_STATE_KEY,
  default: null,
});
