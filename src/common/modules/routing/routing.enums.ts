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
  Asset = '/:network/:protocol/:asset/:user',
  Network = '/:network/:user',
  Protocol = '/:network/:protocol/:user',
  Dashboard = '/dashboard/:portfolio',
  DashboardTransactions = '/dashboard/transactions/:user',
}

export default RoutePath;
