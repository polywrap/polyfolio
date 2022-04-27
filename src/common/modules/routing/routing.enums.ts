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
  Asset = '/asset/:id',
  Network = '/network/:id',
  Protocol = '/:net/protocol/:id',
  Dashboard = '/dashboard/portfolio',
  DashboardAlternative = '/dashboard/:id',
  DashboardTransactions = '/dashboard/transactions',
}

export default RoutePath;
