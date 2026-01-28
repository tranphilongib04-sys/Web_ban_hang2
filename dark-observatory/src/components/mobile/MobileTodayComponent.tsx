'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users } from 'lucide-react';

interface TodayStats {
  totalSales: number;
  ordersCount: number;
  newCustomers: number;
  avgOrderValue: number;
  topProduct: string;
  trend: number; // percentage change from yesterday
}

interface TodayOrder {
  id: number;
  time: string;
  customer: string;
  amount: number;
  items: number;
  status: 'pending' | 'completed' | 'cancelled';
}

/**
 * Mobile Today dashboard
 * Shows today's sales performance and recent transactions
 */
export function MobileTodayComponent() {
  const [stats, setStats] = useState<TodayStats>({
    totalSales: 45000000,
    ordersCount: 12,
    newCustomers: 3,
    avgOrderValue: 3750000,
    topProduct: 'Laptop Pro 16',
    trend: 15,
  });

  const [orders, setOrders] = useState<TodayOrder[]>([
    { id: 1, time: '09:45', customer: 'Nguyễn Văn A', amount: 5000000, items: 2, status: 'completed' },
    { id: 2, time: '11:20', customer: 'Trần Thị B', amount: 3000000, items: 1, status: 'completed' },
    { id: 3, time: '14:15', customer: 'Lê Văn C', amount: 2500000, items: 1, status: 'pending' },
    { id: 4, time: '15:30', customer: 'Phạm Thị D', amount: 8000000, items: 3, status: 'completed' },
    { id: 5, time: '16:45', customer: 'Vũ Văn E', amount: 4500000, items: 2, status: 'completed' },
    { id: 6, time: '17:20', customer: 'Đỗ Thị F', amount: 3000000, items: 1, status: 'pending' },
  ]);

  const [hourlyData, setHourlyData] = useState([
    { hour: '08:00', sales: 0 },
    { hour: '09:00', sales: 5000000 },
    { hour: '10:00', sales: 3000000 },
    { hour: '11:00', sales: 8000000 },
    { hour: '12:00', sales: 12000000 },
    { hour: '13:00', sales: 0 },
    { hour: '14:00', sales: 2500000 },
    { hour: '15:00', sales: 8000000 },
    { hour: '16:00', sales: 4500000 },
    { hour: '17:00', sales: 3000000 },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default:
        return '';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'pending':
        return 'Chờ xử lý';
      case 'cancelled':
        return 'Hủy';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold mb-1">Hôm Nay</h1>
        <p className="text-blue-100 text-sm">{new Date().toLocaleDateString('vi-VN')}</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Main Stats */}
        <div className="p-4 space-y-3">
          {/* Total Sales */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-4 rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-green-600 dark:text-green-300">Tổng Bán Hàng</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-100">
                  {(stats.totalSales / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-green-600 dark:text-green-300 mt-1">
                  Trung bình: {(stats.avgOrderValue / 1000000).toFixed(1)}M/đơn
                </p>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  stats.trend >= 0
                    ? 'bg-green-200 dark:bg-green-700'
                    : 'bg-red-200 dark:bg-red-700'
                }`}
              >
                {stats.trend >= 0 ? (
                  <TrendingUp className="w-6 h-6 text-green-700 dark:text-green-100" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-700 dark:text-red-100" />
                )}
              </div>
            </div>
            <p className={`text-xs mt-2 font-semibold ${stats.trend >= 0 ? 'text-green-600' : 'text-red-600'} dark:text-white`}>
              {stats.trend >= 0 ? '↑' : '↓'} {Math.abs(stats.trend)}% so với hôm qua
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            {/* Orders */}
            <div className="bg-blue-50 dark:bg-slate-800 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-blue-200 dark:bg-blue-900 rounded">
                  <ShoppingBag className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
              <p className="text-2xl font-bold">{stats.ordersCount}</p>
              <p className="text-xs text-gray-500">Đơn hàng</p>
            </div>

            {/* Customers */}
            <div className="bg-purple-50 dark:bg-slate-800 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-purple-200 dark:bg-purple-900 rounded">
                  <Users className="w-4 h-4 text-purple-600 dark:text-purple-300" />
                </div>
              </div>
              <p className="text-2xl font-bold">{stats.newCustomers}</p>
              <p className="text-xs text-gray-500">Khách hàng mới</p>
            </div>

            {/* Avg Order */}
            <div className="bg-orange-50 dark:bg-slate-800 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-orange-200 dark:bg-orange-900 rounded">
                  <DollarSign className="w-4 h-4 text-orange-600 dark:text-orange-300" />
                </div>
              </div>
              <p className="text-lg font-bold text-orange-600">
                {(stats.avgOrderValue / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-gray-500">Trung bình</p>
            </div>
          </div>

          {/* Top Product */}
          <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Sản Phẩm Bán Chạy</p>
            <p className="text-lg font-semibold">{stats.topProduct}</p>
          </div>
        </div>

        {/* Hourly Chart */}
        <div className="p-4 border-t">
          <h2 className="text-sm font-semibold mb-3">Doanh Số Theo Giờ</h2>
          <div className="flex items-end gap-1 h-24 bg-gray-50 dark:bg-slate-800 p-3 rounded-lg">
            {hourlyData.map((data, idx) => (
              <div
                key={idx}
                className="flex-1 bg-blue-500 rounded-t"
                style={{
                  height: `${(data.sales / 12000000) * 100}%`,
                  minHeight: '2px',
                }}
                title={`${data.hour}: ${(data.sales / 1000000).toFixed(1)}M`}
              />
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="p-4 border-t">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold">Đơn Hàng Hôm Nay</h2>
            <button className="text-xs px-2 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
              Xem Tất Cả
            </button>
          </div>

          <div className="space-y-2">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-50 dark:bg-slate-800 p-3 rounded-lg flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm">{order.customer}</p>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {order.time} • {order.items} sản phẩm
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-500">
                    {(order.amount / 1000000).toFixed(1)}M
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t p-4">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
          Xem Báo Cáo Chi Tiết
        </button>
      </div>
    </div>
  );
}
