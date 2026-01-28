'use client';

import { useState, useCallback } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Search } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

/**
 * Mobile optimized sales component
 * Features: Quick product search, cart management, fast checkout
 */
export function MobileSalesComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showCart, setShowCart] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  // Add item to cart
  const addToCart = useCallback((id: number, name: string, price: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          id,
          name,
          price,
          quantity: 1,
          subtotal: price,
        },
      ];
    });
  }, []);

  // Update quantity
  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
              subtotal: quantity * item.price,
            }
          : item
      )
    );
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Checkout
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng trống');
      return;
    }

    try {
      // TODO: Integrate with API
      alert(`Đơn hàng: ${cartItems.length} sản phẩm\nTổng: ${total.toLocaleString('vi-VN')}đ`);
      clearCart();
      setShowCart(false);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Lỗi xử lý đơn hàng');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b">
        <div className="p-4 space-y-3">
          <h1 className="text-2xl font-bold">Bán Hàng</h1>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearching(true)}
                className="pl-10 rounded-lg w-full p-2 border border-gray-300 dark:border-gray-600"
              />
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {showCart ? (
          // Cart View
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Giỏ Hàng ({cartItems.length})</h2>

            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Giỏ hàng trống</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 dark:bg-slate-800 p-3 rounded-lg space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.price.toLocaleString('vi-VN')}đ x {item.quantity}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-700 rounded p-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-xs px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="flex-1 text-center font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-xs px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right font-semibold text-blue-500">
                      {item.subtotal.toLocaleString('vi-VN')}đ
                    </div>
                  </div>
                ))}

                {/* Summary */}
                <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg space-y-2 mt-4">
                  <div className="flex justify-between text-sm">
                    <span>Tạm tính:</span>
                    <span>{subtotal.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Thuế (10%):</span>
                    <span>{tax.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Tổng:</span>
                    <span className="text-blue-500">{total.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={clearCart}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Xóa Giỏ
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-2"
                  >
                    Thanh Toán
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Products Grid View
          <div className="p-4 grid grid-cols-2 gap-3">
            {/* Sample Products - Replace with API call */}
            {[
              { id: 1, name: 'Laptop', price: 15000000 },
              { id: 2, name: 'Mouse', price: 500000 },
              { id: 3, name: 'Keyboard', price: 2000000 },
              { id: 4, name: 'Monitor', price: 5000000 },
              { id: 5, name: 'Headphones', price: 3000000 },
              { id: 6, name: 'Webcam', price: 1500000 },
            ].map((product) => (
              <div
                key={product.id}
                className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3 space-y-2"
              >
                <div className="bg-gray-200 dark:bg-slate-700 h-24 rounded flex items-center justify-center">
                  <span className="text-sm text-gray-500">Ảnh</span>
                </div>
                <div>
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-blue-500 font-bold text-sm">
                    {product.price.toLocaleString('vi-VN')}đ
                  </p>
                </div>
                <button
                  onClick={() => addToCart(product.id, product.name, product.price)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Thêm
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
