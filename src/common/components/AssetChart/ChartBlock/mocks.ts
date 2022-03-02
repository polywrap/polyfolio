const dates = [
  '1 Aug',
  '2 Aug',
  '3 Aug',
  '4 Aug',
  '5 Aug',
  '6 Aug',
  '7 Aug',
  '8 Aug',
  '9 Aug',
  '10 Aug',
  '11 Aug',
  '12 Aug',
  '13 Aug',
  '14 Aug',
  '15 Aug',
]

const prices = [
  121,
  120,
  119,
  118,
  117,
  116,
  115,
  114,
  113,
  112,
  111,
  110,
  109,
]

export const options = {
  series: [{
    name: "STOCK ABC",
    data: prices
  }],
  chart: {
    type: 'area',
    height: 350,
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },

  labels: dates,
  xaxis: {
    type: 'datetime',
    lines: {
      show: false
    }
  },
  yaxis: {
    lines: {
      show: false,
    }
  },
  legend: {
    horizontalAlign: 'left'
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.1,
      gradientToColors: ['rgb(109, 231, 182)', 'rgb(109, 231, 182)'], // optional, if not defined - uses the shades of same color in series
      inverseColors: false,
      opacityFrom: 0,
      opacityTo: 0.5,
      stops: [0, 100],
      colorStops: []
    }
  }
}

export const singleConstants = {
  mainPrice: '$0.0937',
  percentProfit: '+0.02%',
  currencyProfit: '+$0.56',
  time: [
    '15Min',
    '30Min',
    '1H',
    '6H',
    '8H',
    '12H',
    '1D',
    '1W',
    '1M',
  ]
}
