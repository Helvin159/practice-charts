'use client';
import React, { useEffect, useRef } from 'react';

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

const ChartJsLineChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = chartRef.current!.getContext('2d') as ChartItem;
    if (ctx) {
      myChartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          // labels: chartJsDateData,
          labels: chartJsDatesData,
          datasets: [
            {
              label: 'VA Mortgage Indices',
              data: chartJsRatesData,
              borderColor: '#16405a',
              // backgroundColor: 'rgba(133, 137, 18, 1)',
              fill: {
                target: 'origin',
                above: 'rgb(255, 0, 0)', // Area will be red above the origin
                below: 'rgb(0, 0, 255)' // And blue below the origin
              },
              borderWidth: 2.5,
              tension: 0.05,
              pointBorderWidth: 0.8,
              pointBorderColor: '#008000'
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
              text: '6 Month VA Mortgage Indices',
              font: {
                size: 20,
                weight: 'bold'
              },
              color: '#16405a'
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
              min: Math.min(...chartJsRatesData),
              max: Math.max(...chartJsRatesData),
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

    return () => {
      if (myChartRef.current) myChartRef.current.destroy();
    };
  }, []);

  return (
    <>
      <div style={{ width: '800px', margin: '0 auto' }}>
        <canvas ref={chartRef} width='400' height='300'></canvas>
      </div>
    </>
  );
};

export default ChartJsLineChart;
