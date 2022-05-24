/* eslint-disable react-hooks/rules-of-hooks */
import {ProtocolsItem} from './ProtocolTableItem.types';
import {v4 as uuidv4} from 'uuid';
import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';
import {getStringFromPath, rmCommasFromNum} from 'utils/helpers';
import _ from 'lodash';
import {useLocation} from 'react-router-dom';
import {chainIdToNetwork, networkToChainId} from 'utils/constants';
import {getClaimableValueFromCurrProtocol} from 'utils/dataFormatting';
import {DataRangeSelectorItem} from 'common/components/DateRangeSelector/DataRangeSelector.types';
import useAssetMetadata from 'common/hooks/useAssetMetadata/useAssetMetadata';
import useAssetPageData from 'common/hooks/useAssetPageData/useAssetPageData';
import {useCurrency} from 'common/currency/Currency.context';
import getFormattedData from 'utils/getFormattedData';
import {useRecoilValue} from 'recoil';
import balanceState from 'common/modules/atoms/balanceState';

export const useProtocols = (dataRange?: DataRangeSelectorItem) => {
  const {pathname} = useLocation();
  const page = getStringFromPath(pathname, 4);
  const {currency} = useCurrency();
  const balance = useRecoilValue(balanceState);
  const preparedData = getFormattedData(balance, chainIdToNetwork[page]);
  const menuItems: ProtocolsItem[] = [];
  const allProtocols = preparedData['allProtocols'];

  if (allProtocols) {
    for (let i = 0; i < allProtocols.length; i++) {
      let valueTitle = 0;
      let claimableValue = 0;
      let secondaryTitlePercent = 0;
      let secondaryTitleDollar = 0;
      let valueIsMinus = false;
      _.forEach(allProtocols[i].assets, (asset) => {
        valueTitle += _.sumBy(asset['balance'].components, (assetItem) =>
          Number(rmCommasFromNum(assetItem['token'].values[0].value)),
        );
        claimableValue += getClaimableValueFromCurrProtocol(asset);
      });

      const network = allProtocols[i].protocol.chainId;

      _.forEach(allProtocols[i]?.assets, (asset) => {
        _.forEach(asset['balance']?.components, (component) => {
          const assetAddress = component['token']?.token.address;
          const priceTitle = component['token'].values[0]?.price; // need to change for equality with currency
          const assetMetaData = useAssetMetadata(
            chainIdToNetwork[network],
            networkToChainId[network],
            assetAddress,
          );

          if (dataRange) {
            const assetPreparedData = useAssetPageData(
              currency,
              assetMetaData,
              priceTitle,
              dataRange,
            );
            secondaryTitlePercent += Number(assetPreparedData?.percentage ?? 0);
            secondaryTitleDollar += Number(assetPreparedData?.pricePercentDollar);
          }
        });
      });

      valueIsMinus = secondaryTitleDollar < 0 ? true : false;

      menuItems.push({
        icon: iconsObj.protocolBardger,
        link: `${RoutePath.Protocol}`,
        secondaryTitleDollar: secondaryTitleDollar.toString(),
        secondaryTitlePercent: secondaryTitlePercent.toString(),
        claimableValue: claimableValue.toString(),
        valueTitle: valueTitle.toString(),
        valueIsMinus,
        title: preparedData['allProtocols'][i].protocol.name,
        network: chainIdToNetwork[network],
        symbol: preparedData['allProtocols'][i].protocol.id,
        id: uuidv4(),
      });
    }
  }

  return menuItems;
};

export default useProtocols;
