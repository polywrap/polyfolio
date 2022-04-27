import React, {ReactNode, useEffect} from 'react';

import styles from './DashboardPage.module.scss';

import classNames from 'classnames';

import {useWeb3ApiQuery} from '@web3api/react';
import useAuth from 'common/hooks/useAuth/useAuth';
import Header from 'common/components/Header/Header';
import Footer from 'common/components/Footer/Footer';
import useTheme from 'common/hooks/useTheme/useTheme';
import Sidebar from 'common/components/Sidebar/Sidebar';

function DashboardPage({children}: {children: ReactNode}) {
  const {user} = useAuth();
  const theme = useTheme();

  const {execute} = useWeb3ApiQuery({
    uri: `ipfs/QmRYP5qwQd7AotVbtcx7KhN8HuHX9DCg8sS9LVE4kstpVw`,
    query: `query {
      getAccountBalance(
        accountAddress: $accountAddress
        vsCurrencies: $vsCurrencies
        noTruncate: $noTruncate
        underlyingPrice: $underlyingPrice
      )
    }`,
  });

  useEffect(() => {
    // const getData = async () => {
    //   const data = await execute({
    //     accountAddress: user,
    //     vsCurrencies: [],
    //     noTruncate: false,
    //     underlyingPrice: false,
    //   });
    //   console.log(data);
    // };
    // getData();
  }, [execute, user]);

  return (
    <div className={classNames(styles.landing_page, styles[theme])}>
      <Header inputClassName={styles.input} />
      <div className={styles.container}>
        <aside className={styles.aside}>
          <Sidebar />
        </aside>
        <main className={styles.main}>
          {children}
          <Footer wrapperClassName={styles.footer} />
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
