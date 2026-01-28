'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react';

interface DesktopDashboardProps {
  activeTab: string;
}

const salesData = [
  { month: 'Tháng 1', sales: 4000, orders: 240, customers: 120 },
  { month: 'Tháng 2', sales: 3000, orders: 221, customers: 100 },
  { month: 'Tháng 3', sales: 2000, orders: 229, customers: 85 },
  { month: 'Tháng 4', sales: 2780, orders: 200, customers: 110 },
  { month: 'Tháng 5', sales: 1890, orders: 218, customers: 95 },
  { month: 'Tháng 6', sales: 2390, orders: 250, customers: 125 },
];

const categoryData = [
  { name: 'Điện Tử', value: 35 },
  { name: 'Quần Áo', value: 25 },
  { name: 'Thực Phẩm', value: 20 },
  { name: 'Sách', value: 20 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

const StatCard = ({ icon: Icon, label, value, trend }: { icon: any; label: string; value: string; trend: string }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
        <p className="text-sm text-green-600 dark:text-green-400 mt-1">↑ {trend}</p>
      </div>
      <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
        <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      </div>
    </div>
  </div>
);

export default function DesktopDashboard({ activeTab }: DesktopDashboardProps) {
  if (activeTab !== 'dashboard') return null;

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          label="Doanh Số Hôm Nay"
          value="45.0M"
          trend="15%"
        />
        <StatCard icon={ShoppingCart} label="Đơn Hàng Hôm Nay" value="12" trend="8%" />
        <StatCard icon={Users} label="Khách Hàng Mới" value="8" trend="12%" />
        <StatCard icon={TrendingUp} label="Trị Giá TB" value="3.75M" trend="5%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-6">
        {/* Sales Trend */}
        <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Xu Hướng Bán Hàng
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                name="Doanh Số"
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#8b5cf6"
                name="Đơn Hàng"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Danh Mục Phổ Biến
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders by Month */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Đơn Hàng Theo Tháng
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#3b82f6" name="Đơn Hàng" />
            <Bar dataKey="customers" fill="#8b5cf6" name="Khách Hàng" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Đơn Hàng Gần Đây
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Mã ĐH
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Khách Hàng
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Sản Phẩm
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Giá Trị
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Trạng Thái
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '#ORD001', customer: 'Nguyễn A', products: 3, value: '2.5M', status: 'Giao hàng' },
                { id: '#ORD002', customer: 'Trần B', products: 1, value: '1.2M', status: 'Đang xử lý' },
                { id: '#ORD003', customer: 'Lê C', products: 5, value: '5.8M', status: 'Giao hàng' },
                { id: '#ORD004', customer: 'Hoàng D', products: 2, value: '1.8M', status: 'Chờ thanh toán' },
                { id: '#ORD005', customer: 'Phạm E', products: 4, value: '3.5M', status: 'Giao hàng' },
              ].map((order) => (
                <tr key={order.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                    {order.id}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">
                    {order.customer}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">
                    {order.products} sản phẩm
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                    {order.value}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Giao hàng'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : order.status === 'Đang xử lý'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}
                    >
                      {order.status}
                    </span>
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
