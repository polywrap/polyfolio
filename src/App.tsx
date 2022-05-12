import React, {Fragment, useEffect} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import MetaMaskOnboarding from '@metamask/onboarding';

import styles from './App.module.scss';

import useAuth from 'common/hooks/useAuth/useAuth';
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
import useTransactions from 'common/hooks/useTransaction/useTransaction';
import balanceState from 'common/modules/atoms/balanceState';
import {useRecoilValue} from 'recoil';
import tokenTransferState from 'common/modules/atoms/tokenTransferState';
import useSearch from 'common/hooks/useSearch/useSearch';
import useTokenTransfers from 'common/hooks/useTokenTransaction/useTokenTransfers';
import replaceRouteParameters from 'utils/replaceRouteParameters';

function App() {
  useRouteChange();
  const {user} = useAuth();
  const {search} = useSearch();
  const {check} = useWallet();
  const {getBalance} = useBalance();
  const getTransactions = useTransactions();
  const getTokenTransfer = useTokenTransfers();
  const balance = useRecoilValue(balanceState);
  const tokenTransfer = useRecoilValue(tokenTransferState);

  useEffect(function fetchBalance () {
    if (user && !search) {
      getBalance();
    } else if (search) {
      getBalance(search)
    }
  }, [getBalance, user, search])

  useEffect(function fetchTransaction () {
    if (balance && !search) getTransactions();
    else if (balance && search) getTransactions(search);
  }, [getTransactions, balance, search])

  useEffect(function fetchTokenTransfer () {
    if (balance && !tokenTransfer) {
      getTokenTransfer('0x95A9bd206aE52C4BA8EecFc93d18EACDd41C88CC', 1, search);
    }
  }, [getTokenTransfer, balance, tokenTransfer, search])

  console.log('tokenTransfer', tokenTransfer)

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
              <ProtectedRoute user={user}>
                <AssetPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={RoutePath.Dashboard}
            element={
              <ProtectedRoute user={user}>
                <Portfolio />
              </ProtectedRoute>
            }
          />
          <Route
            path={RoutePath.DashboardTransactions}
            element={
              <Transactions />
            }
          />
          <Route
            path={RoutePath.Network}
            element={
              <ProtectedRoute user={user}>
                <NetworkPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={RoutePath.Protocol}
            element={
              <ProtectedRoute user={user}>
                <ProtocolPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={RoutePath.Settings}
            element={<SettingsPage />}
          />
          <Route
            path={RoutePath.Support}
            element={<PageUnderConstruction />}
          />
          <Route
            path={RoutePath.Polywrap}
            element={<PageUnderConstruction />}
          />
          <Route
            path={RoutePath.Docs}
            element={<PageUnderConstruction />}
          />
          <Route path={'*'} element={<Navigate to={RoutePath.BaseRoute} />} />
        </Fragment>
      </Routes>
    </div>
  );
}

export default App;
