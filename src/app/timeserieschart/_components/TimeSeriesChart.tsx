'use client';
import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import dayjs from 'dayjs';

const TimeSeriesChart = () => {
  const chartRef = useRef(null);

  const generateData = () => {
    const data = [];

    let ts = dayjs().subtract(30, 'days').valueOf();
    for (let i = 0; i < 30; i++) {
      ts += 86400000; // Increment by one day
      data.push([ts, Math.floor(Math.random() * 100) + 1]);
    }
    return data;
  };

  console.log(generateData());

  useEffect(() => {
    const options = {
      series: [
        {
          name: 'XYZ MOTORS',
          data: generateData()
        }
      ],
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      title: {
        text: 'Stock Price Movement',
        align: 'left'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      yaxis: {
        labels: {
          formatter: function (val: number) {
            return (val / 1000000).toFixed(0);
          }
        },
        title: {
          text: 'Price'
        }
      },
      xaxis: {
        type: 'datetime'
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val: number) {
            return (val / 1000000).toFixed(0);
          }
        }
      }
    };
    const chart = new ApexCharts(document.querySelector('#chart'), options);

    chart.render();
  }, []);

  return <div id='chart' ref={chartRef}></div>;
};

export default TimeSeriesChart;
