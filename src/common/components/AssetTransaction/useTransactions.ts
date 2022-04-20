import moment from 'moment';
import iconsObj from 'assets/icons/iconsObj';
import useAuth from 'common/hooks/useAuth/useAuth';
import transactionState from 'common/modules/atoms/transactionState';
import { useRecoilValue } from 'recoil';
import {
  findTokenName,
  getEventIcon,
  getEventType,
  getTokenAmount,
  getTokenPrice,
  getTransactionAddress
} from 'utils/dataFormating';
import {shorteredAddress} from 'utils/helpers';
import useGetData from 'common/hooks/useGetData/useGetData';

const useTransactions = () => {
  const state = useRecoilValue(transactionState);
  const formateData = useGetData();
  const preparedData = formateData();
  const {user} = useAuth();
  const data = [];

  console.log(state);

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
    );
    const tokenTicker = findTokenName(preparedData['allAssets'], logs.length > 0 ? logs[0].contractAddress : null);
    const tokenAmount = getTokenAmount(
      logs.length > 0 ? logs[0].event.params[2].value : null,
      preparedData['allAssets'],
      tokenTicker
    );
    const tokenPrice = getTokenPrice(preparedData['allAssets'], tokenTicker);

    if (logs[0]) {
      
      data.push({
        id: transaction.offset,
        type: event,
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
          ), 4),
        },
      })
    }
  });

  return data;
}
export default useTransactions;
