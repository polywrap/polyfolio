import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import App from './App';

import {RecoilRoot} from 'recoil';

import {Web3ApiProvider} from '@web3api/react';
import ThemeContext from 'common/themes/Themes.context';
import WalletContext from 'common/services/Wallet.context';
import CurrencyContext from 'common/currency/Currency.context';
import LocalizationContext from 'common/localization/Localization.context';
import FiltersContextProvider from 'common/hooks/useFiltersTables/Filters.context';

global.scroll = jest.fn();
global.ResizeObserver = require('resize-observer-polyfill');
global.console = {
  ...console,
  warn: jest.fn(),
};

const AppWithContext = () => (
  <RecoilRoot>
    <ThemeContext>
      <LocalizationContext>
        <FiltersContextProvider>
          <CurrencyContext>
            <BrowserRouter>
              <WalletContext>
                <Web3ApiProvider>
                  <App />
                </Web3ApiProvider>
              </WalletContext>
            </BrowserRouter>
          </CurrencyContext>
        </FiltersContextProvider>
      </LocalizationContext>
    </ThemeContext>
  </RecoilRoot>
);

test('renders header', () => {
  render(<AppWithContext />);

  const header = screen.queryByTestId('header');

  expect(header).toBeVisible();
});

test('renders footer', () => {
  render(<AppWithContext />);

  const footer = screen.queryAllByTestId('footer')[0];

  expect(footer).toBeVisible();
});

test('renders nothing', () => {
  render(<AppWithContext />);

  const nothing = screen.queryByTestId('nothing');

  expect(nothing).toBeNull();
});
