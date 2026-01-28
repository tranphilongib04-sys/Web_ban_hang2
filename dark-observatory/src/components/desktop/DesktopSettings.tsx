'use client';

import React, { useState } from 'react';
import { Save, LogOut, Lock, Bell, Moon, Globe } from 'lucide-react';

interface DesktopSettingsProps {
  activeTab: string;
}

export default function DesktopSettings({ activeTab }: DesktopSettingsProps) {
  const [settings, setSettings] = useState({
    storeName: 'Cửa Hàng Online',
    email: 'owner@store.com',
    phone: '+84 123 456 789',
    address: '123 Đường Chính, TP HCM',
    taxId: '1234567890',
    currency: 'VND',
    language: 'vi',
    darkMode: true,
    notifications: {
      lowStock: true,
      newOrders: true,
      dailyReport: true,
      systemAlerts: true,
    },
  });

  if (activeTab !== 'settings') return null;

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value },
    }));
  };

  const SettingSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );

  const SettingInput = ({
    label,
    value,
    onChange,
    type = 'text',
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
  }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
    </div>
  );

  const SettingToggle = ({
    label,
    checked,
    onChange,
  }: {
    label: string | React.ReactNode;
    checked: boolean;
    onChange: (v: boolean) => void;
  }) => (
    <div className="flex items-center justify-between">
      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked
            ? 'bg-blue-600 dark:bg-blue-700'
            : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl space-y-6">
      {/* Store Settings */}
      <SettingSection title="Thông Tin Cửa Hàng">
        <SettingInput
          label="Tên Cửa Hàng"
          value={settings.storeName}
          onChange={(v) => handleSettingChange('storeName', v)}
        />
        <SettingInput
          label="Email"
          value={settings.email}
          onChange={(v) => handleSettingChange('email', v)}
          type="email"
        />
        <SettingInput
          label="Số Điện Thoại"
          value={settings.phone}
          onChange={(v) => handleSettingChange('phone', v)}
        />
        <SettingInput
          label="Địa Chỉ"
          value={settings.address}
          onChange={(v) => handleSettingChange('address', v)}
        />
        <SettingInput
          label="Mã Số Thuế"
          value={settings.taxId}
          onChange={(v) => handleSettingChange('taxId', v)}
        />
      </SettingSection>

      {/* System Settings */}
      <SettingSection title="Cài Đặt Hệ Thống">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <Globe className="inline w-4 h-4 mr-2" />
            Ngôn Ngữ
          </label>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
            <option value="zh">中文</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Tiền Tệ
          </label>
          <select
            value={settings.currency}
            onChange={(e) => handleSettingChange('currency', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="VND">VND (₫)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>

        <SettingToggle
          label={
            <>
              <Moon className="inline w-4 h-4 mr-2" />
              Chế Độ Tối
            </>
          }
          checked={settings.darkMode}
          onChange={(v) => handleSettingChange('darkMode', v)}
        />
      </SettingSection>

      {/* Notifications */}
      <SettingSection title="Thông Báo">
        <SettingToggle
          label={
            <>
              <Bell className="inline w-4 h-4 mr-2" />
              Cảnh Báo Tồn Kho Thấp
            </>
          }
          checked={settings.notifications.lowStock}
          onChange={(v) => handleNotificationChange('lowStock', v)}
        />
        <SettingToggle
          label="Thông Báo Đơn Hàng Mới"
          checked={settings.notifications.newOrders}
          onChange={(v) => handleNotificationChange('newOrders', v)}
        />
        <SettingToggle
          label="Báo Cáo Hàng Ngày"
          checked={settings.notifications.dailyReport}
          onChange={(v) => handleNotificationChange('dailyReport', v)}
        />
        <SettingToggle
          label="Cảnh Báo Hệ Thống"
          checked={settings.notifications.systemAlerts}
          onChange={(v) => handleNotificationChange('systemAlerts', v)}
        />
      </SettingSection>

      {/* Security */}
      <SettingSection title="Bảo Mật">
        <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-semibold text-gray-900 dark:text-white">
            Đổi Mật Khẩu
          </span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-semibold text-gray-900 dark:text-white">
            2FA (Two-Factor Authentication)
          </span>
        </button>
      </SettingSection>

      {/* Actions */}
      <div className="flex gap-4">
        <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
          <Save className="w-5 h-5" />
          Lưu Cài Đặt
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors">
          <LogOut className="w-5 h-5" />
          Đăng Xuất
        </button>
      </div>
    </div>
  );
}
