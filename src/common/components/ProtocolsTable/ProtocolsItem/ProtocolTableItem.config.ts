/* eslint-disable react-hooks/rules-of-hooks */
import {IProtocol, ProtocolsItem} from './ProtocolTableItem.types';
import {v4 as uuidv4} from 'uuid';
import iconsObj from 'assets/icons/iconsObj';
import RoutePath from 'common/modules/routing/routing.enums';
import {getStringFromPath} from 'utils/helpers';
import {useLocation} from 'react-router-dom';
import {chainIdToNetwork} from 'utils/constants';
import {DataRangeSelectorItem} from 'common/components/DateRangeSelector/DataRangeSelector.types';
import {getAssetMetadata} from 'common/hooks/useAssetMetadata/useAssetMetadata.config';
import {useCurrency} from 'common/currency/Currency.context';
import getFormattedData from 'utils/getFormattedData';
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

interface State {
  data: ProtocolsItem[];
  loading: boolean;
  error: string;
}

export const useProtocols = (dataRange?: DataRangeSelectorItem) => {
  const {pathname} = useLocation();
  const page = getStringFromPath(pathname, 4);
  const {currency} = useCurrency();
  const client = useWeb3ApiClient();
  const balance = useRecoilValue(balanceState);

  const [state, setState] = useState<State>({data: [], loading: false, error: ''});

  useEffect(() => {
    const go = async () => {
      setState((state) => ({...state, loading: true}));

      const preparedData = getFormattedData(balance, chainIdToNetwork[page]);
      const allProtocols: IProtocol[] = preparedData['allProtocols'];

      // console.log('-------------ALL PROTOCOLS', allProtocols);

      const menuItems = [];

      if (allProtocols) {
        for (const protocol of allProtocols) {
          // console.log(`-----Start processing Protocol ${protocol.protocol.name}`);

          const valueTitle = sumProtocolAssetsBalances(protocol);
          const claimableValue = sumClaimableValues(protocol);
          let secondaryTitlePercent = 0;
          let secondaryTitleDollar = 0;
          const network = protocol.protocol.chainId;

          const components = getComponentsFromProtocol(protocol);

          for (const component of components) {
            // TODO change to Promise.all to have secondaryTitlePercent synched
            //console.log(`__________________________________________`);

            const assetMetaData = await getAssetMetadata(client, {
              id: chainIdToNetwork[network],
              tokenAddress: component.token.token.address,
              tokenName: component.token.token.name,
            });

            if (assetMetaData !== null && assetMetaData !== undefined) {
              //console.log(`-Asset meta for ${chainIdToNetwork[network]}, ${component.token.token.name}`,assetMetaData);

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
          //console.log(`Finished processing Protocol ${protocol.protocol.name}`,`\nResult:`, result);
        }
      }

      setState({data: menuItems, loading: false, error: ''});
    };

    if (balance) {
      go();
    }
  }, [balance]);

  return state;
};

export default useProtocols;
