import {detectAssetOrProtocolPage} from 'utils/helpers';

test('Detect Page by pathname', () => {
  const result = detectAssetOrProtocolPage('/dashboard/0xe9r8g49ds194tg9e8t4g9s1');
  const result_protocol = 
  detectAssetOrProtocolPage('/account/0xe9r8g49ds194tg9e8t4g9s1/network/1/protocol/uniswap_2');
  const result_asset = 
  detectAssetOrProtocolPage('/account/0xe9r8g49ds194tg9e8t4g9s1/network/1/assets/fwb');

  expect(result).toBeNull();
  expect(result_protocol).toBe('protocol');
  expect(result_asset).toBe('asset');
})
