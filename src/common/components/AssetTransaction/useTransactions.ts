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
} from 'utils/dataFormatting';
import {shortenedAddress} from 'utils/helpers';
import {ITransaction} from './AssetTransactions.type';
import useGetData from 'common/hooks/useActualFormattedData/useActualFormattedData';

const useTransactions = () => {
  const state = useRecoilValue(transactionState);
  const formatData = useGetData();
  const preparedData = formatData();
  const {user} = useAuth();
  const data: ITransaction[] = [];

  state?.transactions.forEach(transaction => {
    const logs = transaction.logs;
    const eventNameInLogs = logs.length > 0 ? logs[0].event.name : null;
    const eventParamsInLogs = logs.length > 0 ? logs[0].event.params : null;
    const event = getEventType(
      eventNameInLogs,
      user,
      eventParamsInLogs
    );
    const icon = getEventIcon(
      eventNameInLogs,
      user,
      eventParamsInLogs
    );
    const tokenTicker = findTokenName(preparedData['allAssets'], logs.length > 0 ? logs[0].contractAddress : null);
    const tokenAmount = getTokenAmount(
      logs.length > 0 ? eventParamsInLogs[2].value : null,
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
          address: shortenedAddress(getTransactionAddress(
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
