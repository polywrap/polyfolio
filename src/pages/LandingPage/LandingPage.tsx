import React from 'react';

import styles from './LandingPage.module.scss';

import classNames from 'classnames';

import { ethers } from 'ethers';
import useAuth from 'common/hooks/useAuth/useAuth';
import Header from 'common/components/Header/Header';
import Footer from 'common/components/Footer/Footer';
import Button from 'common/components/Button/Button';
import useTheme from 'common/hooks/useTheme/useTheme';
import useWallet from 'common/hooks/useWallet/useWallet';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

function LandingPage() {
  const theme = useTheme();
  const {logIn} = useAuth();
  const {setWallet} = useWallet();
  const translation = useTranslation();

  const handleConnectingProcess = async () => {
    const provider = new ethers.providers.Web3Provider(window["ethereum"]);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const wallet: Record<string, unknown> = { provider, signer };
    setWallet(wallet)
    logIn(address)
  }

  return (
    <div className={classNames(styles.landing_page, styles[theme])}>
      <Header
        className={classNames(styles.header, styles.header_content)}
        inputClassName={styles.input}
      />

      <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.title_colored}>{translation.LandingPage.title}</span> -{' '}
          {translation.LandingPage.titleDescription}
        </h1>
        <div className={styles.subtitle}>
          <p>{translation.LandingPage.subtitle}</p>
          <p>{translation.LandingPage.subtitleAdditional}</p>
        </div>
        <Button onClick={handleConnectingProcess} title={translation.LandingPage.button} size={'large'} />
      </div>

      <Footer wrapperClassName={styles.footer} />
    </div>
  );
}

export default LandingPage;
