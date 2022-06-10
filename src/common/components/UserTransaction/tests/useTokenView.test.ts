import {
  __getTokenAmountInCurrencyForTesting,
  __getTokenAmountStringForTesting,
} from '../useTokenView';

describe('Get Token Amount In Currency', () => {
  it('Positive numbers', () => {
    const resultInteger = __getTokenAmountInCurrencyForTesting('15000', '123', '$');
    const resultFloat = __getTokenAmountInCurrencyForTesting('15000.12', '123.56', '$');

    expect(resultInteger).toBe('+$1,845,000');
    expect(resultFloat).toBe('+$1,853,414.83');
  });
  it('Negative numbers', () => {
    const resultInteger = __getTokenAmountInCurrencyForTesting('-15000', '123', '$');
    const resultIntegerAlt_1 = __getTokenAmountInCurrencyForTesting('15000', '-123', '$');
    const resultIntegerAlt_2 = __getTokenAmountInCurrencyForTesting('-15000', '-123', '$');
    const resultFloat = __getTokenAmountInCurrencyForTesting('-15000.12', '123.56', '$');
    const resultFloatAlt_1 = __getTokenAmountInCurrencyForTesting('15000.12', '-123.56', '$');
    const resultFloatAlt_2 = __getTokenAmountInCurrencyForTesting('-15000.12', '-123.56', '$');

    expect(resultInteger).toBe('-$1,845,000');
    expect(resultIntegerAlt_1).toBe('-$1,845,000');
    expect(resultIntegerAlt_2).toBe('+$1,845,000');
    expect(resultFloat).toBe('-$1,853,414.83');
    expect(resultFloatAlt_1).toBe('-$1,853,414.83');
    expect(resultFloatAlt_2).toBe('+$1,853,414.83');
  });
});

describe('Get Token Amount String', () => {
  it('Correct numbers', () => {
    const resultInteger = __getTokenAmountStringForTesting('15000', 'FWB');
    const resultIntegerNegative = __getTokenAmountStringForTesting('-15000', 'FWB');
    const resultFloat = __getTokenAmountStringForTesting('15000.12', 'FWB');
    const resultFloatNegative = __getTokenAmountStringForTesting('-15000.12', 'FWB');

    expect(resultInteger).toBe('+15,000 FWB');
    expect(resultIntegerNegative).toBe('-15,000 FWB');
    expect(resultFloat).toBe('+15,000.12 FWB');
    expect(resultFloatNegative).toBe('-15,000.12 FWB');
  });
});
