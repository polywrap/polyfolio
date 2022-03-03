import iconsObj from 'assets/icons/iconsObj';

export const data = [
  {
    id: 1,
    type: 'send',
    icon: iconsObj.sendTransaction,
    time: '10:09 AM',
    token: [
      {
        id: '1.1',
        icon: iconsObj.assetsToken,
        token_amount: '5,323.39',
        token_ticker: 'AVAX',
        dollar_amount: '163.63',
      }
    ],
    address: '0x378...3832',
  },
  {
    id: 2,
    type: 'approval',
    icon: iconsObj.approvalTransaction,
    time: '10:03 AM',
    token: [
      {
        id: '2.1',
        icon: iconsObj.assetsToken,
        token_amount: '',
        token_ticker: 'AVAX',
        dollar_amount: '',
      }
    ],
    address: '0x378...3832',
  },
  {
    id: 3,
    type: 'receive',
    icon: iconsObj.receiveTransaction,
    time: '9:33 AM',
    token: [
      {
        id: '3.1',
        icon: iconsObj.assetsToken,
        token_amount: '5,323.39',
        token_ticker: 'AVAX',
        dollar_amount: '163.63',
      }
    ],
    address: '0x378...3832',
  },
  {
    id: 4,
    type: 'approval',
    icon: iconsObj.approvalTransaction,
    time: '8:23 AM',
    token: [
      {
        id: '4.1',
        icon: iconsObj.assetsToken,
        token_amount: '',
        token_ticker: 'Polygon Token',
        dollar_amount: '',
      }
    ],
    address: '0x378...3832',
  },
  {
    id: 5,
    type: 'exchange',
    icon: iconsObj.exchangeTransaction,
    time: '10:03 AM',
    token: [
      {
        id: '5.1',
        icon: iconsObj.assetsUsdt,
        token_amount: '12,938',
        token_ticker: 'USDT',
        dollar_amount: '6,393.63',
      },
      {
        id: '5.2',
        icon: iconsObj.assetsToken,
        token_amount: '1,938',
        token_ticker: 'GRT',
        dollar_amount: '6,393.63',
      },
    ],
    address: '0x378...3832',
  },
  {
    id: 6,
    type: 'send',
    icon: iconsObj.sendTransaction,
    time: '10:09 AM',
    token: [
      {
        id: '6.1',
        icon: iconsObj.assetsToken,
        token_amount: '5,323.39',
        token_ticker: 'AVAX',
        dollar_amount: '163.63',
      }
    ],
    address: '0x378...3832',
  },
]
