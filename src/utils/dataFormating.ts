import _ from 'lodash';
import {rmCommasFromNum} from './helpers';

export const getAssetsValueSum = (assets) => {
  if (assets) {
    return _.sumBy(assets, (value) => 
      _.round(Number(rmCommasFromNum(value['balance'].token.values[0].value)), 2)
    );
  }
};

export const ejectAssetsFromProtocol = (protocols) => 
  _.flatten(_.map(protocols, item => item.assets));
