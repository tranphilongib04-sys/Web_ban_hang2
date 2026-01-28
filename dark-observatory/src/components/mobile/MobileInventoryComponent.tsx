'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, Search, RefreshCw } from 'lucide-react';

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  category: string;
  status: 'ok' | 'low' | 'critical';
  minStock?: number;
}

/**
 * Mobile optimized inventory view
 * Features: Stock level alerts, search, quick updates
 */
export function MobileInventoryComponent() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'low' | 'critical'>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - Replace with API call
  const mockData: InventoryItem[] = [
    { id: 1, name: 'Laptop Pro 16', quantity: 5, price: 15000000, category: 'Electronics', status: 'low', minStock: 10 },
    { id: 2, name: 'USB Cable', quantity: 3, price: 50000, category: 'Accessories', status: 'critical', minStock: 20 },
    { id: 3, name: 'Mouse Wireless', quantity: 25, price: 500000, category: 'Accessories', status: 'ok' },
    { id: 4, name: 'Keyboard Mechanical', quantity: 8, price: 2000000, category: 'Accessories', status: 'low', minStock: 15 },
    { id: 5, name: 'Monitor 4K', quantity: 12, price: 5000000, category: 'Electronics', status: 'ok' },
    { id: 6, name: 'Headphones Pro', quantity: 2, price: 3000000, category: 'Audio', status: 'critical', minStock: 5 },
  ];

  useEffect(() => {
    // Load inventory data
    setItems(mockData);
  }, []);

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'low' && item.status === 'low') ||
      (filter === 'critical' && item.status === 'critical');
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const stats = {
    total: items.length,
    low: items.filter((i) => i.status === 'low').length,
    critical: items.filter((i) => i.status === 'critical').length,
    totalValue: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  };

  // Refresh inventory
  const handleRefresh = async () => {
    setIsLoading(true);
    // TODO: Fetch from API
    setTimeout(() => setIsLoading(false), 1000);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'low':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'critical':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default:
        return '';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ok':
        return 'Đủ hàng';
      case 'low':
        return 'Sắp hết';
      case 'critical':
        return 'Hết hàng';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b p-4 space-y-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tồn Kho</h1>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-lg w-full p-2 border border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`text-xs px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            Tất Cả ({stats.total})
          </button>
          <button
            onClick={() => setFilter('low')}
            className={`text-xs px-3 py-1 rounded ${filter === 'low' ? 'bg-yellow-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            Sắp Hết ({stats.low})
          </button>
          <button
            onClick={() => setFilter('critical')}
            className={`text-xs px-3 py-1 rounded ${filter === 'critical' ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            Hết ({stats.critical})
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-blue-50 dark:bg-blue-950 p-4 grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-slate-800 rounded p-3">
          <p className="text-xs text-gray-500">Tổng Giá Trị</p>
          <p className="text-lg font-bold text-blue-500">
            {(stats.totalValue / 1000000).toFixed(1)}M
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded p-3">
          <p className="text-xs text-gray-500">Cảnh báo</p>
          <p className="text-lg font-bold text-red-500">
            {stats.low + stats.critical}
          </p>
        </div>
      </div>

      {/* Inventory List */}
      <div className="flex-1 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Không có sản phẩm</p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredItems.map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-50 dark:hover:bg-slate-800">
                <div className="flex items-start justify-between gap-3">
                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{item.name}</p>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-2">
                      {item.category} • {item.price.toLocaleString('vi-VN')}đ
                    </p>

                    {/* Stock Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span>Số lượng:</span>
                        <span className="font-semibold">{item.quantity}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            item.status === 'critical'
                              ? 'bg-red-500'
                              : item.status === 'low'
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          }`}
                          style={{
                            width: `${Math.min((item.quantity / (item.minStock || 20)) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {item.status !== 'ok' && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-orange-600 dark:text-orange-400">
                        <AlertCircle className="w-3 h-3" />
                        <span>Cần nhập hàng</span>
                      </div>
                    )}
                  </div>

                  {/* Total Value */}
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {(item.price * item.quantity / 1000000).toFixed(1)}M
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t p-4">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
          Nhập Hàng Mới
        </button>
      </div>
    </div>
  );
}
