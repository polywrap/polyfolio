import {atom} from 'recoil';

const TOKEN_TRANSFER_STATE_KEY = 'polyfolio_token_transfers';

export default atom({
  key: TOKEN_TRANSFER_STATE_KEY,
  default: [],
});
