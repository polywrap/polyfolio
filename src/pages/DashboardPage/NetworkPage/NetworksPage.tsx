import React from 'react';
import HeaderPage from 'common/components/HeaderPage/HeaderPage';
import AssetsTable from 'common/components/AssetsTable/AssetsTable';
import ProtocolsTable from 'common/components/ProtocolsTable/ProtocolsTable';
import HeaderPageInfo from 'common/components/HeaderPageInfo/HeaderPageInfo';
import {useParams} from 'react-router-dom';
import useNetworkInfo from 'common/components/Networks/Networks.config';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import _find from 'lodash/find';
import DashboardPage from '../DashboardPage';
import {chainIdToNetwork} from 'utils/constants';
import useAssets from 'common/components/AssetsTable/AssetsTableItem/AssetsTableItem.config';
import {useBalanceData} from 'common/hooks/useBalanceData/useBalanceData';
import {SupportedNetwork} from 'common/types';

function NetworksPage() {
  const translation = useTranslation();
  const {chainId} = useParams();
  const networkInfo = useNetworkInfo(chainId);

  const balanceData = useBalanceData([networkInfo.networkData]);
  const assets = useAssets(balanceData);

  return (
    <DashboardPage>
      <HeaderPage
        title={`${networkInfo?.title} ${translation.Networks.network}`}
        icon={networkInfo?.icon}
      />
      <HeaderPageInfo title={networkInfo.assetSum} />
      <AssetsTable assets={assets} total={balanceData.assetSum} />
      <ProtocolsTable protocols={balanceData.protocols} />
    </DashboardPage>
  );
}
export default NetworksPage;
