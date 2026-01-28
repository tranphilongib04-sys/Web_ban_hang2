'use client';

import React, { useState } from 'react';
import { BarChart3, Package, Settings, TrendingUp, Menu, X } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface DesktopAppLayoutProps {
  children: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Bảng Điều Khiển',
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    id: 'sales',
    label: 'Bán Hàng',
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    id: 'inventory',
    label: 'Kho Hàng',
    icon: <Package className="w-5 h-5" />,
  },
  {
    id: 'settings',
    label: 'Cài Đặt',
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function DesktopAppLayout({ children }: DesktopAppLayoutProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-950 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b border-blue-500 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">Dashboard</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-white text-blue-600 dark:bg-blue-800 dark:text-white'
                  : 'text-blue-100 hover:bg-blue-500'
              }`}
              title={item.label}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-blue-500">
          {sidebarOpen && (
            <div className="text-xs text-blue-100 space-y-1">
              <p className="font-semibold">Ver 1.0</p>
              <p>MacBook Desktop</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-4 sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {navItems.find((item) => item.id === activeTab)?.label}
          </h2>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {React.isValidElement(children)
            ? React.cloneElement(children as React.ReactElement<{ activeTab: string }>, {
                activeTab,
              })
            : children}
        </div>
      </div>
    </div>
  );
}
