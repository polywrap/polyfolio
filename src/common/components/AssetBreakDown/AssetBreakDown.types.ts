export interface IAssetBreakDown {
  title: string;
  assets: IAssetBreakDownItem[];
}

export interface IAssetBreakDownItem {
  icon: string;
  symbol: string;
  price: string;
  value: string;
}
