'use client';
import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

import { interestRateData } from '../../_utils/interestRateData';

const TimeSeriesChart = () => {
  const chartRef = useRef(null);
  const series = [
    {
      name: 'HRM',
      data: interestRateData
    }
  ];

  useEffect(() => {
    const options = {
      series,
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: false,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      // Line Color
      colors: ['#000'],
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      title: {
        text: 'Interest Rate Movement',
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
          formatter: function (val) {
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
          forceNiceScale: true,
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          }
        }
      },
      stroke: {
        width: 2,
        curve: 'straight'
      }
    };

    const chart = new ApexCharts(chartRef.current, options);

    chart.render();
  }, []);

  return (
    <div>
      <div ref={chartRef} />
    </div>
  );
};

export default TimeSeriesChart;
