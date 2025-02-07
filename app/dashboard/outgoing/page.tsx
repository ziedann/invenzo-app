'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Sample data - replace with real data later
const outgoingData = [
  {
    id: 1,
    date: '2024-02-04T10:45:00',
    itemName: 'Laptop Asus ROG',
    sku: 'LAP-001',
    recipient: 'Toko Computer City',
    quantity: 2,
    status: 'Shipped',
    notes: 'Regular order'
  },
  {
    id: 2,
    date: '2024-02-03T15:20:00',
    itemName: 'Monitor LG 27"',
    sku: 'MON-002',
    recipient: 'PT Global Tech',
    quantity: 5,
    status: 'Processing',
    notes: 'Urgent delivery'
  },
];

export default function OutgoingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    itemName: '',
    sku: '',
    recipient: '',
    quantity: '',
    notes: '',
  });

  // Filter function
  const filteredData = outgoingData.filter(item => {
    const matchesSearch = 
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.recipient.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add validation
    if (!newItem.itemName || !newItem.sku || !newItem.recipient || !newItem.quantity) {
      alert('Mohon lengkapi semua field yang diperlukan');
      return;
    }

    // Here you would typically make an API call to save the data
    console.log('Saving new outgoing item:', newItem);

    // Add the new item to the list (in a real app, this would come from the API response)
    const newItemWithDefaults = {
      id: outgoingData.length + 1,
      date: new Date().toISOString(),
      status: 'Processing',
      ...newItem,
      quantity: parseInt(newItem.quantity)
    };

    outgoingData.unshift(newItemWithDefaults);

    // Reset form and close modal
    setNewItem({
      itemName: '',
      sku: '',
      recipient: '',
      quantity: '',
      notes: '',
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Barang Keluar
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Tambah Barang Keluar
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Search */}
        <div className="relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Cari berdasarkan nama, SKU, atau penerima"
          />
        </div>

        {/* Status filter */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="All">Semua Status</option>
            <option value="Shipped">Shipped</option>
            <option value="Processing">Processing</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Tanggal & Waktu
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Nama Barang
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      SKU
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Penerima
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Jumlah
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Catatan
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredData.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {new Date(item.date).toLocaleString('id-ID', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.itemName}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.sku}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.recipient}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.quantity}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          item.status === 'Shipped' ? 'bg-green-100 text-green-800' :
                          item.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
          <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                {/* Modal Header */}
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="absolute right-0 top-0 pr-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                      <PlusIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3 className="text-lg font-semibold leading-6 text-gray-900">
                        Tambah Barang Keluar
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        Lengkapi informasi barang keluar di bawah ini. Field dengan tanda * wajib diisi.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="bg-white px-4 pb-4 sm:p-6 sm:pb-4">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label htmlFor="itemName" className="block text-sm font-medium leading-6 text-gray-900">
                          Nama Barang *
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="itemName"
                            id="itemName"
                            value={newItem.itemName}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Masukkan nama barang"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="sku" className="block text-sm font-medium leading-6 text-gray-900">
                          SKU *
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="sku"
                            id="sku"
                            value={newItem.sku}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Masukkan SKU barang"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
                          Jumlah *
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="quantity"
                            id="quantity"
                            min="1"
                            value={newItem.quantity}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Masukkan jumlah"
                            required
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="recipient" className="block text-sm font-medium leading-6 text-gray-900">
                          Penerima *
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="recipient"
                            id="recipient"
                            value={newItem.recipient}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Masukkan nama penerima"
                            required
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="notes" className="block text-sm font-medium leading-6 text-gray-900">
                          Catatan
                        </label>
                        <div className="mt-2">
                          <textarea
                            name="notes"
                            id="notes"
                            rows={3}
                            value={newItem.notes}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Tambahkan catatan jika diperlukan..."
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Maksimal 500 karakter.
                        </p>
                      </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:w-auto"
                      >
                        Simpan
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
