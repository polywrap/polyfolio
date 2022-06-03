import {__getTokenAmountInCurrencyForTesting, __getTokenAmountStringForTesting} from '../useTokenView';

describe('Get Token Amount In Currency', () => {
  it('Positive numbers', () => {
    const resultInteger = __getTokenAmountInCurrencyForTesting('15000', '123', '$');
    const resultFloat = __getTokenAmountInCurrencyForTesting('15000.12', '123.56', '$');
    
    expect(resultInteger).toBe('+$1,845,000.0');
    expect(resultFloat).toBe('+$1,853,414.827');
  })
  it('Negative numbers', () => {
    const resultInteger = __getTokenAmountInCurrencyForTesting('-15000', '123', '$');
    const resultIntegerAlt_1 = __getTokenAmountInCurrencyForTesting('15000', '-123', '$');
    const resultIntegerAlt_2 = __getTokenAmountInCurrencyForTesting('-15000', '-123', '$');
    const resultFloat = __getTokenAmountInCurrencyForTesting('-15000.12', '123.56', '$');
    const resultFloatAlt_1 = __getTokenAmountInCurrencyForTesting('15000.12', '-123.56', '$');
    const resultFloatAlt_2 = __getTokenAmountInCurrencyForTesting('-15000.12', '-123.56', '$');
    
    expect(resultInteger).toBe('-$1,845,000.0');
    expect(resultIntegerAlt_1).toBe('-$1,845,000.0');
    expect(resultIntegerAlt_2).toBe('+$1,845,000.0');
    expect(resultFloat).toBe('-$1,853,414.827');
    expect(resultFloatAlt_1).toBe('-$1,853,414.827');
    expect(resultFloatAlt_2).toBe('+$1,853,414.827');
  })
  it('Undefined values', () => {
    const resultIntegerUndefined_1 = __getTokenAmountInCurrencyForTesting(undefined, '123', '$');
    const resultIntegerUndefined_2 = __getTokenAmountInCurrencyForTesting('15000', undefined, '$');
    const resultIntegerUndefined_3 = __getTokenAmountInCurrencyForTesting('15000', '123', undefined);

    const resultIntegerNull_1 = __getTokenAmountInCurrencyForTesting(null, '123', '$');
    const resultIntegerNull_2 = __getTokenAmountInCurrencyForTesting('15000', null, '$');
    const resultIntegerNull_3 = __getTokenAmountInCurrencyForTesting('15000', '123', null);

    expect(resultIntegerUndefined_1).toBe(undefined);
    expect(resultIntegerUndefined_2).toBe(undefined);
    expect(resultIntegerUndefined_3).toBe('+?1,845,000.0');
    expect(resultIntegerNull_1).toBe(undefined);
    expect(resultIntegerNull_2).toBe(undefined);
    expect(resultIntegerNull_3).toBe('+?1,845,000.0');
  })
  it('Wrong values', () => {
    const resultWrongValue = __getTokenAmountInCurrencyForTesting('aldfnsafn', '123', '$');
    const resultWrongPrice = __getTokenAmountInCurrencyForTesting('15000', 'pakds;', '$');
    const resultWrongCurrency = __getTokenAmountInCurrencyForTesting('15000', '123', '!');

    expect(resultWrongValue).toBe(undefined);
    expect(resultWrongPrice).toBe(undefined);
    expect(resultWrongCurrency).toBe(undefined);
  })
});

describe('Get Token Amount String', () => {
  it('Correct numbers', () => {
    const resultInteger = __getTokenAmountStringForTesting('15,000', 'FWB');
    const resultIntegerNegative = __getTokenAmountStringForTesting('-15,000', 'FWB');
    const resultFloat = __getTokenAmountStringForTesting('15,000.12', 'FWB');
    const resultFloatNegative = __getTokenAmountStringForTesting('-15,000.12', 'FWB');
    
    expect(resultInteger).toBe('+15,000.00 FWB');
    expect(resultIntegerNegative).toBe('-15,000.00 FWB');
    expect(resultFloat).toBe('+15,000.12 FWB');
    expect(resultFloatNegative).toBe('-15,000.12 FWB');
  })
  it('Undefined values', () => {
    const resultIntegerUndefined_1 = __getTokenAmountStringForTesting(undefined, 'FWB');
    const resultIntegerUndefined_2 = __getTokenAmountStringForTesting('15,000', undefined);

    const resultIntegerNull_1 = __getTokenAmountStringForTesting(null, 'FWB');
    const resultIntegerNull_2 = __getTokenAmountStringForTesting('15,000', null);

    expect(resultIntegerUndefined_1).toBe('?? FWB');
    expect(resultIntegerUndefined_2).toBe('+15,000.00 ??');
    expect(resultIntegerNull_1).toBe('?? FWB');
    expect(resultIntegerNull_2).toBe('+15,000.00 ??');
  })
  it('Wrong values', () => {
    const resultWrongValue = __getTokenAmountStringForTesting('aldfnsafn', 'FWB');

    expect(resultWrongValue).toBe(undefined);
  })
});
