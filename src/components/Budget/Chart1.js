import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';


class Chart1 extends Component {
  render() {
    return (
      <Doughnut data={{
        labels: [
          'food'
        ],
        datasets: [{
          data: [300, 50, 100],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }]
      }} />
    )
  }
}

export default Chart1;