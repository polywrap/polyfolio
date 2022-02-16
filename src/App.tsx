import React, {Fragment} from 'react';
import {Route, Routes} from 'react-router-dom';

import styles from './App.module.scss';

import LandingPage from 'pages/LandingPage/LandingPage';
import RoutePath from 'common/modules/routing/routing.enums';

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Fragment>
          <Route path={RoutePath.BaseRoute} element={<LandingPage />} />
        </Fragment>
      </Routes>
    </div>
  );
}

export default App;
