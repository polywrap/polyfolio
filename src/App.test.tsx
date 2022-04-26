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

test('renders header', () => {
  render(
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
    </RecoilRoot>,
  );

  const header = screen.queryByTestId('header');

  expect(header).toBeVisible();
});

test('test isFour', () => {
  const isFour = 2 + 2;

  expect(isFour).toBe(4);
});

test('renders isSix', () => {
  const isSix = 2 + 2 * 2;

  expect(isSix).toBe(6);
});
