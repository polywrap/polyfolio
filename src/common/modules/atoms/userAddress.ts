import {atom} from "recoil";

const USER_STATE_KEY = 'polyfolio_user_state';

export const userPersistState = atom({
  key: USER_STATE_KEY,
  default: null,
});
