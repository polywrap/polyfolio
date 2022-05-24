import SUPPORTED_NETWORKS from 'common/networks/Networks.config';

/*
export const networks = {
  ethereum: {name: 'Ethereum', val: 'ethereum'},
  polygon: {name: 'Polygon', val: 'polygon'},
};

//const networks = {};
 SUPPORTED_NETWORKS.forEach((n) => {
  networks[n.name] = {name: n.title, val: n.name};
}); 
*/

export default SUPPORTED_NETWORKS.reduce((prev, current) => {
  prev[current.name] = {name: current.title, val: current.name};

  return prev;
}, {});
