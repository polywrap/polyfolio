import { Transaction, EventLog } from "common/hooks/useTransaction/useTransactions.types";
import { Balance, Currency } from "common/hooks/useBalance/useBalance.types";

export const account = '0xa79e63e78eec28741e711f89a672a4c40876ebf3';

export const transaction: Transaction = {
  hash: '0x9fd2eb7db94cf71ddc665b48dad42e1d00d90ace525fd6a0479f958cce8a729f',
  from: "0xa79e63e78eec28741e711f89a672a4c40876ebf3",
  to: '',
  successful: true,
  value: '',
  quote: '0.0',
  gasInfo: {
    offered: "99244",
    spent: "56021917429",
    price: "13.435166043502429",
    quoteRate: "3942.78369140625",
    quote: "60825"
  },
  logs: [{
    contractAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    logOffset: 545,
    topics: [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      "0x000000000000000000000000a79e63e78eec28741e711f89a672a4c40876ebf3",
      "0x0000000000000000000000004869abed21ab40176a55e16d1fb46087067d628b"
    ],
    data: "0x00000000000000000000000000000000000000000000000000000000945d9d55",
    event: {
      name: "Transfer",
      signature: "Transfer(indexed address from, indexed address to, uint256 value)",
      params: [
        {
          name: "from",
          type: "address",
          indexed: true,
          decoded: true,
          value: "0xa79e63e78eec28741e711f89a672a4c40876ebf3"
        },
        {
          name: "to",
          type: "address",
          indexed: true,
          decoded: true,
          value: "0x4869abed21ab40176a55e16d1fb46087067d628b"
        },
        {
          name: "value",
          type: "uint256",
          indexed: false,
          decoded: true,
          value: "2489163093"
        }
      ]
    }
  }] as EventLog[],
  timestamp: "2021-12-23T16:29:44Z",
  blockHeight: 13862518,
  offset: 365,
}

export const allAssets: Balance[] = [
  {
    token: {
      token: {
        address: '0xat9e63e78eec28f41e105f89a672a4c40876ebf3',
        decimals: 18,
        name: 'Friends With Benefit',
        symbol: 'FWB',
        totalSupply: '',
      },
      balance: '15000000000000',
      values: [
        {
          currency: Currency.Usd,
          price: '12.0',
          value: '15000000000000',
        },
        {
          currency: Currency.Eur,
          price: '16.3',
          value: '15000000000000',
        }
      ]
    },
    unresolvedComponents: 0,
    components: []
  },
]
