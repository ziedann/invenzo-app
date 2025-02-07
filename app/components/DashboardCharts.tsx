'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const stockCategories = {
  labels: ['Electronics', 'Furniture', 'Office Supplies', 'Books', 'Others'],
  datasets: [
    {
      data: [300, 150, 100, 80, 50],
      backgroundColor: [
        'rgba(99, 102, 241, 0.6)',  // Indigo (primary)
        'rgba(59, 130, 246, 0.6)',  // Blue
        'rgba(147, 51, 234, 0.6)',  // Purple
        'rgba(236, 72, 153, 0.6)',  // Pink
        'rgba(79, 70, 229, 0.6)',   // Darker indigo
      ],
      borderColor: [
        'rgb(99, 102, 241)',
        'rgb(59, 130, 246)',
        'rgb(147, 51, 234)',
        'rgb(236, 72, 153)',
        'rgb(79, 70, 229)',
      ],
      borderWidth: 1,
    },
  ],
};

const monthlyTransactions = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Transaksi per Bulan',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: 'rgba(99, 102, 241, 0.6)',
      borderColor: 'rgb(99, 102, 241)',
      borderWidth: 1,
      borderRadius: 5,
    },
  ],
};

export function StockDonutChart() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Distribusi Stok per Kategori',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          bottom: 20
        }
      },
    },
    cutout: '60%',
  };

  return (
    <div style={{ height: '300px' }}>
      <Doughnut options={options} data={stockCategories} />
    </div>
  );
}

export function MonthlyTransactionChart() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Transaksi Bulanan',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          bottom: 20
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Bar options={options} data={monthlyTransactions} />
    </div>
  );
}
