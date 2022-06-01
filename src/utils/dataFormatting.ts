import _map from 'lodash/map';
import _forEach from 'lodash/forEach';
import _sumBy from 'lodash/sumBy';
import _round from 'lodash/round';
import BN from 'bn.js';
import {rmCommasFromNum} from './helpers';
import iconsObj from 'assets/icons/iconsObj';
import {chainIdToNetwork, EventTypes} from 'utils/constants';

export const insertChainIdToProtocol = (balance) => {
  _map(balance, (network) => {
    const chainId = network?.chainId;

    _map(network?.protocols, (protocol) => {
      if (protocol) {
        protocol.protocol = {...protocol?.protocol, chainId};
      }
    });
  });
};

export const getAssetsValueSum = (assets) => {
  if (assets) {
    return _sumBy(assets, (value) =>
      _round(Number(rmCommasFromNum(value['token'].values[0].value)), 2),
    );
  }
};

export const ejectProtocolsFromNetwork = (network) => (network ? network.protocols : []);

export const ejectAssetsFromProtocol = (protocols) => {
  if (protocols) {
    return _map(protocols.assets, (asset) => asset.balance.components);
  }

  return [];
};

export const detectProtocolAndChainIdForAsset = (allProtocols, tokenSymbol) => {
  let chainId: string;
  let protocolId: string;

  if (allProtocols) {
    _forEach(allProtocols, (protocol) => {
      _forEach(protocol.assets, (asset) => {
        _forEach(asset.balance.components, (component) => {
          if (component.token.token.symbol === tokenSymbol) {
            chainId = chainIdToNetwork[protocol.protocol.chainId];
            protocolId = protocol.protocol.id;
          }
        });
      });
    });
  }

  return [chainId, protocolId];
};

export const getEventType = (eventName: string, userAddress?: string, params?) => {
  switch (eventName) {
    case 'Approval':
      return EventTypes.APPROVAL;
    case 'Transfer':
      let type = '';
      params.forEach((param) => {
        if (param.name === 'from' && param.value === userAddress) type = EventTypes.SEND;
        else if (param.name === 'to' && param.value === userAddress) type = EventTypes.RECEIVE;
        else type = EventTypes.RECEIVE; //temporary
      });

      return type;
  }

  return 'send';
};

export const getEventIcon = (eventName: string) => {
  if (eventName) {
    switch (eventName) {
      case 'Approval':
        return iconsObj.approvalTransaction;
      case 'Send':
        return iconsObj.sendTransaction;
      case 'Receive':
        return iconsObj.receiveTransaction;
      case 'Exchange':
        return iconsObj.exchangeTransaction;
    }
  }

  return '???';
};

export const getTransactionAddress = (event: string, from: string, to: string) => {
  switch (event) {
    case 'approval':
      return from;
    case 'send':
      return to;
    case 'receive':
      return from;
    case 'exchange':
      return from;
  }

  return '???';
};

export const findTokenName = (assets, tokenAddress: string) => {
  let name = '???';

  if (assets) {
    assets.forEach((asset) => {
      if (asset.token.token.address === tokenAddress) {
        name = asset.token.token.symbol;
      }
    });
  }

  return name;
};

export const getTokenAmount = (value: string, assets, tokenSymbol: string) => {
  const bigValue = new BN(value);
  let result: BN;

  assets.forEach((asset) => {
    if (asset.token.token.symbol === tokenSymbol) {
      const decimal = new BN(asset.token.token.decimals);
      const ten = new BN(10);
      result = bigValue.div(ten.pow(decimal));
    }
  });

  return result ? result.toNumber() : '???';
};

export const getTokenPrice = (assets, tokenSymbol: string) => {
  let price = 0;

  assets.forEach((asset) => {
    if (asset.token.token.symbol === tokenSymbol) {
      price = asset.token.values[0].price;
    }
  });

  return price === 0 ? '???' : price;
};

export const getClaimableValue = (protocols, address: string) => {
  let value = 0;
  _map(protocols, (protocol) => {
    _map(protocol.assets, (asset) => {
      _map(asset.claimableTokens, (claimableToken) => {
        if (claimableToken.token.address === address) {
          value = value + Number(claimableToken.values[0].value);
        }
      });
    });
  });

  return value;
};

export const getMarketCap = (currency: string, marketCap) => {
  let result: string;

  if (marketCap) {
    marketCap.forEach((item) => {
      if (item.currency === currency.toLowerCase()) result = item.volume;
    });
  }

  return result;
};

export const getVolume = (currency: string, volume) => {
  let result: string;

  if (volume) {
    volume.forEach((item) => {
      if (item.currency === currency.toLowerCase()) result = item.volume;
    });
  }

  return result;
};

export const getPriceChangePercentage = (priceChangePercentage: string) => {
  let percentage: string;
  let style = 'profit';

  if (priceChangePercentage && priceChangePercentage[0] === '-') {
    percentage = priceChangePercentage;
    style = 'loss';
  } else if (priceChangePercentage) percentage = priceChangePercentage;

  return [percentage, style];
};

export const getPriceChangeCurrency = (currency: string, priceChangePercentage) => {
  let percentage: string;

  if (priceChangePercentage) {
    priceChangePercentage.forEach((item) => {
      if (item.currency === currency.toLowerCase()) {
        percentage = item.percentage[0] === '-' ? item.percentage.substring(1) : item.percentage;
      }
    });
  }

  return percentage;
};
