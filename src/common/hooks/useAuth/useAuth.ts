import { userPersistState } from 'common/modules/atoms/userAddress';
import RoutePath from 'common/modules/routing/routing.enums';
import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';

export default function useAuth() {
  const navigate = useNavigate();

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
