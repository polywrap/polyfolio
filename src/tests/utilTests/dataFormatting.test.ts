import * as dataFormatting from 'utils/dataFormatting';
import {
  balance,
  network,
  protocols,
  components,
  asset,
} from './testConstants';

test('Test Asset Sum', () => {
  const result = dataFormatting.getAssetsValueSum(components);
  expect(result).toBe(5757.06)
})

test('Eject Protocol From Networks', () => {
  const result = dataFormatting.ejectProtocolsFromNetwork(network);
  expect(result).toStrictEqual(protocols);
})

test('Get Claimable Value', () => {
  const result = dataFormatting.getClaimableValue(
    protocols,
    '0x870E4F7C9687Fe15b4505315eB6ba10fe00A3dB8'
  );
  const result_alt = dataFormatting.getClaimableValue(
    protocols,
    '0x35bD01FC9d6D5D81CA9E055Db88Dc49aa2c699A8'
  );

  expect(result).toBe<number>(0);
  expect(result_alt).toBe<number>(796);
})

test('Get Claimable Value For Curr Protocol', () => {
  const result = dataFormatting.getClaimableValueFromCurrProtocol(asset);
  expect(result).toBe<number>(199);
})

test('Eject Assets From Protocols', () => {
  const result = dataFormatting.ejectAssetsFromProtocol(protocols[0]);
  expect(result).toStrictEqual(components);
})
