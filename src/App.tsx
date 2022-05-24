import React, {Fragment, useEffect} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import MetaMaskOnboarding from '@metamask/onboarding';

import styles from './App.module.scss';

import useWallet from 'common/hooks/useWallet/useWallet';
import LandingPage from 'pages/LandingPage/LandingPage';
import RoutePath from 'common/modules/routing/routing.enums';
import useRouteChange from 'common/hooks/useRouteChange/useRouteChange';
import Portfolio from 'pages/DashboardPage/Portfolio/Portfolio';
import Transactions from 'pages/DashboardPage/Transactions/Transactions';
import SettingsPage from 'pages/SettingsPage/SettingsPage';
import AssetPage from 'pages/DashboardPage/AssetPage/AssetPage';
import PageUnderConstruction from 'pages/PageUnderConstruction/PageUnderConstruction';
import NetworkPage from 'pages/DashboardPage/NetworkPage/NetworksPage';
import ProtocolPage from 'pages/DashboardPage/ProtocolPage/ProtocolPage';
import useBalance from 'common/hooks/useBalance/useBalance';
//import useTransactions from 'common/hooks/useTransaction/useTransaction';
import {useRecoilValue} from 'recoil';
import replaceRouteParameters from 'utils/replaceRouteParameters';
import {searchPersistState} from 'common/modules/atoms/searchState';
import {userPersistState} from 'common/modules/atoms/userAddress';

function App() {
  useRouteChange();
  const user = useRecoilValue(userPersistState);
  const search = useRecoilValue(searchPersistState);
  const {check} = useWallet();
  useBalance(search ?? user);
  //useTransactions(); //TODO Why do we use it here ?

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window['ethereum'].on('accountsChanged', check);
    }
  }, [check]);

  const ProtectedRoute = ({user, redirectPath = RoutePath.BaseRoute, children}) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }

    return children;
  };

  const AuthorizedMainRoute = ({user, redirectPath = RoutePath.Dashboard, children}) => {
    if (user) {
      return <Navigate to={replaceRouteParameters(redirectPath, {user})} replace />;
    }

    return children;
  };

  return (
    <div className={styles.app}>
      <Routes>
        <Fragment>
          <Route
            path={RoutePath.BaseRoute}
            element={
              <AuthorizedMainRoute user={user}>
                <LandingPage />
              </AuthorizedMainRoute>
            }
          />
          <Route
            path={RoutePath.Asset}
            element={
              <ProtectedRoute user={user ?? search}>
                <AssetPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={RoutePath.Dashboard}
            element={
              <ProtectedRoute user={user ?? search}>
                <Portfolio />
              </ProtectedRoute>
            }
          />
          <Route
            path={RoutePath.DashboardTransactions}
            element={
              <ProtectedRoute user={user ?? search}>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path={RoutePath.Network}
            element={
              <ProtectedRoute user={user ?? search}>
                <NetworkPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={RoutePath.Protocol}
            element={
              <ProtectedRoute user={user ?? search}>
                <ProtocolPage />
              </ProtectedRoute>
            }
          />
          <Route path={RoutePath.Settings} element={<SettingsPage />} />
          <Route path={RoutePath.Support} element={<PageUnderConstruction />} />
          <Route path={RoutePath.Polywrap} element={<PageUnderConstruction />} />
          <Route path={RoutePath.Docs} element={<PageUnderConstruction />} />
          <Route path={'*'} element={<Navigate to={RoutePath.BaseRoute} />} />
        </Fragment>
      </Routes>
    </div>
  );
}

export default App;
