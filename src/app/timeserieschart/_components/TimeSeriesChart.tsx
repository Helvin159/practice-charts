'use client';
import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

import { interestRateData } from '../../_utils/interestRateData';

const TimeSeriesChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const apexChartRef = useRef<ApexCharts | null>(null);

  useEffect(() => {
    const series = [
      {
        name: 'HRM',
        data: interestRateData
      }
    ];
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
          forceNiceScale: true,
          formatter: function (val: number) {
            return (val / 1000000).toFixed(0);
          }
        }
      },
      stroke: {
        width: 2,
        curve: 'straight'
      }
    };

    apexChartRef.current = new ApexCharts(chartRef.current, options);
    apexChartRef.current.render();

    return () => {
      if (apexChartRef.current) apexChartRef.current.destroy();
    };
  }, []);

  return (
    <>
      <div style={{ width: '100%', margin: '0 auto', textAlign: 'center' }}>
        <h1>ApexChartsJs Time Series Chart</h1>
      </div>
      <div ref={chartRef} />
    </>
  );
};

export default TimeSeriesChart;
