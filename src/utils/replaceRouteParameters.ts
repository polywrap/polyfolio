import _forEach from 'lodash/forEach';

interface IReplaceOptions {
  user?: string;
  asset?: string;
  search?: string;
  chainId?: string;
  protocol?: string;
}

const replaceRouteParameters = (route: string, replaceOptions: IReplaceOptions) => {
  let resultPath: string = route;
  const keysList = Object.keys(replaceOptions);
  const collision =
    (keysList.includes('search') === true && keysList.includes('user') === true) ?? false;

  _forEach(keysList, (key) => {
    if (collision) {
      if (key === 'search') resultPath = resultPath.replace(':user', replaceOptions[key]);
      else if (key !== 'user') resultPath = resultPath.replace(`:${[key]}`, replaceOptions[key]);
    } else {
      if (key == 'search') resultPath = resultPath.replace(':user', replaceOptions[key]);
      resultPath = resultPath.replace(`:${[key]}`, replaceOptions[key]);
    }
  });

  return resultPath;
};

export default replaceRouteParameters;
