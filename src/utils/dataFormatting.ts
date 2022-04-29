import _ from 'lodash';
import BN from 'bn.js';
import {rmCommasFromNum} from './helpers';
import iconsObj from 'assets/icons/iconsObj';

export const insertChainIdToProtocol = (balance) => {
  _.map(balance, (network) => {
    const chainId = network.chainId;

    _.map(network?.protocols, (protocol) => {
      if (protocol) {
        protocol.protocol = {...protocol?.protocol, chainId};
      } 
    });
  });
}

export const getAssetsValueSum = (assets) => {
  if (assets) {
    return _.sumBy(assets, (value) => 
      _.round(Number(rmCommasFromNum(value['token'].values[0].value)), 2)
    );
  }
};

export const ejectProtocolsFromNetwork = (network) => network ? network.protocols : null;

export const ejectAssetsFromProtocol = (protocols) => {
  if (protocols) {
    return _.map(protocols.assets, asset => asset.balance.components)
  }
}

export const formatDataDueToEvent = (eventName: string, transaction) => {
  
}

export const getEventType = (eventName: string, userAddress?: string, params?) => {
  switch (eventName) {
    case 'Approval': return 'approval';
    case 'Transfer':
      let type = '';
      params.forEach(param => {
        if (param.name === 'from' && param.value === userAddress) type = 'send';
        else if (param.name === 'to' && param.value === userAddress) type = 'receive';
        else type = 'send'; //temporary
      })

      return type
  }

  return 'send'
}

export const getEventIcon = (eventName: string, userAddress?: string, params?) => {
  if (eventName) {
    switch (eventName) {
      case 'Approval': return iconsObj.approvalTransaction;
      case 'Transfer':
        let icon = '';
        params.forEach(param => {
          if (param.name === 'from' && param.value === userAddress) icon = iconsObj.sendTransaction;
          else if (param.name === 'to' && param.value === userAddress) icon = iconsObj.receiveTransaction;
          else icon = iconsObj.sendTransaction;
        })
  
        return icon
    }
  }

  return '???'
}

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

  return '???'
}

export const findTokenName = (assets, tokenAddress: string) => {
  let name = '???';

  assets.forEach(asset => {
    if (asset.token.token.address === tokenAddress) {
      name = asset.token.token.symbol;
    }
  })

  return name;
}

export const getTokenAmount = (value: string, assets, tokenSymbol: string) => {
  const bigValue = new BN(value);
  let result: BN;

  assets.forEach(asset => {
    if (asset.token.token.symbol === tokenSymbol) {
      const decimal = new BN(asset.token.token.decimals);
      const ten = new BN(10);
      result = bigValue.div(ten.pow(decimal));
    }
  })

  return result ? result.toNumber() : '???';
}

export const getTokenPrice = (assets, tokenSymbol: string) => {
  let price = 0;

  assets.forEach(asset => {
    if (asset.token.token.symbol === tokenSymbol) {
      price = asset.token.values[0].price;
    }
  })

  return price === 0 ? '???' : price;
}

export const getClaimableValue = (protocols, address: string) => {
  let value: string;
  _.map(protocols, protocol => {
    _.map(protocol.assets, asset => {
      _.map(asset.claimableTokens, claimableToken => {
        if (claimableToken.token.address === address) {
          value = claimableToken.values[0].value;
        }
      });
    });
  });

  return value ?? '0';
}

export const getClaimableValueFromCurrProtocol = (asset) => {
  let value = 0;
  _.forEach(asset.balance.components, component => {
    _.forEach(asset.claimableTokens, claimableToken => {
      if (component.token.token.address === claimableToken.token.address) {
        value = value + Number(claimableToken.values[0].value);
      }
    });
  });
  
  return value ?? 0;
}
