/* eslint @typescript-eslint/no-explicit-any: "off" */
export interface TokenInfo {
  id: AssetPlatformID;
  symbol: AssetPlatformID;
  name: string;
  asset_platform_id: AssetPlatformID;
  platforms: Platform[];
  block_time_in_minutes: number;
  hashing_algorithm: null;
  categories: string[];
  public_notice: null;
  additional_notices: any[];
  localization: Tion[];
  description: Tion[];
  links: Links;
  image: Image;
  country_origin: string;
  genesis_date: null;
  contract_address: string;
  sentiment_votes_up_percentage: string;
  sentiment_votes_down_percentage: string;
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: string;
  developer_score: string;
  community_score: string;
  liquidity_score: string;
  public_interest_score: string;
  market_data: MarketData;
  community_data: CommunityData;
  developer_data: DeveloperData;
  public_interest_stats: PublicInterestStats;
  status_updates: any[];
  last_updated: string;
  tickers: Ticker[];
}

export enum AssetPlatformID {
  Ethereum = 'ethereum',
  Sushi = 'sushi',
  Weth = 'weth',
  WrappedFantom = 'wrapped-fantom',
}

export interface CommunityData {
  facebook_likes: null;
  twitter_followers: number;
  reddit_average_posts_48h: string;
  reddit_average_comments_48h: string;
  reddit_subscribers: number;
  reddit_accounts_active_48h: number;
  telegram_channel_user_count: null;
}

export interface Tion {
  locale: string;
  text: string;
}

export interface DeveloperData {
  forks: number;
  stars: number;
  subscribers: number;
  total_issues: number;
  closed_issues: number;
  pull_requests_merged: number;
  pull_request_contributors: number;
  code_additions_deletions_4_weeks: CodeAdditionsDeletions4_Weeks;
  commit_count_4_weeks: number;
}

export interface CodeAdditionsDeletions4_Weeks {
  additions: null;
  deletions: null;
}

export interface Image {
  thumb: string;
  small: string;
  large: string;
}

export interface Links {
  homepage: string[];
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
  announcement_url: string[];
  twitter_screen_name: string;
  facebook_username: string;
  bitcointalk_thread_identifier: null;
  telegram_channel_identifier: string;
  subreddit_url: string;
  repos_url: ReposURL;
}

export interface ReposURL {
  github: any[];
  bitbucket: any[];
}

export interface MarketData {
  current_price: Ath[];
  total_value_locked: string;
  mcap_to_tvl_ratio: string;
  fdv_to_tvl_ratio: string;
  roi: null;
  ath: Ath[];
  ath_change_percentage: AthChangePercentage[];
  ath_date: AthDateElement[];
  atl: Ath[];
  atl_change_percentage: AthChangePercentage[];
  atl_date: AthDateElement[];
  market_cap: FullyDilutedValuation[];
  market_cap_rank: number;
  fully_diluted_valuation: FullyDilutedValuation[];
  total_volume: FullyDilutedValuation[];
  high_24h: Ath[];
  low_24h: Ath[];
  price_change_24h: string;
  price_change_percentage_24h: string;
  price_change_percentage_7d: string;
  price_change_percentage_14d: string;
  price_change_percentage_30d: string;
  price_change_percentage_60d: string;
  price_change_percentage_200d: string;
  price_change_percentage_1y: string;
  market_cap_change_24h: string;
  market_cap_change_percentage_24h: string;
  price_change_24h_in_currency: Ath[];
  price_change_percentage_1h_in_currency: AthChangePercentage[];
  price_change_percentage_24h_in_currency: AthChangePercentage[];
  price_change_percentage_7d_in_currency: AthChangePercentage[];
  price_change_percentage_14d_in_currency: AthChangePercentage[];
  price_change_percentage_30d_in_currency: AthChangePercentage[];
  price_change_percentage_60d_in_currency: AthChangePercentage[];
  price_change_percentage_200d_in_currency: AthChangePercentage[];
  price_change_percentage_1y_in_currency: AthChangePercentage[];
  market_cap_change_24h_in_currency: FullyDilutedValuation[];
  market_cap_change_percentage_24h_in_currency: AthChangePercentage[];
  total_supply: string;
  max_supply: string;
  circulating_supply: string;
  last_updated: string;
}

export interface Ath {
  currency: string;
  price: string;
}

export interface AthChangePercentage {
  currency: string;
  percentage: string;
}

export interface AthDateElement {
  currency: string;
  date: string;
}

export interface FullyDilutedValuation {
  currency: string;
  volume: string;
}

export interface Platform {
  platform: string;
  contract_address: string;
}

export interface PublicInterestStats {
  alexa_rank: number;
  bing_matches: null;
}

export interface Ticker {
  base: Base;
  target: string;
  market: Market;
  last: string;
  volume: string;
  converted_last: Ath[];
  converted_volume: FullyDilutedValuation[];
  trust_score: TrustScore;
  bid_ask_spread_percentage: string;
  timestamp: string;
  last_traded_at: string;
  last_fetch_at: string;
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url: string;
  token_info_url: null | string;
  coin_id: AssetPlatformID;
  target_coin_id: null | string;
}

export enum Base {
  Sushi = 'SUSHI',
  The0X0B3F868E0Be5597D5Db7Feb59E1Cadbb0Fdda50A = '0X0B3F868E0BE5597D5DB7FEB59E1CADBB0FDDA50A',
  The0X2170Ed0880Ac9A755Fd29B2688956Bd959F933F8 = '0X2170ED0880AC9A755FD29B2688956BD959F933F8',
  The0X21Be370D5312F44Cb42Ce377Bc9B8A0Cef1A4C83 = '0X21BE370D5312F44CB42CE377BC9B8A0CEF1A4C83',
  The0X6B3595068778Dd592E39A122F4F5A5Cf09C90Fe2 = '0X6B3595068778DD592E39A122F4F5A5CF09C90FE2',
  The0X947950Bcc74888A40Ffa2593C5798F11Fc9124C4 = '0X947950BCC74888A40FFA2593C5798F11FC9124C4',
  The0Xbec775Cb42Abfa4288De81F387A9B1A3C4Bc552A = '0XBEC775CB42ABFA4288DE81F387A9B1A3C4BC552A',
}

export interface Market {
  name: string;
  identifier: string;
  has_trading_incentive: boolean;
}

export enum TrustScore {
  Green = 'green',
}
