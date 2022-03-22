import React, {useEffect} from 'react';
import {atom, useRecoilState} from 'recoil';
import Networks from 'common/components/Networks/Networks';
import ProtocolsTable from 'common/components/ProtocolsTable/ProtocolsTable';
import AssetsTable from 'common/components/AssetsTable/AssetsTable';
import DashboardNavigation from 'common/components/DashboardNavigation/DashboardNavigation';
import HeaderDashboard from 'common/components/HeaderDashboard/HeaderDashboard';
import DashboardPage from '../DashboardPage';
import useData from 'common/hooks/useData/useData';

const ASSETS_STATE_KEY = 'polyfolio_all_assets';

function Portfolio() {
  const {balance} = useData();

  const assetsState = atom({
    key: ASSETS_STATE_KEY,
    default: null,
  });

  const [assets, setAssets] = useRecoilState(assetsState);

  const ejectAssetData = () => {
    const assetArray = [];

    if (balance) {
      balance.protocols.map(item => {
        for (const key in item.assets) {
          assetArray.push(item.assets[key]);
        }
      });
    }

    return assetArray;
  }

  useEffect(() => {
    if (balance) {
      setAssets(ejectAssetData());
    }
  }, [balance])

  return (
    <DashboardPage>
      <HeaderDashboard />
      <DashboardNavigation />
      <AssetsTable />
      <ProtocolsTable />
      <Networks />
    </DashboardPage>
  );
}

export default Portfolio;
