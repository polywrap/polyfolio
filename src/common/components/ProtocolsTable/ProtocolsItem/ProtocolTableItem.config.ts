/* eslint-disable react-hooks/rules-of-hooks */
import {ProtocolsItem} from './ProtocolTableItem.types';
import {v4 as uuidv4} from 'uuid';
import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';
import {chainIdToNetwork} from 'utils/constants';
import {DataRangeSelectorItem} from 'common/components/DateRangeSelector/DataRangeSelector.types';
import {getAssetMetadata} from 'common/hooks/useAssetMetadata/useAssetMetadata.config';
import {useCurrency} from 'common/currency/Currency.context';
import {useRecoilValue} from 'recoil';
import balanceState from 'common/modules/atoms/balanceState';
import {useEffect, useState} from 'react';
import {
  sumProtocolAssetsBalances,
  sumClaimableValues,
  getComponentsFromProtocol,
} from './ProtocolTableItem.utis';
import {useWeb3ApiClient} from '@web3api/react';
import getAssetPageData from 'common/hooks/useAssetPageData/useAssetPageData';
import {ProtocolElement} from 'common/types';

interface State {
  data: ProtocolsItem[];
  loading: boolean;
  error: string;
}

export const useProtocols = (protocols: ProtocolElement[], dataRange?: DataRangeSelectorItem) => {
  //const {pathname} = useLocation();
  //const page = getStringFromPath(pathname, 4);
  const {currency} = useCurrency();
  const client = useWeb3ApiClient();
  const balance = useRecoilValue(balanceState);

  const [state, setState] = useState<State>({data: [], loading: false, error: ''});

  useEffect(() => {
    const go = async () => {
      setState((state) => ({...state, loading: true}));
      const menuItems = [];

      if (protocols) {
        for (const protocol of protocols) {
          const valueTitle = sumProtocolAssetsBalances(protocol);
          const claimableValue = sumClaimableValues(protocol);
          let secondaryTitlePercent = 0;
          let secondaryTitleDollar = 0;
          const network = protocol.protocol.chainId;

          const components = getComponentsFromProtocol(protocol);

          for (const component of components) {
            // TODO change to Promise.all to have secondaryTitlePercent synched

            const assetMetaData = await getAssetMetadata(client, {
              id: chainIdToNetwork[network],
              tokenAddress: component.token.token.address,
              tokenName: component.token.token.name,
            });

            if (assetMetaData !== null && assetMetaData !== undefined) {
              if (dataRange) {
                const assetPreparedData = getAssetPageData(
                  currency,
                  assetMetaData,
                  component.token.values[0].price, // const priceTitle = component['token'].values[0]?.price; // TODO need to change for equality with currency
                  dataRange,
                );
                secondaryTitlePercent += Number(assetPreparedData?.percentage ?? 0);
                secondaryTitleDollar += Number(assetPreparedData?.pricePercentDollar ?? 0);
              }
            }
          }

          const isNegativeValue = secondaryTitleDollar < 0;

          const result = {
            icon: iconsObj[protocol.protocol.id],
            link: `${RoutePath.Protocol}`,
            secondaryTitleDollar: secondaryTitleDollar.toString(),
            secondaryTitlePercent: secondaryTitlePercent.toString(),
            claimableValue: claimableValue.toString(),
            valueTitle: valueTitle.toString(),
            isNegativeValue,
            title: protocol.protocol.name,
            network: chainIdToNetwork[network],
            symbol: protocol.protocol.id,
            id: uuidv4(),
          };
          menuItems.push(result);
        }
      }

      setState({data: menuItems, loading: false, error: ''});
    };

    if (balance && protocols?.length) {
      go();
    }
  }, [balance, protocols]);

  return state;
};

export default useProtocols;
