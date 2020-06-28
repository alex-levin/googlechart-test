import React from 'react';
import { Chart } from 'react-google-charts';

// const uri =
//   'https://financialmodelingprep.com/api/v3/technical/company/historical-price/AAPL?serietype=line&serieformat=array&apikey=demo';
// data from pandas_datareader (my stocks-data project)
const uri = 'stockdata.json';

const options = {
  crosshair: {
    trigger: 'both',
    orientation: 'both'
  },
  seriesType: 'line',
  colors: ['#3365cc'],
  //   series: {
  //     0: {
  //       targetAxisIndex: 1
  //     },
  //     1: {
  //       targetAxisIndex: 0
  //     }
  //   },
  height: 600,
  width: 800,
  //   backgroundColor: {
  //     fill: '#FFFFFF'
  //   },
  chartArea: {
    height: '80%',
    width: '80%'
  },
  legend: 'none',
  vAxes: {
    0: {
      textStyle: {
        fontSize: 10,
        color: 'black'
      },
      gridlines: {
        color: '#dcd7da'
      }
    },
    1: {
      textStyle: {
        fontSize: 10,
        color: 'black'
      },
      gridlines: {
        color: '#dcd7da'
      }
    }
  }
};

class GoogleChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xyValues: []
    };
  }

  componentDidMount() {
    let datePrice = [['x', 'Adj Close']];
    fetch(uri)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        for (const [key, value] of Object.entries(responseJson)) {
          //console.log([key, value['Adj Close']]);
          datePrice.push([new Date(key.substring(0, 10)), value['Adj Close']]);
        }
        console.log(datePrice);
        this.setState({ xyValues: datePrice });
      });
  }

  render() {
    return (
      <div>
        <Chart
          width={400}
          height={300}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={this.state.xyValues}
          options={options}
        />
      </div>
    );
  }
}

export default GoogleChart;
