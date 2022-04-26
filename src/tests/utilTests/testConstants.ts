export const claimableTokens = [
  {
    token: {
        address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
        name: "Uniswap",
        symbol: "UNI",
        decimals: 18,
        totalSupply: "1000000000000000000000000"
    },
    balance: "3.98",
    values: [
        {
            currency: "usd",
            price: "10",
            value: "39.8"
        }
    ]
  },
  {
    token: {
        address: "0x35bD01FC9d6D5D81CA9E055Db88Dc49aa2c699A8",
        name: "Friends With Benefits Pro",
        symbol: "FWB",
        decimals: 18,
        totalSupply: "1000000000000000000000000"
    },
    balance: "3.98",
    values: [
        {
            currency: "usd",
            price: "50",
            value: "199"
        }
    ]
  }
]

export const components = [
  {
    token: {
      token: {
          address: "0x35bD01FC9d6D5D81CA9E055Db88Dc49aa2c699A8",
          name: "Friends With Benefits Pro",
          symbol: "FWB",
          decimals: 18,
          totalSupply: "1000000000000000000000000"
      },
      balance: "56.775651421",
      values: [
        {
            currency: "usd",
            price: "50.70",
            value: "2,878.5255270447"
        }
      ]
    },
    unresolvedComponents: 0,
    components: []
  },
  {
    token: {
      token: {
          address: "0x35bD01FC9d6D5D81CA9E055Db88Dc49aa2c699A8",
          name: "Friends With Benefits Pro",
          symbol: "FWB",
          decimals: 18,
          totalSupply: "1000000000000000000000000"
      },
      balance: "56.775651421",
      values: [
        {
            currency: "usd",
            price: "50.70",
            value: "2,878.5255270447"
        }
      ]
    },
    unresolvedComponents: 0,
    components: []
  }
]

export const token = {
  token: {
    address: "0x0a965a4caf929338044c593d82d385c4c898d8c6",
    name: "Uniswap V2",
    symbol: "UNI-V2",
    decimals: 18,
    totalSupply: "3421511230657799317704"
  },
  balance: "12",
  values: [
    {
        currency: "usd",
        price: "188.8283946669",
        value: "10,720.855113993"
    }
  ]
}

export const balance = {
  token,
  unresolvedComponents: 0,
  components,
  claimableTokens,
};

export const balance_alt = {
  token,
  unresolvedComponents: 0,
  components,
  isDebt: false,
  claimableTokens,
};

export const asset = {
  apr: null,
  apy: "8.67",
  balance,
}

export const asset_alt = {
  apr: null,
  apy: null,
  balance: balance_alt,
}

export const assets = [
  asset,
  asset_alt,
];
export const assets_alt = [
  asset,
  asset_alt,
];

export const values = [
  {
    currency: "usd",
    price: "N/A",
    value: "10,920.855113993"
  }
];

export const values_alt = [
  {
    currency: "usd",
    price: "N/A",
    value: "44.28"
  }
];

export const protocol = {
  id: "uniswap_v2",
  organization: "Uniswap",
  name: "Uniswap",
  version: "2",
  adapterUri: "ens/uniswap.token-resolvers.defiwrapper.eth",
  forkedFrom: null,
  chainId: "1"
}

export const protocol_alt = {
  id: "sushibar_v1",
  organization: "Sushi",
  name: "Sushibar",
  version: "1",
  adapterUri: "ens/sushibar.token-resolvers.defiwrapper.eth",
  forkedFrom: null,
  chainId: "1"
}

export const protocols = [
  {
    protocol: protocol,
    values: values,
    assets,
  },
  {
    protocol: protocol_alt,
    values: values_alt,
    assets: assets_alt
  },
];

export const network = {
  account: "0x870E4F7C9687Fe15b4505315eB6ba10fe00A3dB8",
  chainId: "1",
  values: [
      {
        currency: "usd",
        price: "N/A",
        value: "10,765.135113993"
      }
  ],
  protocols,
}

export const balanceTotal = {
  ethereum: network,
  polygon: network,
}
