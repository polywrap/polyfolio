import _ from 'lodash';

export const filteredDropdown = (array, currentId) => {
  return array?.filter((e) => e?.id !== currentId);
};

export const rmCommasFromNum = (num) => {
  return num.split(',').join('');
};

export const fillArray = (n) => {
  const arr = [];
  if (n) for (let i = 1; i <= n; ) arr.push(i++);

  return arr;
};

export const getAssetsValueSum = (assets) => {
  return _.sumBy(assets, (value) => 
    _.round(Number(rmCommasFromNum(value['balance'].token.values[0].value)), 2)
  );
};

export const toFixed = ({value, size}) => {
  const valueStr = value.toString();
  if (valueStr && valueStr !== '0') {
    if (!valueStr.includes('.')) return valueStr;
    let array = [];

    if (typeof valueStr === 'string') array = rmCommasFromNum(valueStr).split('.');
    else array = valueStr.split('.');

    array[1] = array[1].substring(0, size);

    return array.join('.');
  } else return '0'
}
