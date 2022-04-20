/* eslint-disable react-hooks/exhaustive-deps */
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
import WrapperInfoPage from 'pages/WrapperInfoPage/WrapperInfoPage';
import NetworksInfo from 'pages/WrapperInfoPage/NetworksInfo/NetworksInfo';
import ProtocolsInfo from 'pages/WrapperInfoPage/ProtocolsInfo/ProtocolsInfo';
import useBalance from 'common/hooks/useBalance/useBalance';
import useTransactions from 'common/hooks/useTransaction/useTransaction';
import balanceState from 'common/modules/atoms/balanceState';
import { useRecoilValue } from 'recoil';
import transactionState from 'common/modules/atoms/transactionState';

function App() {
  useRouteChange();
  const {user} = useAuth();
  const {check} = useWallet();
  const {getBalance} = useBalance();
  const {getTransactions} = useTransactions();
  const balance = useRecoilValue(balanceState);
  const transaction = useRecoilValue(transactionState);

  useEffect(function fetchBalance () {
    if (user && !balance) {
      getBalance();
    }
  }, [getBalance, user, balance])

  useEffect(function fetchTransaction () {
    if (balance && !transaction) {
      getTransactions();
    }
  }, [getTransactions, balance, transaction])

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window['ethereum'].on('accountsChanged', check);
    }
  }, []);

  const ProtectedRoute = ({user, redirectPath = RoutePath.BaseRoute, children}) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }

    return children;
  };

  const AuthorizedMainRoute = ({user, redirectPath = RoutePath.Dashboard, children}) => {
    if (user) {
      return <Navigate to={redirectPath} replace />;
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
              <ProtectedRoute user={user}>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path={RoutePath.Network}
            element={
              <ProtectedRoute user={user}>
                <WrapperInfoPage>
                  <NetworksInfo />
                </WrapperInfoPage>
              </ProtectedRoute>
            }
          />
          <Route
            path={RoutePath.Protocol}
            element={
              <ProtectedRoute user={user}>
                <WrapperInfoPage>
                  <ProtocolsInfo />
                </WrapperInfoPage>
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
