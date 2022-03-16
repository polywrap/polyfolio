import React, { ReactNode/* , useEffect */ } from 'react';

import styles from './DashboardPage.module.scss';

import classNames from 'classnames';

import Header from 'common/components/Header/Header';
import Footer from 'common/components/Footer/Footer';
import useTheme from 'common/hooks/useTheme/useTheme';
import Sidebar from 'common/components/Sidebar/Sidebar';
//import { useWeb3ApiClient, useWeb3ApiQuery } from '@web3api/react';

function DashboardPage({ children }: { children: ReactNode }) {
  const theme = useTheme();
  //const client = useWeb3ApiClient();
  //const query = useWeb3ApiQuery();

  // example
  /* useEffect(() => {
    client.query({
      uri: 'ipfs/QmRYP5qwQd7AotVbtcx7KhN8HuHX9DCg8sS9LVE4kstpVw',
      query: '',
    })
  }, []) */

  //examle from another project
  /* const { execute } = useWeb3ApiQuery({
    uri: `ipfs/QmRYP5qwQd7AotVbtcx7KhN8HuHX9DCg8sS9LVE4kstpVw`,
    query: `mutation {
    registerDomain(
      domain: $domain
      owner: $owner
      registrarAddress: $registrarAddress
      registryAddress: $registryAddress
      network: $network
    )
  }`,
  });

  await execute({ domain: 'dfasfd.sad', owner: 'dsfasdf', ...}) */

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
