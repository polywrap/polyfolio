import _, { result } from 'lodash';
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
  if (path) return path.split('/')[index ?? 1];
}

export const shortenedAddress = (address: string, size = 4) => {
  if (address && address != '???') {
    return `${_.slice(address, 0, size).join('')}...${_.slice(address, -size).join('')}`;
  }

  return '???'
}

export const fromBnToNumber = (numberInString: string, decimal: number | string) => {
  const value = new BN(numberInString);
  const divider = new BN(Math.pow(10, Number(decimal)).toString());
  const result = value.div(divider);

  return result.toNumber();
}
