import {Web3ApiClient} from '@web3api/client-js';
import ENS_URI from 'utils/web3apiConfig/ensUri';
import IPFS_URI from 'utils/web3apiConfig/ipfsUri';

export const getTokenTransfers = (
  client: Web3ApiClient,
  variables: {accountAddress: string; tokenAddress: string; currency: string},
  options = {chainId: 1},
) => {
  const {accountAddress, tokenAddress, currency} = variables;

  return client.query({
    uri: IPFS_URI.SDK.MOCK,
    query: `query {
      getTokenTransfers(
        accountAddress: $accountAddress
        tokenAddress: $tokenAddress
        vsCurrency: $vsCurrency
        options: null
      )
    }`,
    variables: {
      accountAddress: accountAddress,
      tokenAddress: tokenAddress,
      vsCurrency: currency,
    },
    config: {
      envs: [
        {
          uri: ENS_URI.ACCOUNT.COVALENT,
          common: {
            chainId: options.chainId,
          },
        },
        /*         {
          uri: 'ipfs/QmdhnYXgxjavFDD9kUJE5BA3UeWGDeMhwwYQoJ1CM4ScTp',
          query: {
            connection: {
              networkNameOrChainId: options.chainId,
            },
          },
        }, */
      ],
    },
  });
};
/* 
"Error: WasmWeb3Api: Wasm module aborted execution.
URI: w3://ipfs/bafybeicovepnprojcw7fr76vtvfe44gpuvrj7jvqqsm7wlw7gfjuyi4u6i
Module: query
Method: getTokenTransfers
Input: {
  "accountAddress": "0xd405aebF7b60eD2cb2Ac4497Bddd292DEe534E82",
  "tokenAddress": "0x35bD01FC9d6D5D81CA9E055Db88Dc49aa2c699A8",
  "vsCurrency": "USD",
  "options": null
}
Message: __w3_abort: Error: WasmWeb3Api: Wasm module aborted execution.
URI: w3://ipfs/QmdxqSZm1cuGXcJASYdBfvFSeZpvQqBUseiKLMe3EL3jSq
Module: query
Method: getTokenTransfers
Input: {}
Message: __w3_abort: Missing required property: 'chainId: Int'
  Context: Deserializing object-type QueryEnv
    context stack is empty
File: src/query/w3/QueryEnv/serialization.ts
Location: [105,5].

File: src/query/index.ts
Location: [337,5].

    at abort (http://localhost:3000/static/js/bundle.js:62221:21)
    at __w3_abort (http://localhost:3000/static/js/bundle.js:62970:9)
    at http://localhost:3000/static/js/bundle.js:59224:22
    at src/query/w3/entry/w3Abort (wasm://wasm/000bc0fa:wasm-function[12]:0x8c9)
    at src/query/w3/Query/wrapped/getTokenTransfersWrapped (wasm://wasm/000bc0fa:wasm-function[129]:0x1d09c)
    at ~lib/@web3api/wasm-as/invoke/w3_invoke (wasm://wasm/000bc0fa:wasm-function[84]:0xba25)
    at src/query/w3/entry/_w3_invoke (wasm://wasm/000bc0fa:wasm-function[139]:0x202cd)
    at AsyncWasmInstance.<anonymous> (http://localhost:3000/static/js/bundle.js:59295:24)
    at step (http://localhost:3000/static/js/bundle.js:59025:17)
    at Object.next (http://localhost:3000/static/js/bundle.js:58956:14)"
*/
