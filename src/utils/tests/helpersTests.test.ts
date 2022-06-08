import {
  filteredDropdown,
  fromBnToNumber,
  getStringFromPath,
  rmCommasFromNum,
  shortenedAddress,
} from 'utils/helpers';
import {detectAssetOrProtocolPage} from 'utils/helpers';

test('Converting from BN with defined decimal', () => {
  const result = fromBnToNumber('1000000000000000000000', 18);
  const resultAlt = fromBnToNumber('1000000000', 6);
  const result_alt = fromBnToNumber('100000000000', 8);

  expect(result).toBe(1000);
  expect(resultAlt).toBe(1000);
  expect(result_alt).toBe(1000);
});

test('Detect Page by pathname', () => {
  const result = detectAssetOrProtocolPage('account/0xe9r8g49ds194tg9e8t4g9s1');
  const result_protocol = detectAssetOrProtocolPage(
    '/account/0xe9r8g49ds194tg9e8t4g9s1/network/1/protocol/uniswap_2',
  );
  const result_asset = detectAssetOrProtocolPage(
    '/account/0xe9r8g49ds194tg9e8t4g9s1/network/1/assets/fwb',
  );

  expect(result).toBe('default');
  expect(result_protocol).toBe('protocol');
  expect(result_asset).toBe('asset');
});

describe('Filtered dropdown', () => {
  const array = [
    {
      id: 1,
      ok: true,
    },
    {
      id: 2,
      ok: false,
    },
    {
      id: 3,
      ok: false,
    },
    {
      id: 4,
      ok: true,
    },
  ];
  it('Correct values', () => {
    const result = filteredDropdown(array, 3);
    expect(result).toEqual([
      {
        id: 1,
        ok: true,
      },
      {
        id: 2,
        ok: false,
      },
      {
        id: 4,
        ok: true,
      },
    ]);
  });
  it('Unpredicted values', () => {
    const result = filteredDropdown(array, 15);

    expect(result).toEqual(array);
  });
  it('Undefined values', () => {
    const result = filteredDropdown(undefined, 1);

    expect(result).toBe(undefined);
  });
});

describe('Removing commas from value', () => {
  it('Number value with comma', () => {
    const result = rmCommasFromNum('10,000');

    expect(result).toBe('10000');
  });
  it('Value without comma', () => {
    const result = rmCommasFromNum('10000');

    expect(result).toBe('10000');
  });
  it('Value without more than one comma', () => {
    const result = rmCommasFromNum('100,000,000');

    expect(result).toBe('100000000');
  });
  it('Unpredictable values', () => {
    const resultUndefinedCase = rmCommasFromNum(undefined);
    const resultNullCase = rmCommasFromNum(null);
    const resultEmptyString = rmCommasFromNum('');

    expect(resultEmptyString).toBe(null);
    expect(resultUndefinedCase).toBe(null);
    expect(resultNullCase).toBe(null);
  });
});

describe('Ejecting fragment from pass string', () => {
  it('Correct values', () => {
    const result = getStringFromPath('/account/0xe9r8g49ds194tg9e8t4g9s1/network/1/assets/fwb', 3);

    expect(result).toBe('network');
  });
  it('Unpredictable values', () => {
    const resultUndefinedValue = getStringFromPath(undefined, 3);
    const resultNullValue = getStringFromPath(undefined, 3);
    const resultWithOutOfRangeIndex = getStringFromPath(
      '/account/0xe9r8g49ds194tg9e8t4g9s1/network/1/assets/fwb',
      15,
    );
    const resultWithUndefinedIndex = getStringFromPath(
      '/account/0xe9r8g49ds194tg9e8t4g9s1/network/1/assets/fwb',
      undefined,
    );
    const resultWithNullIndex = getStringFromPath(
      '/account/0xe9r8g49ds194tg9e8t4g9s1/network/1/assets/fwb',
      null,
    );

    expect(resultUndefinedValue).toBe(undefined);
    expect(resultNullValue).toBe(undefined);
    expect(resultWithOutOfRangeIndex).toBe(
      '/account/0xe9r8g49ds194tg9e8t4g9s1/network/1/assets/fwb',
    );
    expect(resultWithUndefinedIndex).toBe(
      '/account/0xe9r8g49ds194tg9e8t4g9s1/network/1/assets/fwb',
    );
    expect(resultWithNullIndex).toBe('/account/0xe9r8g49ds194tg9e8t4g9s1/network/1/assets/fwb');
  });
});

describe('Shortened function', () => {
  it('Correct data', () => {
    const resultWithNonZeroSize = shortenedAddress('0xa79e63e78eec28741e711f89a672a4c40876ebf3', 4);

    expect(resultWithNonZeroSize).toBe('0xa7...ebf3');
  });
  it('Correct data with limit size values', () => {
    const resultWithZeroSize = shortenedAddress('0xa79e63e78eec28741e711f89a672a4c40876ebf3', 0);
    const resultWithLimitedSize = shortenedAddress(
      '0xa79e63e78eec28741e711f89a672a4c40876ebf3',
      19,
    );
    const resultWithLimitedSize_alt = shortenedAddress(
      '0xa79e63e78eec28741e711f89a672a4c40876ebf3',
      20,
    );

    expect(resultWithZeroSize).toBe(undefined);
    expect(resultWithLimitedSize).toBe('0xa79e63e78eec28741...f89a672a4c40876ebf3');
    expect(resultWithLimitedSize_alt).toBe('0xa79e63e78eec28741e711f89a672a4c40876ebf3');
  });
  it('Unpredictable inputs', () => {
    const resultWithUndefined = shortenedAddress(undefined, 1);
    const resultWithNull = shortenedAddress(null, 1);
    const resultWithUndefinedSize = shortenedAddress(
      '0xa79e63e78eec28741e711f89a672a4c40876ebf3',
      undefined,
    );
    const resultWithNullSize = shortenedAddress('0xa79e63e78eec28741e711f89a672a4c40876ebf3', null);

    expect(resultWithNull).toBe(undefined);
    expect(resultWithUndefined).toBe(undefined);
    expect(resultWithNullSize).toBe('0xa79e63e78eec28741e711f89a672a4c40876ebf3');
    expect(resultWithUndefinedSize).toBe('0xa7...ebf3');
  });
});
