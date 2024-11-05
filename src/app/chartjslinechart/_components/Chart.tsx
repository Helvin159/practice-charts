import React, { useEffect, useRef } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import {
  chartJsDateData,
  chartJsDatesData,
  chartJsRatesData
} from '@/app/_utils/interestRateData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    new ChartJS(ctx, {
      type: 'line',
      data: {
        // labels: chartJsDateData,
        labels: chartJsDatesData,
        datasets: [
          {
            label: 'VA Mortgage Indices',
            data: chartJsRatesData,
            borderColor: '#16405a',
            backgroundColor: 'rgba(22, 64, 90, 0.1)',
            fill: true,
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
                return value.toFixed(3) + '%'; // Display percentage format
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
  });

  return (
    <>
      <div style={{ width: '800px', margin: '0 auto' }}>
        <canvas ref={chartRef} width='400' height='300'></canvas>
      </div>
    </>
  );
};

export default Chart;
