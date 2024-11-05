import React, { useEffect, useRef } from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

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
  const chartRef = useRef(null)


  useEffect(() =>{
    const ctx = chartRef.current.getContext('2d');

    new ChartJS(ctx, {
    type: 'line',
    data: {
      labels: ['May 6', 'Jun 3', 'Jul 1', 'Jul 29', 'Aug 26', 'Sep 23', 'Oct 21'],
      datasets: [{
        label: 'VA Mortgage Indices',
        data: [6.75, 6.55, 6.3, 6.2, 5.95, 5.6, 6.0, ], // Example data points
        borderColor: '#16405a', // Line color
        backgroundColor: 'rgba(22, 64, 90, 0.1)', // Line fill color (optional)
        fill: true,
        borderWidth: 2,
        tension: 0,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false // Hide the legend if you only have one dataset
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
      scales: {
        x: {
          grid: {
            display: true
          },
          ticks: {
            font: {
              size: 12
            },
            maxTicksLimit: 6,
          },
        },
        y: {
          beginAtZero: false,
          grid: {
            display: false
          },
          ticks: {
            callback: function(value) {
              return value.toFixed(3) + '%'; // Display percentage format
            },

            font: {
              size: 12
            },
            stepSize: 0.25 // Adjust step size as needed
          }
        }
      }
    }
    });
  })

  return (
    <>
    <div style={{width: '800px', margin: '0 auto'}}>
      <canvas ref={chartRef} width="400" height="300"></canvas>
    </div>

    <footer className="text-center">
      <p>Practice</p>
    </footer>
    </>
  );
}

export default Chart
