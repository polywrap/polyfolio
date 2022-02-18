import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function useRouteChange() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
  }, [navigate]);
}

export default useRouteChange;
