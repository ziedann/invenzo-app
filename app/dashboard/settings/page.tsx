'use client';

import { useState } from 'react';
import { UserCircleIcon, KeyIcon, BellIcon, Cog6ToothIcon, PencilSquareIcon, XMarkIcon, EyeIcon, EyeSlashIcon, Bars3Icon } from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    username: 'admin.example',
    fullName: 'Administrator',
    email: 'admin@example.com',
    currentPassword: 'current123',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      browser: true,
      stockAlerts: true,
      loginAlerts: true
    },
    theme: 'light',
    language: 'id'
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name.startsWith('notifications.')) {
      const notificationKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notificationKey]: (e.target as HTMLInputElement).checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');

    // Redirect to another page (e.g., home page or login page)
    window.location.href = '/auth/login'; // Change '/login' to the desired page URL
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingProfile) {
      setIsEditingProfile(false);
    }
    // Handle form submission
    console.log('Settings updated:', formData);
  };

  const toggleEditProfile = () => {
    setIsEditingProfile(!isEditingProfile);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6 px-4 sm:px-0">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden -ml-2 p-2 text-gray-500 hover:text-gray-600"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
            <span className="sr-only">Open menu</span>
          </button>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Pengaturan Akun
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Mobile Menu Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar Navigation - Fixed on larger screens, slide-out on mobile */}
        <div className={`
          lg:col-span-1 
          ${isMobileMenuOpen ? 'fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-300 ease-in-out' : 'fixed inset-y-0 left-0 z-40 w-64 bg-white transform -translate-x-full transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0'}
        `}>
          <div className="h-full flex flex-col">
            {/* Mobile Menu Header */}
            <div className="px-4 py-4 border-b border-gray-200 lg:hidden">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Menu</h3>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-gray-500 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
              <a
                href="#profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md group"
              >
                <UserCircleIcon className="mr-3 h-6 w-6" />
                <span>Profil</span>
              </a>
              <a
                href="#notifications"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md group"
              >
                <BellIcon className="mr-3 h-6 w-6" />
                <span>Notifikasi</span>
              </a>
              <a
                href="#preferences"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md group"
              >
                <Cog6ToothIcon className="mr-3 h-6 w-6" />
                <span>Preferensi</span>
              </a>
            </nav>

            {/* Logout Button */}
            <div className="px-4 py-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 px-4 sm:px-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Section */}
            <div id="profile" className="bg-white shadow sm:rounded-lg">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Profil</h3>
                  <button
                    type="button"
                    onClick={toggleEditProfile}
                    className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm 
                      ${isEditingProfile
                        ? 'text-gray-700 bg-white hover:bg-gray-50 ring-1 ring-inset ring-gray-300'
                        : 'text-indigo-600 hover:text-indigo-500'}`}
                  >
                    {isEditingProfile ? (
                      <>
                        <XMarkIcon className="h-5 w-5 mr-2" />
                        <span>Batal</span>
                      </>
                    ) : (
                      <>
                        <PencilSquareIcon className="h-5 w-5 mr-2" />
                        <span>Edit</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        disabled={!isEditingProfile}
                        className={`mt-1 block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6
                          ${isEditingProfile
                            ? 'border-0 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
                            : 'border-0 bg-gray-50 read-only:text-gray-700'}`}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        disabled={!isEditingProfile}
                        className={`mt-1 block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6
                          ${isEditingProfile
                            ? 'border-0 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
                            : 'border-0 bg-gray-50 read-only:text-gray-700'}`}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditingProfile}
                        className={`mt-1 block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6
                          ${isEditingProfile
                            ? 'border-0 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
                            : 'border-0 bg-gray-50 read-only:text-gray-700'}`}
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Password</h4>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                          Password Saat Ini
                        </label>
                        <div className="relative mt-1">
                          <input
                            type={showPasswords.current ? 'text' : 'password'}
                            name="currentPassword"
                            id="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            disabled={!isEditingProfile}
                            className={`block w-full rounded-md pr-10 px-3 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6
                              ${isEditingProfile
                                ? 'border-0 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
                                : 'border-0 bg-gray-50 read-only:text-gray-700'}`}
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility('current')}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                          >
                            {showPasswords.current ? (
                              <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                              <EyeIcon className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {isEditingProfile && (
                        <>
                          <div className="sm:col-span-2">
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                              Password Baru
                            </label>
                            <div className="relative mt-1">
                              <input
                                type={showPasswords.new ? 'text' : 'password'}
                                name="newPassword"
                                id="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 pr-10 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibility('new')}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                              >
                                {showPasswords.new ? (
                                  <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                  <EyeIcon className="h-5 w-5" />
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                              Konfirmasi Password Baru
                            </label>
                            <div className="relative mt-1">
                              <input
                                type={showPasswords.confirm ? 'text' : 'password'}
                                name="confirmPassword"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 pr-10 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibility('confirm')}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                              >
                                {showPasswords.confirm ? (
                                  <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                  <EyeIcon className="h-5 w-5" />
                                )}
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {isEditingProfile && (
                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Simpan Perubahan
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div id="notifications" className="bg-white shadow sm:rounded-lg">
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Notifikasi</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="notifications.email"
                      id="notifications.email"
                      checked={formData.notifications.email}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="notifications.email" className="ml-3 text-sm font-medium text-gray-700">
                      Notifikasi Email
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="notifications.browser"
                      id="notifications.browser"
                      checked={formData.notifications.browser}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="notifications.browser" className="ml-3 text-sm font-medium text-gray-700">
                      Notifikasi Browser
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="notifications.stockAlerts"
                      id="notifications.stockAlerts"
                      checked={formData.notifications.stockAlerts}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="notifications.stockAlerts" className="ml-3 text-sm font-medium text-gray-700">
                      Peringatan Stok Menipis
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="notifications.loginAlerts"
                      id="notifications.loginAlerts"
                      checked={formData.notifications.loginAlerts}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="notifications.loginAlerts" className="ml-3 text-sm font-medium text-gray-700">
                      Peringatan Login Baru
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div id="preferences" className="bg-white shadow sm:rounded-lg">
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Preferensi</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                      Tema
                    </label>
                    <select
                      name="theme"
                      id="theme"
                      value={formData.theme}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="light">Terang</option>
                      <option value="dark">Gelap</option>
                      <option value="system">Sistem</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                      Bahasa
                    </label>
                    <select
                      name="language"
                      id="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="id">Bahasa Indonesia</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
