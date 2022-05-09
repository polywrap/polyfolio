import _ from 'lodash';

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

export const detectAssetOrProtocolPage = (pathname: string) =>  {
  if (pathname && pathname.includes('protocol')) return 'protocol';
  else if (pathname && pathname.includes('assets')) return 'asset';
}
