import {Event} from 'common/hooks/useTransaction/useTransactions.types';

export interface ITransaction {
  id: string;
  type: string;
  icon: string;
  time: string;
  token: [
    {
      id: string;
      icon: string;
      token_amount: string;
      token_ticker: string;
      dollar_amount: number | string;
    },
  ];
  subjectOfAction: {
    icon: string;
    address: string;
  };
}

export enum SupportedEvent {
  Transfer = 'Transfer',
  Approval = 'Approval',
  Swap = 'Exchange',
}

export interface TransferParams {
  from: string;
  to: string;
  value: string;
}

export interface ApprovalParams {
  owner: string;
  spender: string;
  value: string;
}

export interface ExchangeParams {
  sender: string;
  amount0In: string;
  amount1In: string;
  amount0Out: string;
  amount1Out: string;
  to: string;
}

export interface EventProcessed<TParams = unknown> extends Omit<Event, 'params'> {
  params: TParams;
}
