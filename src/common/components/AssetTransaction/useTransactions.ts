import moment from 'moment';
import iconsObj from 'assets/icons/iconsObj';
import useAuth from 'common/hooks/useAuth/useAuth';
import transactionState from 'common/modules/atoms/transactionState';
import {useRecoilValue} from 'recoil';
import {getTransactionAddress} from 'utils/dataFormatting';
import {shortenedAddress/*, detectAssetOrProtocolPage*/} from 'utils/helpers';
import {ITransaction} from './AssetTransactions.type';
import useGetData from 'common/hooks/useActualFormattedData/useActualFormattedData';
import {formatDataAccordingToEvent} from 'utils/formatDataAccordingToEvent';
//import {useLocation} from 'react-router-dom';

const useTransactions = () => {
  //const {pathname} = useLocation();
  //const pageType = detectAssetOrProtocolPage(pathname);
  const formatData = useGetData();
  const preparedData = formatData();
  const {user} = useAuth();
  const state = useRecoilValue(transactionState);
  const data: ITransaction[] = [];

  state?.transactions.forEach(transaction => {
    const eventData = formatDataAccordingToEvent(transaction, user, preparedData['allAssets']);

    if (eventData) {
      const {
        eventName,
        icon,
        tokenTicker,
        tokenAmount,
        tokenPrice,
      } = eventData;
  
      if (eventName) {
        
        data.push({
          id: transaction.offset,
          type: eventName,
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
              eventName,
              transaction.from,
              transaction.to
            ), 4),
          },
        })
      }
    }
  });

  return data;
}
export default useTransactions;
