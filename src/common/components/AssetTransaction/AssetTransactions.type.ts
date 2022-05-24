export interface ITransaction {
  id: string;
  type: string;
  icon: string;
  time: string;
  token: [
    {
      id: string;
      icon: string;
      token_amount: string;
      token_ticker: string;
      dollar_amount: number | string;
    },
  ];
  subjectOfAction: {
    icon: string;
    address: string;
  };
}
