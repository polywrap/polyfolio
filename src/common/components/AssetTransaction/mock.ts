import moment from 'moment';
import iconsObj from 'assets/icons/iconsObj';
import useAuth from 'common/hooks/useAuth/useAuth';
import transactionState from 'common/modules/atoms/transactionState';
import balanceState from 'common/modules/atoms/balanceState';
import { useRecoilValue } from 'recoil';
import {
  ejectAssetsFromProtocol,
  findTokenName,
  getEventIcon,
  getEventType,
  getTokenAmount,
  getTokenPrice,
  getTransactionAddress
} from 'utils/dataFormating';
import {shorteredAddress} from 'utils/helpers';

const useTransactions = () => {
  const state = useRecoilValue(transactionState);
  const balance = useRecoilValue(balanceState);
  const { user } = useAuth();
  const data = [];

  const assets = ejectAssetsFromProtocol(balance?.ethereum['protocols']);
  //console.log(assets);
  //console.log(state);

  state?.transactions.forEach(transaction => {
    const logs = transaction.logs;
    const event = getEventType(
      logs.length > 0 ? logs[0].event.name : null,
      user,
      logs.length > 0 ? logs[0].event.params : null
    );
    const icon = getEventIcon(
      logs.length > 0 ? logs[0].event.name : null,
      user,
      logs.length > 0 ? logs[0].event.params : null
    ) ?? '???';
    const tokenTicker = findTokenName(assets, logs.length > 0 ? logs[0].contractAddress : null);
    const tokenAmount = getTokenAmount(
      logs.length > 0 ? logs[0].event.params[2].value : null,
      assets,
      tokenTicker
    ) ?? '???';
    const tokenPrice = getTokenPrice(assets, tokenTicker) ?? '???';
    
    data.push({
      id: transaction.offset,
      type: event ?? '???',
      icon,
      time: moment(transaction.timestamp).utc().format('hh:mm'),
      token: [
        {
          id: tokenTicker,
          icon: iconsObj.assetsToken,
          token_amount: tokenAmount,
          token_ticker: tokenTicker,
          dollar_amount: tokenPrice,
        }
      ],
      subjectOfAction: {
        icon: iconsObj.profile,
        address: shorteredAddress(getTransactionAddress(
          event,
          transaction.from,
          transaction.to
        ), 4), //'0x378...3832'
      },
    })
  });

  return data;
}
export default useTransactions;
