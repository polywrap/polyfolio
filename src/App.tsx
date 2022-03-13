import React, {Fragment} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';

import styles from './App.module.scss';

import useAuth from 'common/hooks/useAuth/useAuth';
import LandingPage from 'pages/LandingPage/LandingPage';
import RoutePath from 'common/modules/routing/routing.enums';
import useRouteChange from 'common/hooks/useRouteChange/useRouteChange';
import AssetPage from 'pages/AssetPage/AssetPage';
import Portfolio from 'pages/DashboardPage/Portfolio/Portfolio';
import Transactions from 'pages/DashboardPage/Transactions/Transactions';
import SettingsPage from 'pages/SettingsPage/SettingsPage';
import DashboardInfoСurrency from 'pages/DashboardPage/DashboardInfoСurrency/DashboardInfoСurrency';
import NetworkNProtocolsPage from 'pages/NetworkNProtocolsPage/NetworkNProtocolsPage';

function App() {
  useRouteChange();
  const {user} = useAuth();

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
          <Route path={RoutePath.Docs} element={<LandingPage />} />
          <Route
            path={RoutePath.InfoPage}
            element={
              <ProtectedRoute user={user}>
                <DashboardInfoСurrency />
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
            path={RoutePath.Asset}
            element={
              <ProtectedRoute user={user}>
                <AssetPage />
              </ProtectedRoute>
            }
          />
            <Route
              path={RoutePath.Network}
              element={
                <ProtectedRoute user={user}>
                  <NetworkNProtocolsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={RoutePath.Protocol}
              element={
                <ProtectedRoute user={user}>
                  <NetworkNProtocolsPage />
                </ProtectedRoute>
              }
            />
          <Route
            path={RoutePath.Settings}
            element={
              <ProtectedRoute user={user}>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route path={'*'} element={<Navigate to={RoutePath.BaseRoute} />} />
        </Fragment>
      </Routes>
    </div>
  );
}

export default App;
