import {
  __getApprovalSubjectForTest,
  __getTransferSubjectEventForTest,
  __getTransferTypeEventForTest,
  __reduceEventParamsForTest,
  mapTypeToWay,
} from '../transformers';
import {
  ApprovalParams,
  EventProcessed,
} from '../UserTransaction.types';
import {Event} from 'common/hooks/useTransaction/useTransactions.types';

const inputData = {
  user: '0xa79e63e78eec28741e711f89a672a4c40876ebf3',
  event: {
    name: 'Approval',
    params: [
      {
        name: 'owner',
        type: 'address',
        decoded: true,
        indexed: true,
        value: '0xa79e63e78eec28741e711f89a672a4c40876ebf3'
      },
      {
        name: 'spender',
        type: 'address',
        decoded: true,
        indexed: true,
        value: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45'
      },
      {
        name: 'value',
        type: 'uint256',
        decoded: true,
        indexed: true,
        value: '115792089237316195423570985008687907853269984665640564039457584007913129639935'
      }
    ],
    signature: 'Approval(indexed address owner, indexed address spender, uint256 value)'
  } as Event,
  approvalParams: {
    owner: '0xa79e63e78eec28741e711f89a672a4c40876ebf3',
    spender: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
    value: '115792089237316195423570985008687907853269984665640564039457584007913129639935'
  } as any,
  transferParams: {
    from: '0xa79e63e78eec28741e711f89a672a4c40876ebf3',
    to: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
    value: '115792089237316195423570985008687907853269984665640564039457584007913129639935'
  } as any,
}

test('Reduce Event Params', () => {
  const result = __reduceEventParamsForTest(inputData.event);

  expect(result).toEqual({
    owner: '0xa79e63e78eec28741e711f89a672a4c40876ebf3',
    spender: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
    value: '115792089237316195423570985008687907853269984665640564039457584007913129639935'
  });
})

test('Get Approval Subject For Test', () => {
  const result = __getApprovalSubjectForTest(inputData.approvalParams as EventProcessed<ApprovalParams>);

  expect(result).toEqual({
    icon: 'profile.svg',
    value: '0xa79e63e78eec28741e711f89a672a4c40876ebf3',
  });
})

test('Get Transfer Subject Transaction', () => {
  const result = __getTransferSubjectEventForTest(inputData.transferParams, inputData.user);

  expect(result).toEqual({
    icon: 'profile.svg',
    value: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45'
  });
})

test('Get Transfer Type Event', () => {
  const result = __getTransferTypeEventForTest(inputData.transferParams, inputData.user);

  expect(result).toBe('Send');
})

test('Map Type To Way', () => {
  const resultA = mapTypeToWay('Approval');
  const resultS = mapTypeToWay('Send');
  const resultR = mapTypeToWay('Receive');
  const resultE = mapTypeToWay('Exchange');

  expect(resultA).toBe('Via');
  expect(resultS).toBe('To');
  expect(resultR).toBe('From');
  expect(resultE).toBe('Via');
})
