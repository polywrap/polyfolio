import RoutePath from 'common/modules/routing/routing.enums';
import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {atom, useRecoilState} from 'recoil';

const USER_STATE_KEY = 'polyfolio_user_state';

export default function useAuth() {
  const navigate = useNavigate();
  const userPersistState = atom({
    key: USER_STATE_KEY,
    default: null,
  });

  const [user, setUser] = useRecoilState(userPersistState);

  const logIn = useCallback((address) => {
    setUser(address);
  }, [setUser]);

  const logOut = useCallback(() => {
    setUser(null);
    navigate(RoutePath.BaseRoute);
  }, [setUser, navigate]);

  return {user, logIn, logOut, setUser};
}
