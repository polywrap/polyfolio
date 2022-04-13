import moment from 'moment';
import iconsObj from 'assets/icons/iconsObj';
import useAuth from 'common/hooks/useAuth/useAuth';
import transactionState from 'common/modules/atoms/transactionState';
import balanceState from 'common/modules/atoms/balanceState';
import {useRecoilValue} from 'recoil';
import {ejectAssetsFromProtocol, findTokenName, getEventIcon, getEventType, getTokenAmount, getTokenPrice, getTransactionAddress} from 'utils/dataFormating';

const useTransactions = () => {
  const state = useRecoilValue(transactionState);
  const balance = useRecoilValue(balanceState);
  const {user} = useAuth();
  const data = [];

  const assets = ejectAssetsFromProtocol(balance?.ethereum['protocols']);
  console.log(assets);
  console.log(state);

  state?.transactions.forEach(transaction => {
    const event = getEventType(
      transaction.logs[0].event.name,
      user,
      transaction.logs[0].event.params
    );
    const icon = getEventIcon(
      transaction.logs[0].event.name,
      user,
      transaction.logs[0].event.params
    );
    const tokenTicker = findTokenName(assets, transaction.logs[0].contractAddress);
    const tokenAmount = getTokenAmount(
      transaction.logs[0].event.params[2].value,
      assets,
      tokenTicker
    );
    const tokenPrice = getTokenPrice(assets, tokenTicker);

    data.push({
      id: transaction.offset,
      type: event,
      icon,
      time: moment(transaction.timestamp).utc().format('hh:mm'),
      token: [
        {
          id: '1.1',
          icon: iconsObj.assetsToken,
          token_amount: tokenAmount,
          token_ticker: tokenTicker,
          dollar_amount: tokenPrice,
        }
      ],
      subjectOfAction: {
        icon: iconsObj.profile,
        address: getTransactionAddress(
          event,
          transaction.from,
          transaction.to
        ), //'0x378...3832'
      },
    })
  });
}
  export default useTransactions;

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
      subjectOfAction: {
        icon: iconsObj.profile,
        address: '0x378...3832',
      },
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
      subjectOfAction: {
        icon: iconsObj.profile,
        address: '0x378...3832',
      },
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
      subjectOfAction: {
        icon: iconsObj.profile,
        address: '0x378...3832',
      },
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
      subjectOfAction: {
        icon: iconsObj.profile,
        address: '0x378...3832',
      },
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
      subjectOfAction: {
        icon: iconsObj.profile,
        address: '0x378...3832',
      },
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
      subjectOfAction: {
        icon: iconsObj.profile,
        address: '0x378...3832',
      },
    },
  ]
