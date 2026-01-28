'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  Package,
  Search,
  Filter,
} from 'lucide-react';

interface DesktopInventoryProps {
  activeTab: string;
}

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  reorderLevel: number;
  lastRestocked: string;
  supplier: string;
}

const inventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Laptop Dell XPS 13',
    sku: 'DX-13-2024',
    category: 'Điện Tử',
    currentStock: 5,
    minStock: 3,
    maxStock: 15,
    reorderLevel: 5,
    lastRestocked: '2024-01-20',
    supplier: 'Dell Vietnam',
  },
  {
    id: '2',
    name: 'iPhone 15 Pro',
    sku: 'IP-15P-256',
    category: 'Điện Tử',
    currentStock: 12,
    minStock: 5,
    maxStock: 20,
    reorderLevel: 8,
    lastRestocked: '2024-01-18',
    supplier: 'Apple Authorized',
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    sku: 'SY-WH5-BLK',
    category: 'Điện Tử',
    currentStock: 2,
    minStock: 3,
    maxStock: 10,
    reorderLevel: 5,
    lastRestocked: '2024-01-15',
    supplier: 'Sony Vietnam',
  },
  {
    id: '4',
    name: 'Áo Phông Premium',
    sku: 'TP-M-BLU',
    category: 'Quần Áo',
    currentStock: 50,
    minStock: 20,
    maxStock: 100,
    reorderLevel: 30,
    lastRestocked: '2024-01-22',
    supplier: 'Premium Textiles',
  },
  {
    id: '5',
    name: 'Quần Jean',
    sku: 'QJ-32-DK',
    category: 'Quần Áo',
    currentStock: 35,
    minStock: 15,
    maxStock: 80,
    reorderLevel: 25,
    lastRestocked: '2024-01-21',
    supplier: 'Denim Co',
  },
  {
    id: '6',
    name: 'Giày Thể Thao',
    sku: 'GT-42-WH',
    category: 'Quần Áo',
    currentStock: 1,
    minStock: 5,
    maxStock: 50,
    reorderLevel: 15,
    lastRestocked: '2024-01-10',
    supplier: 'Sports Wear Ltd',
  },
  {
    id: '7',
    name: 'Coffee Beans 1kg',
    sku: 'CB-1KG-AA',
    category: 'Thực Phẩm',
    currentStock: 15,
    minStock: 10,
    maxStock: 50,
    reorderLevel: 20,
    lastRestocked: '2024-01-19',
    supplier: 'Coffee Imports',
  },
  {
    id: '8',
    name: 'Chocolate Premium',
    sku: 'CH-200G-DK',
    category: 'Thực Phẩm',
    currentStock: 30,
    minStock: 15,
    maxStock: 60,
    reorderLevel: 25,
    lastRestocked: '2024-01-23',
    supplier: 'Chocolate Factory',
  },
];

const getStockStatus = (current: number, min: number, max: number) => {
  if (current < min) return 'critical';
  if (current < min * 1.5) return 'low';
  if (current > max) return 'overstocked';
  return 'normal';
};

export default function DesktopInventory({ activeTab }: DesktopInventoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  if (activeTab !== 'inventory') return null;

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const status = getStockStatus(item.currentStock, item.minStock, item.maxStock);
    const matchesFilter =
      statusFilter === 'all' || status === statusFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {[
            { value: 'all', label: 'Tất Cả' },
            { value: 'critical', label: 'Tới Hạn' },
            { value: 'low', label: 'Thấp' },
            { value: 'normal', label: 'Bình Thường' },
            { value: 'overstocked', label: 'Quá Tồn' },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                statusFilter === filter.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <Filter className="w-4 h-4" />
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Sản Phẩm
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  SKU
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Danh Mục
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Tồn Kho
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Mức Tối Thiểu
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Mức Tối Đa
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Trạng Thái
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Nhà Cung Cấp
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => {
                const status = getStockStatus(
                  item.currentStock,
                  item.minStock,
                  item.maxStock
                );
                const stockPercentage =
                  ((item.currentStock - item.minStock) /
                    (item.maxStock - item.minStock)) *
                  100;

                return (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
                      {item.sku}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
                      {item.category}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="font-bold text-gray-900 dark:text-white">
                        {item.currentStock}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">
                      {item.minStock}
                    </td>
                    <td className="py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">
                      {item.maxStock}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              status === 'critical'
                                ? 'bg-red-500'
                                : status === 'low'
                                  ? 'bg-yellow-500'
                                  : status === 'overstocked'
                                    ? 'bg-orange-500'
                                    : 'bg-green-500'
                            }`}
                            style={{
                              width: `${Math.max(0, Math.min(100, stockPercentage))}%`,
                            }}
                          />
                        </div>
                        {status === 'critical' ? (
                          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
                      {item.supplier}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: 'Tồn Kho Bình Thường',
            count: inventoryItems.filter(
              (i) =>
                getStockStatus(i.currentStock, i.minStock, i.maxStock) ===
                'normal'
            ).length,
            color: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200',
          },
          {
            label: 'Tồn Kho Thấp',
            count: inventoryItems.filter(
              (i) =>
                getStockStatus(i.currentStock, i.minStock, i.maxStock) === 'low'
            ).length,
            color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200',
          },
          {
            label: 'Tới Hạn',
            count: inventoryItems.filter(
              (i) =>
                getStockStatus(i.currentStock, i.minStock, i.maxStock) ===
                'critical'
            ).length,
            color: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200',
          },
          {
            label: 'Quá Tồn',
            count: inventoryItems.filter(
              (i) =>
                getStockStatus(i.currentStock, i.minStock, i.maxStock) ===
                'overstocked'
            ).length,
            color: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200',
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-lg p-4 ${stat.color} text-center`}
          >
            <p className="text-2xl font-bold">{stat.count}</p>
            <p className="text-xs font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
