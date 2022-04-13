import _ from 'lodash';
import BN from 'bn.js';
import {rmCommasFromNum} from './helpers';
import iconsObj from 'assets/icons/iconsObj';

export const getAssetsValueSum = (assets) => {
  if (assets) {
    return _.sumBy(assets, (value) => 
      _.round(Number(rmCommasFromNum(value['balance'].token.values[0].value)), 2)
    );
  }
};

export const ejectAssetsFromProtocol = (protocols) => {
  if (protocols) {
    return _.flatten(_.map(protocols, item => item.assets));
  }
}

export const getEventType = (eventName, userAddress?, params?) => {
  switch (eventName) {
    case 'Approval': return 'approval';
    case 'Transfer':
      let type = '';
      console.log(params)
      params.forEach(param => {
        if (param.name === 'from' && param.value === userAddress) type = 'send';
        else if (param.name === 'to' && param.value === userAddress) type = 'receive';
      })

      return type
  }
}

export const getEventIcon = (eventName, userAddress?, params?) => {
  switch (eventName) {
    case 'Approval': return iconsObj.approvalTransaction;
    case 'Transfer':
      let icon = '';
      params.forEach(param => {
        if (param.name === 'from' && param.value === userAddress) icon = iconsObj.sendTransaction;
        else if (param.name === 'to' && param.value === userAddress) icon = iconsObj.receiveTransaction;
      })

      return icon
  }
}

export const getTransactionAddress = (event, from, to) => {
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
}

export const findTokenName = (assets, tokenAddress) => {
  let name = '';

  assets.forEach(asset => {
    if (asset.balance.token.token.address === tokenAddress) {
      name = asset.balance.token.token.symbol;
    }
  })

  return name;
}

export const getTokenAmount = (value, assets, tokenSymbol) => {
  const bigValue = new BN(value);
  let result: BN;

  assets.forEach(asset => {
    if (asset.balance.token.token.symbol === tokenSymbol) {
      result = bigValue.div(asset.balance.token.token.decimals);
    }
  })

  return result.toFixed();
}

export const getTokenPrice = (assets, tokenSymbol) => {
  let price = 0;

  assets.forEach(asset => {
    if (asset.balance.token.token.symbol === tokenSymbol) {
      price = asset.balance.token.values[0].price;
    }
  })

  return price;
}
