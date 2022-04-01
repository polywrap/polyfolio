import _ from 'lodash';

export const filteredDropdown = (array, currentId) => {
  return array?.filter((e) => e?.id !== currentId);
};

export const formatInputNumbers = num => {
  return num.split(',').join('');
}

export const fillArray = (n) => {
  const arr = [];
  if (n) for (let i = 1; i <= n; ) arr.push(i++);

  return arr;
};

export const getAssetsValueSum = (assets) => {
  return _.sumBy(assets, (value) => Number(formatInputNumbers(value['balance'].token.values[0].value)));
}
