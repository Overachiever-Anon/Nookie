import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function TurnipChart({ prices, darkMode }) {
  const labels = prices.map(price => `${price.day}`);
  const amPrices = prices.map(price => price.amPrice);
  const pmPrices = prices.map(price => price.pmPrice);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: darkMode ? '#fff' : '#666'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: darkMode ? '#2d2d2d' : '#fff',
        titleColor: darkMode ? '#fff' : '#000',
        bodyColor: darkMode ? '#fff' : '#000',
        borderColor: darkMode ? '#404040' : '#ddd',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: darkMode ? '#404040' : '#ddd'
        },
        ticks: {
          color: darkMode ? '#fff' : '#666'
        }
      },
      x: {
        grid: {
          color: darkMode ? '#404040' : '#ddd'
        },
        ticks: {
          color: darkMode ? '#fff' : '#666'
        }
      }
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'AM Price',
        data: amPrices,
        borderColor: '#00ff88',
        backgroundColor: 'rgba(0, 255, 136, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'PM Price',
        data: pmPrices,
        borderColor: '#3366ff',
        backgroundColor: 'rgba(51, 102, 255, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  return (
    <Box sx={{ height: 300, mb: 3 }}>
      <Line options={options} data={data} />
    </Box>
  );
}

export default TurnipChart;