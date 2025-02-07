'use client';

import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Sample data - replace with real data later
const monthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  incoming: [65, 59, 80, 81, 56, 55],
  outgoing: [28, 48, 40, 19, 86, 27],
  revenue: [28000000, 35000000, 29000000, 31000000, 42000000, 38000000],
  expenses: [15000000, 18000000, 16000000, 19000000, 22000000, 20000000],
};

const categoryData = {
  labels: ['Electronics', 'Furniture', 'Office Supplies', 'Others'],
  data: [300, 150, 100, 50],
};

const topProducts = [
  { name: 'Laptop Asus ROG', quantity: 50, revenue: 75000000 },
  { name: 'Monitor LG 27"', quantity: 35, revenue: 52500000 },
  { name: 'Keyboard Mechanical', quantity: 100, revenue: 30000000 },
  { name: 'Office Chair', quantity: 25, revenue: 25000000 },
];

const stockLoss = [
  { name: 'Laptop Asus ROG', quantity: 2, reason: 'Rusak dalam pengiriman', value: 6000000 },
  { name: 'Monitor LG 27"', quantity: 1, reason: 'Cacat produksi', value: 1500000 },
  { name: 'Keyboard Mechanical', quantity: 3, reason: 'Hilang di gudang', value: 900000 },
];

const stats = [
  { 
    name: 'Total Barang Masuk',
    value: '396',
    change: '12%',
    trend: 'up',
  },
  {
    name: 'Total Barang Keluar',
    value: '248',
    change: '8%',
    trend: 'up',
  },
  {
    name: 'Total Pendapatan',
    value: 'Rp 182.500.000',
    change: '15%',
    trend: 'up',
  },
  {
    name: 'Total Pengeluaran',
    value: 'Rp 110.000.000',
    change: '7%',
    trend: 'up',
  },
];

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState('7days');

  const stockMovementData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'Barang Masuk',
        data: monthlyData.incoming,
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
      },
      {
        label: 'Barang Keluar',
        data: monthlyData.outgoing,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
      },
    ],
  };

  const financeData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'Pendapatan',
        data: monthlyData.revenue,
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Pengeluaran',
        data: monthlyData.expenses,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const categoryDistributionData = {
    labels: categoryData.labels,
    datasets: [
      {
        data: categoryData.data,
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(234, 179, 8, 0.8)',
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Laporan
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="7days">7 Hari Terakhir</option>
            <option value="30days">30 Hari Terakhir</option>
            <option value="90days">90 Hari Terakhir</option>
            <option value="1year">1 Tahun</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">{stat.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-gray-900">
                {stat.value}
              </div>

              <div className={`inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0
                ${stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {stat.trend === 'up' ? (
                  <ArrowUpIcon className="h-4 w-4 flex-shrink-0 self-center text-green-500" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 flex-shrink-0 self-center text-red-500" />
                )}
                <span className="ml-1">{stat.change}</span>
              </div>
            </dd>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Finance Chart */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Pendapatan & Pengeluaran</h3>
          <Line
            data={financeData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => `Rp ${(value as number).toLocaleString('id-ID')}`,
                  },
                },
              },
            }}
          />
        </div>

        {/* Stock Movement Chart */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Pergerakan Stok</h3>
          <Bar
            data={stockMovementData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>

        {/* Category Distribution */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Distribusi Kategori</h3>
          <div className="h-[300px] flex items-center justify-center">
            <Doughnut
              data={categoryDistributionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right' as const,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Stock Loss */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Laporan Kerugian Stok</h3>
          <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                        Nama Produk
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                        Jumlah
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Alasan
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                        Nilai Kerugian
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {stockLoss.map((item) => (
                      <tr key={item.name}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                          {item.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.reason}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500">
                          Rp {item.value.toLocaleString('id-ID')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-lg bg-white p-6 shadow lg:col-span-2">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Produk Terlaris</h3>
          <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                        Nama Produk
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                        Jumlah Terjual
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                        Pendapatan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {topProducts.map((product) => (
                      <tr key={product.name}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                          {product.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500">
                          {product.quantity}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500">
                          Rp {product.revenue.toLocaleString('id-ID')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
