'use client';

import { useState } from 'react';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Sample notifications data - replace with real data later
const sampleNotifications = [
  {
    id: 1,
    title: 'Stok Menipis',
    message: 'Barang "Keyboard Mechanical" memiliki stok di bawah batas minimum (5 items)',
    type: 'warning',
    timestamp: '5 menit yang lalu'
  },
  {
    id: 2,
    title: 'Barang Kadaluarsa',
    message: 'Barang "Snack ABC" akan kadaluarsa dalam 7 hari',
    type: 'danger',
    timestamp: '1 jam yang lalu'
  },
  {
    id: 3,
    title: 'Permintaan Baru',
    message: 'Ada permintaan barang baru yang membutuhkan persetujuan',
    type: 'info',
    timestamp: '3 jam yang lalu'
  }
];

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = sampleNotifications.length;

  return (
    <div className="relative">
      {/* Bell Icon with Badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-700 focus:outline-none mr-2"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Modal/Popup */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-25 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Notification Panel */}
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50 mr-2">
            <div className="p-4 bg-indigo-600 flex justify-between items-center">
              <h3 className="text-white font-medium">Notifikasi</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 focus:outline-none"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
              {sampleNotifications.map((notification) => (
                <div key={notification.id} className="p-4 hover:bg-gray-50">
                  <div className="flex space-x-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
