interface IAssetOverviewItems {
  id: number;
  label: string;
  content: string;
  type: string;
}

export const items: IAssetOverviewItems[] = [
  {
    id: 1,
    label: "0x378...3832 Owns",
    content: "5,208.343 GRT",
    type: "main",
  },
  {
    id: 2,
    label: "Valued at",
    content: "$1,150,066.50",
    type: "common",
  },
  {
    id: 3,
    label: "Change (1D)",
    content: "+0.02%",
    type: "profit",
  },
]

export const items2 = [
  {
    id: 1,
    label: "Market Cap",
    content: "$4.67B",
    type: "common",
  },
  {
    id: 2,
    label: "Circulating Supply",
    content: "$4.96B GRT",
    type: "common",
  },
  {
    id: 3,
    label: "Volume (1D)",
    content: "$177.66M",
    type: "common",
  },
]
