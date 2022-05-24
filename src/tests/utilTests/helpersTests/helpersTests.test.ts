import {fromBnToNumber} from 'utils/helpers';

test('Test converting from BN with defined decimal', () => {
  const result = fromBnToNumber('1000000000000000000000', 18);
  const resultAlt = fromBnToNumber('1000000000', 6);
  const result_alt = fromBnToNumber('100000000000', 8);

  expect(result).toBe(1000);
  expect(resultAlt).toBe(1000);
  expect(result_alt).toBe(1000);
});
