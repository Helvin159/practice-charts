'use client';
import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';

import { interestRateData } from '../../_utils/interestRateData';

import './TimeSeriesChart.css';

const TimeSeriesChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const apexChartRef = useRef<ApexCharts | null>(null);
  const [seriesData, setSeriesData] = useState<{ x: number; y: number }[]>(
    interestRateData.map((i) => ({
      x: new Date(i.x).getTime(),
      y: i.y
    }))
  );

  useEffect(() => {
    const series = [
      {
        name: 'HRM',
        data: seriesData
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
            return val.toFixed(3) + '%';
          }
        },
        title: {
          text: 'Rate'
        },
        lines: {
          show: false
        }
      },
      xaxis: {
        type: 'datetime',
        lines: {
          show: true
        }
      },
      tooltip: {
        shared: false,
        y: {
          forceNiceScale: true,
          formatter: function (val: number) {
            return val.toFixed(3);
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
  }, [seriesData]);

  const updateChart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const val = Number((e.target as HTMLButtonElement).value);
    const arr = interestRateData.map((i) => ({
      x: new Date(i.x).getTime(),
      y: i.y
    }));

    if (val === 3) {
      setSeriesData(arr.slice(0, arr.length / 2));
    } else if (val === 2) {
      setSeriesData(arr.slice(0, arr.length / 3));
    } else if (val === 6) {
      setSeriesData(arr);
    }
  };

  return (
    <>
      <div className='container'>
        <h1>ApexChartsJs Time Series Chart</h1>
      </div>
      <div ref={chartRef} />
      <button value={2} onClick={updateChart}>
        2 months
      </button>
      <button value={3} onClick={updateChart}>
        3 months
      </button>
      <button value={6} onClick={updateChart}>
        6 months
      </button>
    </>
  );
};

export default TimeSeriesChart;
