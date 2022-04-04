import _ from 'lodash';

export const filteredDropdown = (array, currentId) => {
  return array?.filter((e) => e?.id !== currentId);
};

export const rmCommasFromNum = (num) => {
  if (!num) return null;
  if (typeof num !== 'string') num = num.toString();
  
  return num.includes(',') ? num.split(',').join('') : num;
};

export const fillArray = (n) => {
  const arr = [];
  if (n) for (let i = 1; i <= n; ) arr.push(i++);

  return arr;
};

export const getAssetsValueSum = (assets) => {
  if (assets) {
    return _.sumBy(assets, (value) => 
      _.round(Number(rmCommasFromNum(value['balance'].token.values[0].value)), 2)
    );
  }
};
