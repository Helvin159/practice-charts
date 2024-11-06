'use client';
import React, { useEffect, useRef, useState } from 'react';

import {
  Chart,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartItem
} from 'chart.js';
import {
  chartJsDateData3Months,
  chartJsRatesData3Months,
  chartJsDatesData,
  chartJsRatesData
} from '@/app/_utils/interestRateData';

Chart.register(
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

import './ChartJsLineChart.css';

const ChartJsLineChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart | null>(null);
  const [rates, setRates] = useState<Array<number>>(chartJsRatesData);
  const [dates, setDates] = useState<Array<string>>(chartJsDatesData);

  const updateChart = (val: number) => {
    if (myChartRef.current) {
      myChartRef.current.data.labels = dates;
      myChartRef.current.data.datasets[0].data = rates;

      myChartRef.current.options!.plugins!.title!.text = `${val} Month VA Mortgage Rates`;

      // Dynamically adjust y-axis scale
      myChartRef.current.options.scales!.y!.min = Math.min(...rates);

      // Apply updates
      myChartRef.current.update();
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const val = Number((e.target as HTMLButtonElement).value);

    if (val == 3) {
      setRates(chartJsRatesData3Months);
      setDates(chartJsDateData3Months);
    } else if (val == 6) {
      setRates(chartJsRatesData);
      setDates(chartJsDatesData);
    } else {
      console.error('Error');
    }

    updateChart(val);
  };

  useEffect(() => {
    const ctx = chartRef.current!.getContext('2d') as ChartItem;
    if (rates) {
      if (ctx) {
        myChartRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            // labels: chartJsDateData,
            labels: dates,
            datasets: [
              {
                label: 'VA Mortgage Rates',
                data: rates,
                borderColor: '#16405a',
                // backgroundColor: 'rgba(133, 137, 18, 1)',
                fill: {
                  target: 'origin',
                  above: 'rgb(255, 0, 0)', // Area will be red above the origin
                  below: 'rgb(0, 0, 255)' // And blue below the origin
                },
                borderWidth: 3,
                tension: 0.05,
                pointBorderWidth: 0,
                pointRadius: 0
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: '6 Month VA Mortgage Rates',
                font: {
                  size: 20,
                  weight: 'bold'
                },
                color: '#16405a'
              },
              tooltip: {
                enabled: true,
                mode: 'nearest',
                intersect: false
              }
            },
            elements: {
              line: {
                tension: 0
              }
            },
            scales: {
              x: {
                grid: {
                  display: true
                },
                ticks: {
                  font: {
                    size: 12
                  },
                  maxTicksLimit: 6
                }
              },
              y: {
                beginAtZero: true,
                min: Math.min(...rates),
                max: Math.max(...rates),
                grid: {
                  display: false
                },
                ticks: {
                  callback: function (value) {
                    return `${value}%`; // Display percentage format
                  },

                  font: {
                    size: 12
                  },
                  stepSize: 0.01 // Adjust step size as needed
                }
              }
            }
          }
        });
      }
    }

    return () => {
      if (myChartRef.current) myChartRef.current.destroy();
    };
  }, [rates, dates]);

  return (
    <section>
      <div className='chart-wrapper'>
        <canvas ref={chartRef} width='400' height='300'></canvas>
        <div>
          <button value={3} onClick={handleClick}>
            3 months
          </button>
          <button value={6} onClick={handleClick}>
            6 months
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChartJsLineChart;
