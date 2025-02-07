'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Sample data - replace with real data later
const stockData = [
  {
    id: 1,
    name: 'Laptop Asus ROG',
    category: 'Electronics',
    sku: 'LAP-ROG-001',
    stock: 15,
    minStock: 5,
    location: 'Rak A-1',
    status: 'In Stock',
    lastUpdated: '2025-02-04',
  },
  {
    id: 2,
    name: 'Monitor LG 27"',
    category: 'Electronics',
    sku: 'MON-LG-27',
    stock: 8,
    minStock: 3,
    location: 'Rak A-2',
    status: 'Low Stock',
    lastUpdated: '2025-02-03',
  },
  {
    id: 3,
    name: 'Office Chair',
    category: 'Furniture',
    sku: 'FUR-CHR-001',
    stock: 20,
    minStock: 10,
    location: 'Rak B-1',
    status: 'In Stock',
    lastUpdated: '2025-02-04',
  },
  {
    id: 4,
    name: 'HP Printer',
    category: 'Electronics',
    sku: 'PRT-HP-001',
    stock: 2,
    minStock: 5,
    location: 'Rak A-3',
    status: 'Critical',
    lastUpdated: '2025-02-04',
  },
  {
    id: 5,
    name: 'Filing Cabinet',
    category: 'Furniture',
    sku: 'FUR-CAB-001',
    stock: 12,
    minStock: 4,
    location: 'Rak B-2',
    status: 'In Stock',
    lastUpdated: '2025-02-02',
  },
];

const categories = ['All', 'Electronics', 'Furniture', 'Office Supplies', 'Others'];
const statuses = ['All', 'In Stock', 'Low Stock', 'Critical'];

export default function StockPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [items, setItems] = useState(stockData);

  // Filter function
  const filteredStock = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Stok Barang
          </h2>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Search */}
        <div className="relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Cari berdasarkan nama atau SKU"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div>
          <select
            className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'All' ? 'Semua Kategori' : category}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === 'All' ? 'Semua Status' : status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Total Items: {filteredStock.length}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th scope="col" className="py-4 pl-6 pr-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Barang
                </th>
                <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stok
                </th>
                <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Min. Stok
                </th>
                <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lokasi
                </th>
                <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Terakhir Update
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredStock.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-4 pl-6 pr-3 text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {item.sku}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {item.category}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {item.stock}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {item.minStock}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {item.location}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                      item.status === 'In Stock' 
                        ? 'bg-green-50 text-green-700 ring-green-600/20'
                        : item.status === 'Low Stock'
                        ? 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
                        : 'bg-red-50 text-red-700 ring-red-600/20'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {item.lastUpdated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
