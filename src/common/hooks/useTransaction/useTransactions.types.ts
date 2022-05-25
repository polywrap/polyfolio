// HOOK UTIL TYPES
export interface Variables extends Record<string, unknown> {
  account: string;
  options?: Options;
}

export interface Options {
  pagination?: PaginationOptions;
  blockRange?: BlockRangeOptions;
}

export interface PaginationOptions {
  page: number;
  perPage: number;
}

export interface BlockRangeOptions {
  startBlock: number;
  endBlock: number;
}

// RESPONSE TYPE
export interface TransactionsList extends Record<string, unknown> {
  account: string;
  chainId: string;
  quoteCurrency: string;
  transactions: Transaction[];
  pagination: Pagination;
  updatedAt?: string;
  nextUpdateAt?: string;
}

interface Transaction {
  hash: string;
  from: string;
  to: string;
  successful: Boolean;
  value: string;
  quote?: string;
  gasInfo: GasInfo;
  logs: EventLog[];
  timestamp: string;
  blockHeight: number | string;
  offset: number;
}
interface Pagination {
  total?: number;
  perPage?: number;
  page?: number;
  hasMore?: boolean;
}

interface GasInfo {
  offered: string; //# Gas offered for the transaction
  spent: string; //# Gas spent for the transaction
  price: string; //# Gas price in wei (BigDecimal)
  quoteRate?: string; //# rate of native currency in quoted currency (BigDecimal)
  quote?: string; //# Gas price in quote currency (BigDecimal)
}

interface EventLog {
  contractAddress: string;
  logOffset: number;
  topics: string[];
  data: string;
  event?: Event;
}

interface Event {
  name: string;
  signature: string;
  params: EventParam[];
}

interface EventParam {
  name: string;
  type: string;
  indexed: boolean;
  decoded: boolean;
  value: string;
}
