import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { RecoilRoot } from 'recoil';

import App from './App';
import 'common/themes/styles.scss';
import { Web3ApiProvider } from '@web3api/react';
import { ethereumPlugin } from '@web3api/ethereum-plugin-js';
import reportWebVitals from './reportWebVitals';
import ThemeContext from 'common/themes/Themes.context';
import WalletContext from 'common/services/Wallet.context';
import CurrencyContext from 'common/currency/Currency.context';
import NetworksContextProvider from 'common/networks/Networks.context';
import LocalizationContext from 'common/localization/Localization.context';
import FiltersContextProvider from 'common/hooks/useFiltersTables/Filters.context';

console.warn = () => { };

if (process.env.NODE_ENV !== 'development') {
  console.error = () => { };
}

const plugins = [
  {
    uri: "ens/ethereum.web3api.eth",
    plugin: ethereumPlugin({
      networks: {
        mainnet: {
          provider:
            "https://mainnet.infura.io/v3/b00b2c2cc09c487685e9fb061256d6a6",
        },
      },
    }),
  },
]

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeContext>
        <LocalizationContext>
          <NetworksContextProvider>
            <FiltersContextProvider>
              <CurrencyContext>
                <BrowserRouter>
                  <WalletContext>
                    <Web3ApiProvider plugins={plugins}>
                      <App />
                    </Web3ApiProvider>
                  </WalletContext>
                </BrowserRouter>
              </CurrencyContext>
            </FiltersContextProvider>
          </NetworksContextProvider>
        </LocalizationContext>
      </ThemeContext>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
