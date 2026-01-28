'use client';

import { useState } from 'react';
import { Home, ShoppingCart, Package, Settings } from 'lucide-react';
import { MobileSalesComponent } from './MobileSalesComponent';
import { MobileInventoryComponent } from './MobileInventoryComponent';
import { MobileTodayComponent } from './MobileTodayComponent';

type TabType = 'today' | 'sales' | 'inventory' | 'settings';

/**
 * Main mobile app layout with bottom navigation
 * Includes: Today dashboard, Sales, Inventory, Settings
 */
export function MobileAppLayout() {
  const [activeTab, setActiveTab] = useState<TabType>('today');

  const renderContent = () => {
    switch (activeTab) {
      case 'today':
        return <MobileTodayComponent />;
      case 'sales':
        return <MobileSalesComponent />;
      case 'inventory':
        return <MobileInventoryComponent />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <MobileTodayComponent />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-950">
      {/* Content */}
      <div className="flex-1">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 px-4 py-2 flex justify-around items-center gap-2">
        <NavButton
          icon={<Home className="w-6 h-6" />}
          label="Hôm Nay"
          isActive={activeTab === 'today'}
          onClick={() => setActiveTab('today')}
        />
        <NavButton
          icon={<ShoppingCart className="w-6 h-6" />}
          label="Bán Hàng"
          isActive={activeTab === 'sales'}
          onClick={() => setActiveTab('sales')}
        />
        <NavButton
          icon={<Package className="w-6 h-6" />}
          label="Tồn Kho"
          isActive={activeTab === 'inventory'}
          onClick={() => setActiveTab('inventory')}
        />
        <NavButton
          icon={<Settings className="w-6 h-6" />}
          label="Cài Đặt"
          isActive={activeTab === 'settings'}
          onClick={() => setActiveTab('settings')}
        />
      </nav>
    </div>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function NavButton({ icon, label, isActive, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 py-3 px-2 rounded-lg transition-colors ${
        isActive
          ? 'text-blue-500'
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
      }`}
    >
      <div className={isActive ? 'text-blue-500' : 'text-current'}>
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

function SettingsTab() {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-950">
      <div className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b p-4">
        <h1 className="text-2xl font-bold">Cài Đặt</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Settings Sections */}
        <SettingSection title="Tài Khoản">
          <SettingItem label="Tên" value="TPB Manager" />
          <SettingItem label="Email" value="manager@tpb.com" />
          <SettingItem label="Điện thoại" value="0123456789" />
        </SettingSection>

        <SettingSection title="Cửa Hàng">
          <SettingItem label="Tên Cửa Hàng" value="TPB Manage" />
          <SettingItem label="Địa chỉ" value="123 Đường ABC, TP HCM" />
          <SettingItem label="Mã cửa hàng" value="SHOP001" />
        </SettingSection>

        <SettingSection title="Hệ Thống">
          <SettingItem label="Phiên bản" value="1.0.0" />
          <SettingItem label="Chế độ tối" value="Bật" />
          <SettingItem label="Ngôn ngữ" value="Tiếng Việt" />
        </SettingSection>

        <SettingSection title="Khác">
          <SettingButton label="Đăng Xuất" variant="danger" />
          <SettingButton label="Liên Hệ Hỗ Trợ" variant="default" />
          <SettingButton label="Về Ứng Dụng" variant="default" />
        </SettingSection>
      </div>
    </div>
  );
}

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

function SettingSection({ title, children }: SettingSectionProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 px-2">
        {title}
      </h2>
      <div className="bg-gray-50 dark:bg-slate-800 rounded-lg divide-y dark:divide-slate-700 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

interface SettingItemProps {
  label: string;
  value: string;
}

function SettingItem({ label, value }: SettingItemProps) {
  return (
    <div className="p-4 flex justify-between items-center">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm text-gray-500 dark:text-gray-400">{value}</span>
    </div>
  );
}

interface SettingButtonProps {
  label: string;
  variant?: 'default' | 'danger';
}

function SettingButton({ label, variant = 'default' }: SettingButtonProps) {
  return (
    <button
      className={`w-full p-4 text-left font-medium text-sm transition-colors ${
        variant === 'danger'
          ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-950'
          : 'text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950'
      }`}
    >
      {label}
    </button>
  );
}
