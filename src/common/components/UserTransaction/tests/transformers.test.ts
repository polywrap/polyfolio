/* eslint @typescript-eslint/no-explicit-any: "off" */
import {
  __getApprovalSubjectForTest,
  __getTransferSubjectEventForTest,
  __getTransferTypeEventForTest,
  __reduceEventParamsForTest,
  mapTypeToWay,
  __getTransferSubjectForTest,
  __getTransferSubjectTransactionForTest,
  __getTransferTypeForTest,
  __getTransferTypeTransactionForTest,
  __getTransactionViewByLog,
  toTransactionView,
} from '../transformers';
import {ApprovalParams, EventProcessed} from '../UserTransaction.types';
import {Event} from 'common/hooks/useTransaction/useTransactions.types';

const inputData = {
  user: '0xa79e63e78eec28741e711f89a672a4c40876ebf3',
  txViewByLog: {
    type: 'Approval',
    icon: '/static/media/approvalTransaction.2b747309b4d8bd4fdc7093705020919a.svg',
    time: '15:07:36',
    way: 'Via',
    tokens: [
      {
        id: 'ethereum',
        tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      },
    ],
    subject: {
      icon: '/static/media/profile.da972f9328246b93e312.png',
      value: '0xa79e63e78eec28741e711f89a672a4c40876ebf3',
    },
  },
  transaction: {
    hash: '0xfae8f050417800a0ed0a57ba876086d6b8682aac7fcfcc8c8f9e5107be4228ec',
    from: '0xa79e63e78eec28741e711f89a672a4c40876ebf3',
    to: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    successful: true,
    value: '0',
    quote: '0.0',
    gasInfo: {
      offered: '55932',
      spent: '46610',
      price: '340809069528.0',
      quoteRate: '4678',
      quote: '4765',
    },
    logs: [
      {
        contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        logOffset: 396,
        topics: [
          '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
          '0x000000000000000000000000a79e63e78eec28741e711f89a672a4c40876ebf3',
          '0x00000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45',
        ],
        data: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
        event: {
          name: 'Approval',
          signature: 'Approval(indexed address owner, indexed address spender, uint256 value)',
          params: [
            {
              name: 'owner',
              type: 'address',
              indexed: true,
              decoded: true,
              value: '0xa79e63e78eec28741e711f89a672a4c40876ebf3',
            },
            {
              name: 'spender',
              type: 'address',
              indexed: true,
              decoded: true,
              value: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
            },
            {
              name: 'value',
              type: 'uint256',
              indexed: false,
              decoded: true,
              value:
                '115792089237316195423570985008687907853269984665640564039457584007913129639935',
            },
          ],
        },
      },
    ],
    timestamp: '2021-02-12T13:07:36Z',
    blockHeight: 61930000,
    offset: 4765,
  },
  event: {
    name: 'Approval',
    params: [
      {
        name: 'owner',
        type: 'address',
        decoded: true,
        indexed: true,
        value: '0xa79e63e78eec28741e711f89a672a4c40876ebf3',
      },
      {
        name: 'spender',
        type: 'address',
        decoded: true,
        indexed: true,
        value: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
      },
      {
        name: 'value',
        type: 'uint256',
        decoded: true,
        indexed: true,
        value: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      },
    ],
    signature: 'Approval(indexed address owner, indexed address spender, uint256 value)',
  } as Event,
  approvalParams: {
    params: {
      owner: '0xa79e63e78eec28741e711f89a672a4c40876ebf3',
      spender: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
      value: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    },
  } as any,
  transferParams: {
    params: {
      from: '0xa79e63e78eec28741e711f89a672a4c40876ebf3',
      to: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
      value: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    },
  } as any,
};

test('Reduce Event Params', () => {
  const result = __reduceEventParamsForTest(inputData.event);

  expect(result).toEqual({
    name: 'Approval',
    params: {
      owner: '0xa79e63e78eec28741e711f89a672a4c40876ebf3',
      spender: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
      value: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    },
    signature: 'Approval(indexed address owner, indexed address spender, uint256 value)',
  });
});

test('Get Approval Subject For Test', () => {
  const result = __getApprovalSubjectForTest(
    inputData.approvalParams as EventProcessed<ApprovalParams>,
  );

  expect(result).toEqual({
    icon: 'profile.png',
    value: '0xa79e63e78eec28741e711f89a672a4c40876ebf3',
  });
});

test('Get Transfer Subject Transaction', () => {
  const result = __getTransferSubjectEventForTest(inputData.transferParams, inputData.user);

  expect(result).toEqual({
    icon: 'profile.png',
    value: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
  });
});

test('Get Transfer Type Event', () => {
  const result = __getTransferTypeEventForTest(inputData.transferParams, inputData.user);

  expect(result).toBe('Send');
});

test('Map Type To Way', () => {
  const resultA = mapTypeToWay('Approval');
  const resultS = mapTypeToWay('Send');
  const resultR = mapTypeToWay('Receive');
  const resultE = mapTypeToWay('Exchange');

  expect(resultA).toBe('Via');
  expect(resultS).toBe('To');
  expect(resultR).toBe('From');
  expect(resultE).toBe('Via');
});

test('Get Transfer Subject', () => {
  const result = __getTransferSubjectForTest(inputData.transferParams, inputData.user);
  const result_1 = __getTransferSubjectForTest(inputData.transaction, inputData.user);

  expect(result).toEqual({
    icon: 'profile.png',
    value: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
  });
  expect(result_1).toEqual({
    icon: 'profile.png',
    value: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  });
});

test('Get Transfer Subject Transaction', () => {
  const result = __getTransferSubjectTransactionForTest(inputData.transaction, inputData.user);

  expect(result).toEqual({
    icon: 'profile.png',
    value: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  });
});

test('Get Transfer Type', () => {
  const result = __getTransferTypeForTest(inputData.transaction, inputData.user);

  expect(result).toEqual('Send');
});

test('Get Transfer Type Transaction', () => {
  const result = __getTransferTypeTransactionForTest(inputData.transaction, inputData.user);

  expect(result).toEqual('Send');
});

test('Get Tx View By Log', () => {
  const {transaction, user} = inputData;
  const result = __getTransactionViewByLog(transaction.logs[0], transaction, user);

  expect(result).toEqual({
    type: 'Approval',
    icon: 'approvalTransaction.svg',
    time: '15:07:36',
    way: 'Via',
    tokens: [
      {
        id: 'ethereum',
        tokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      },
    ],
    subject: {
      icon: 'profile.png',
      value: '0xa79e63e78eec28741e711f89a672a4c40876ebf3',
    },
  });
});

test('To tx view', () => {
  const result = toTransactionView(inputData.transaction, inputData.user);

  expect(result).toEqual({
    type: 'Approval',
    icon: 'approvalTransaction.svg',
    time: '15:07:36',
    way: 'Via',
    tokens: [
      {
        id: 'ethereum',
        tokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      },
    ],
    subject: {
      icon: 'profile.png',
      value: '0xa79e63e78eec28741e711f89a672a4c40876ebf3',
    },
  });
});
