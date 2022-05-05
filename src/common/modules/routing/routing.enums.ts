enum RoutePath {
  BaseRoute = '/',

  RequestFeatures = '/request-features',
  Docs = '/docs',
  Polywrap = '/polywrap',
  Settings = '/settings',
  Discord = '/discord',
  Twitter = '/twitter',
  Github = '/git',

  RoadMap = '/roadmap',
  Support = '/support',
  Dashboard = '/account/:user',
  DashboardTransactions = '/account/:user/txns',
  Network = '/account/:user/network/:chainId',
  Asset = '/account/:user/network/:chainId/assets/:asset',
  Protocol = '/account/:user/network/:chainId/protocol/:protocol',
}

export default RoutePath;
