import _ from 'lodash';
import BN from 'bn.js';

export const filteredDropdown = (array, currentId) => {
  return array?.filter((e) => e?.id !== currentId);
};

export const rmCommasFromNum = (num: string) => {
  if (!num) return null;

  return num.includes(',') ? num.split(',').join('') : num;
};

export const fillArray = (n) => {
  const arr = [];
  if (n) for (let i = 1; i <= n; ) arr.push(i++);

  return arr;
};

export const getStringFromPath = (path: string, index: number) => {
  if (path) {
    return index
      ? path.split('/').length > index && index >= 0
        ? path.split('/')[index]
        : path
      : path;
  }
};

export const shortenedAddress = (address: string, size = 4) => {
  if (address && size !== 0) {
    if (size && size > 0 && size <= 19) {
      return `${_.slice(address, 0, size).join('')}...${_.slice(address, -size).join('')}`;
    } else return address;
  }
};

export const detectAssetOrProtocolPage = (pathname: string) => {
  if (pathname && pathname.includes('protocol')) return 'protocol';
  else if (pathname && pathname.includes('assets')) return 'asset';
  else return 'default';
};

export const fromBnToNumber = (numberInString: string, decimal: number | string) => {
  const value = new BN(numberInString);
  const divider = new BN(Math.pow(10, Number(decimal)).toString());
  const result = value.div(divider);

  return result.toNumber();
};
