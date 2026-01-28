'use client';

import React, { useState } from 'react';
import DesktopAppLayout from '@/components/desktop/DesktopAppLayout';
import DesktopDashboard from '@/components/desktop/DesktopDashboard';
import DesktopSales from '@/components/desktop/DesktopSales';
import DesktopInventory from '@/components/desktop/DesktopInventory';
import DesktopSettings from '@/components/desktop/DesktopSettings';

function ContentRenderer({ activeTab }: { activeTab: string }) {
  return (
    <>
      <DesktopDashboard activeTab={activeTab} />
      <DesktopSales activeTab={activeTab} />
      <DesktopInventory activeTab={activeTab} />
      <DesktopSettings activeTab={activeTab} />
    </>
  );
}

export default function DesktopApp() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-gradient-to-b from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-950 text-white flex flex-col">
        <div className="p-6 border-b border-blue-500">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>

        <nav className="flex-1 p-4 space-y-3">
          {[
            { id: 'dashboard', label: 'Bảng Điều Khiển', icon: '📊' },
            { id: 'sales', label: 'Bán Hàng', icon: '📈' },
            { id: 'inventory', label: 'Kho Hàng', icon: '📦' },
            { id: 'settings', label: 'Cài Đặt', icon: '⚙️' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-white text-blue-600 dark:bg-blue-800 dark:text-white'
                  : 'text-blue-100 hover:bg-blue-500'
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-500">
          <div className="text-xs text-blue-100 space-y-1">
            <p className="font-semibold">Ver 1.0</p>
            <p>MacBook Desktop</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-4 sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {
              [
                { id: 'dashboard', label: 'Bảng Điều Khiển' },
                { id: 'sales', label: 'Bán Hàng' },
                { id: 'inventory', label: 'Kho Hàng' },
                { id: 'settings', label: 'Cài Đặt' },
              ].find((item) => item.id === activeTab)?.label
            }
          </h2>
        </div>

        <div className="p-8">
          <ContentRenderer activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}
