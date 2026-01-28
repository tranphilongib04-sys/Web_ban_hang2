'use client';

import React, { useState } from 'react';
import { Search, ShoppingCart, Plus, Minus, X } from 'lucide-react';

interface DesktopSalesProps {
  activeTab: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Laptop Dell XPS 13',
    price: 25000000,
    category: 'Điện Tử',
    stock: 5,
    image: '💻',
  },
  {
    id: '2',
    name: 'iPhone 15 Pro',
    price: 28000000,
    category: 'Điện Tử',
    stock: 12,
    image: '📱',
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    price: 8500000,
    category: 'Điện Tử',
    stock: 8,
    image: '🎧',
  },
  {
    id: '4',
    name: 'Áo Phông Premium',
    price: 450000,
    category: 'Quần Áo',
    stock: 50,
    image: '👕',
  },
  {
    id: '5',
    name: 'Quần Jean',
    price: 650000,
    category: 'Quần Áo',
    stock: 35,
    image: '👖',
  },
  {
    id: '6',
    name: 'Giày Thể Thao',
    price: 1200000,
    category: 'Quần Áo',
    stock: 20,
    image: '👟',
  },
  {
    id: '7',
    name: 'Coffee Beans 1kg',
    price: 350000,
    category: 'Thực Phẩm',
    stock: 15,
    image: '☕',
  },
  {
    id: '8',
    name: 'Chocolate Premium',
    price: 200000,
    category: 'Thực Phẩm',
    stock: 30,
    image: '🍫',
  },
];

export default function DesktopSales({ activeTab }: DesktopSalesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  if (activeTab !== 'sales') return null;

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter((item) => item.id !== productId));
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxAmount = cartTotal * 0.1;
  const finalTotal = cartTotal + taxAmount;

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Products Section */}
      <div className="col-span-2 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-2">{product.image}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {product.category}
              </p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {(product.price / 1000000).toFixed(1)}M
                </span>
                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                  {product.stock} còn
                </span>
              </div>
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 rounded-lg transition-colors font-semibold"
              >
                + Thêm
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Shopping Cart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-fit sticky top-24">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <h3 className="font-bold text-gray-900 dark:text-white">
              Giỏ Hàng ({cart.length})
            </h3>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            <p>Giỏ hàng trống</p>
          </div>
        ) : (
          <div>
            {/* Cart Items */}
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{item.image}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 0)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {(item.price / 1000000).toFixed(1)}M
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(0, item.quantity - 1))
                      }
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="flex-1 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-right text-sm font-semibold mt-1 text-blue-600 dark:text-blue-400">
                    {((item.price * item.quantity) / 1000000).toFixed(1)}M
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Tổng:</span>
                <span className="font-semibold">
                  {(cartTotal / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Thuế (10%):</span>
                <span className="font-semibold">
                  {(taxAmount / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-700 pt-2">
                <span>Thành tiền:</span>
                <span className="text-green-600 dark:text-green-400">
                  {(finalTotal / 1000000).toFixed(1)}M
                </span>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold mt-4 transition-colors">
                Thanh Toán
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
