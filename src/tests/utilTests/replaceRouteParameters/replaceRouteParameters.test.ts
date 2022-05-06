import replaceRouteParameters from 'utils/replaceRouteParameters';
import RoutePath from 'common/modules/routing/routing.enums';



test('Replace route parameters test: single parameter', () => {
  const result = replaceRouteParameters(RoutePath.Dashboard, {user: '0x5f06596lwejflsfer'});
  const result_alt = replaceRouteParameters(RoutePath.Dashboard, {search: '0x5f06596lwejflsfer'});

  expect(result).toBe('/account/0x5f06596lwejflsfer');
  expect(result_alt).toBe('/account/0x5f06596lwejflsfer');
})

test('Replace route parameters test: many parameters', () => {
  const result = replaceRouteParameters(
    RoutePath.Asset,
    {
      user: '0x5f06596lwejflsfer',
      chainId: '1',
      asset: 'fwb',
    }
  );
  const result_alt = replaceRouteParameters(
    RoutePath.Asset,
    {
      search: '0x5f06596lwejflsfer',
      chainId: '1',
      asset: 'fwb',
    }
  );

  expect(result).toBe('/account/0x5f06596lwejflsfer/network/1/assets/fwb');
  expect(result_alt).toBe('/account/0x5f06596lwejflsfer/network/1/assets/fwb');
})

test('Replace route parameters test: parameter collision', () => {
  const result = replaceRouteParameters(
    RoutePath.Dashboard,
    {
      user: '0x5f06596lwejflsfer',
      search: '0xFe5k1a0457fa77as45'
    }
  );

  expect(result).toBe('/account/0xFe5k1a0457fa77as45');
})
