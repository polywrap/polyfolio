import {getClaimableValueFromCurrProtocol} from 'common/components/ProtocolsTable/ProtocolsItem/ProtocolTableItem.utis';
import * as dataFormatting from 'utils/dataFormatting';
import {protocols, components, asset, marketCapArray, volume, params, balance} from './testConstants';

test('Asset Sum', () => {
  const result = dataFormatting.getAssetsValueSum(components);
  expect(result).toBe(5757.06);
});

test('Get Claimable Value', () => {
  const result = dataFormatting.getClaimableValue(
    protocols,
    '0x870E4F7C9687Fe15b4505315eB6ba10fe00A3dB8',
  );
  const result_alt = dataFormatting.getClaimableValue(
    protocols,
    '0x35bD01FC9d6D5D81CA9E055Db88Dc49aa2c699A8',
  );

  expect(result).toBe<number>(0);
  expect(result_alt).toBe<number>(796);
});

test('Get Claimable Value For Curr Protocol', () => {
  const result = getClaimableValueFromCurrProtocol(asset);
  expect(result).toBe<number>(199);
});

test('Eject Assets From Protocols', () => {
  const result = dataFormatting.ejectAssetsFromProtocol(protocols[0]);
  expect(result).toStrictEqual([components, components]);
});

test('Get Market Currency', () => {
  const result = dataFormatting.getMarketCap('aed', marketCapArray);

  expect(result).toBe('56289965');
});

test('Get Volume', () => {
  const result = dataFormatting.getVolume('aed', volume);

  expect(result).toBe('151580');
});

test('Detect chainId and protocol for asset', () => {
  const result = dataFormatting.detectProtocolAndChainIdForAsset([...protocols], 'FWB');

  expect(result).toEqual(['ethereum', 'sushibar_v1']);
})

test('Get event type', () => {
  const result = dataFormatting.getEventType('transfer', '0x870E4F7C9687Fe15b4505315eB6ba10fe00A3dB8', params)

  expect(result).toBe('send');
})

test('Get asset by address', () => {
  const result = dataFormatting.getAssetByAddress([balance], '0x0a965a4caf929338044c593d82d385c4c898d8c6');

  expect(result).toEqual(balance);
})
