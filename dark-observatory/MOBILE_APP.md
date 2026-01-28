# Mobile App Documentation - TPB Manage

## 📱 Overview

TPB Manage now includes a fully optimized mobile app for store management on the go. The mobile interface includes:

- **Today Dashboard** - Real-time sales metrics and performance
- **Sales Module** - Quick product search and checkout
- **Inventory Management** - Stock level monitoring with alerts
- **Settings** - Account and system preferences

## 🎯 Access Mobile App

### URLs:
```
Development: http://localhost:3210/mobile
Production: https://your-domain.com/mobile
```

### Mobile Viewport:
- Automatically displays on screens < 768px (md breakpoint)
- Responsive design for all screen sizes
- Bottom navigation for easy one-handed use

## 📊 Today Dashboard

### Features:
- **Total Sales** - Daily revenue with trend comparison
- **Quick Stats** - Orders, new customers, average order value
- **Top Product** - Best selling item today
- **Hourly Chart** - Sales distribution by hour
- **Recent Orders** - Latest transactions with status

### Data Shown:
```
Total Sales:        Current day revenue
Orders Count:       Number of transactions
New Customers:      First-time buyers today
Avg Order Value:    Average transaction amount
Top Product:        Highest selling item
Trend:              % change from yesterday
```

### Status Indicators:
- 🟢 Completed - Order processed successfully
- 🟡 Pending - Waiting for processing
- 🔴 Cancelled - Order cancelled

## 🛒 Sales Module

### Quick Features:
1. **Product Search**
   - Real-time search by product name
   - Quick add to cart

2. **Shopping Cart**
   - Add/remove items
   - Adjust quantities
   - View total with tax calculation

3. **Checkout**
   - Calculate subtotal, tax, total
   - Confirm payment
   - Order confirmation

### Cart Interface:
```
Product Name
Price x Quantity
[- Qty +]
Subtotal: XXX,XXX đ
```

### Checkout Summary:
- Subtotal
- Tax (10%)
- **Total Amount**
- [Clear Cart] [Checkout]

## 📦 Inventory Management

### Stock Levels:
- 🟢 **OK** - Sufficient stock
- 🟡 **Low** - Below 50% of minimum
- 🔴 **Critical** - Below 20% or empty

### Features:
1. **Search & Filter**
   - Search by product name
   - Filter by status (All, Low, Critical)

2. **Visual Indicators**
   - Status badge with color coding
   - Stock level progress bar
   - Total inventory value

3. **Statistics**
   - Total items tracked
   - Low stock count
   - Critical stock count
   - Total inventory value

### Stock Status Bar:
```
Quantity: [████░░░░] 25 items
Status: Low Stock (Sắp Hết)
Min Required: 50 units
```

### Alert System:
```
🚨 Cần nhập hàng
Product: USB Cable
Current: 3 | Min: 20 | Deficit: 17
```

## 🔔 Features by Tab

### 1. **Today** (Hôm Nay)
- Dashboard with daily metrics
- Sales trend analysis
- Recent order list
- Hourly sales chart

**Key Metrics:**
- Total daily revenue
- Order count
- New customer count
- Average order value
- Trend percentage

### 2. **Sales** (Bán Hàng)
- Product grid view
- Quick search
- Shopping cart management
- Fast checkout

**Workflow:**
1. Search/browse products
2. Add items to cart
3. Review cart
4. Adjust quantities
5. Proceed to checkout

### 3. **Inventory** (Tồn Kho)
- Stock level monitoring
- Low inventory alerts
- Search functionality
- Status filtering

**Alert Types:**
- Low stock warnings
- Critical stock alerts
- Import reminders

### 4. **Settings** (Cài Đặt)
- Account information
- Store details
- System preferences
- Help & support

## 💻 Technical Implementation

### Components:
```
src/components/mobile/
├── MobileAppLayout.tsx          # Main navigation & layout
├── MobileTodayComponent.tsx     # Today dashboard
├── MobileSalesComponent.tsx     # Sales interface
├── MobileInventoryComponent.tsx # Inventory view
└── [Settings integrated in layout]
```

### Pages:
```
src/app/
└── mobile/
    └── page.tsx # Mobile app entry point
```

### Responsive Breakpoints:
```
Mobile:  < 640px (sm)
Tablet:  640px - 1024px (md)
Desktop: > 1024px (lg)
```

## 🎨 Design Features

### Mobile-First Design:
- Touch-friendly buttons (44px minimum)
- Large tap targets
- Bottom navigation for thumb reach
- Optimized spacing for small screens

### Dark Mode Support:
- Automatic dark mode detection
- High contrast for readability
- Smooth transitions

### Loading States:
- Spinner animations
- Disabled states
- Loading indicators

## 📊 Integration Points

### API Endpoints Used:
```
GET  /api/products/search
     - Search products with filters
     - Params: q, category, minPrice, maxPrice

GET  /api/products/inventory
     - Get inventory stats and low stock items
     
GET  /api/reports/sales
     - Daily sales summary
     - Type: summary or daily
```

### Data Flow:
```
Mobile UI
    ↓
API Routes
    ↓
Advanced Query Functions
    ↓
Database
```

## 🚀 Usage Examples

### Search Products (Sales Tab):
```
User Input: "laptop"
    ↓
GET /api/products/search?q=laptop&limit=10
    ↓
Display results in grid
    ↓
User adds to cart
```

### View Inventory:
```
Open Inventory Tab
    ↓
GET /api/products/inventory?threshold=10
    ↓
Display items with status
    ↓
Highlight low/critical items
```

### Check Today Sales:
```
Open Today Tab
    ↓
GET /api/reports/sales?type=summary
    ↓
Display metrics and chart
    ↓
GET /api/reports/sales?type=daily&days=30
    ↓
Show hourly breakdown
```

## ⚙️ Configuration

### Mobile Settings:
```typescript
// src/components/mobile/MobileAppLayout.tsx

const MOBILE_CONFIG = {
  pageSize: 10,           // Items per search
  refreshInterval: 5000,  // Auto-refresh (ms)
  taxRate: 0.10,         // Tax percentage
  minStockThreshold: 10, // Low stock alert
};
```

### Responsive Breakpoints:
```tailwind
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

## 🔧 Customization Guide

### Change Tax Rate:
```typescript
// In MobileSalesComponent.tsx
const tax = subtotal * 0.10; // Change 0.10 to your rate
```

### Modify Stock Threshold:
```typescript
// In MobileInventoryComponent.tsx
const getLowInventoryProducts = async (threshold: number = 10)
// Change 10 to your threshold
```

### Add New Tab:
```typescript
1. Create component: MobileNewTabComponent.tsx
2. Import in MobileAppLayout.tsx
3. Add to TabType: 'newtab'
4. Add NavButton with icon
5. Add case in renderContent()
```

## 📱 Testing on Mobile

### Development:
```bash
npm run dev
# Open http://localhost:3210/mobile on your phone
# Or use browser DevTools mobile mode (F12)
```

### Production:
```bash
npm run build
npm start
# Access /mobile route
```

## 🎯 Performance Tips

### Optimize Load Time:
- Use pagination (limit: 10)
- Lazy load images
- Cache API responses
- Use compression

### Optimize UI:
- Minimize re-renders
- Use useCallback hooks
- Lazy load tabs
- Virtual scrolling for lists

## 🐛 Troubleshooting

### Mobile View Not Showing:
- Check viewport width < 768px
- Clear browser cache
- Check DevTools device emulation

### Slow Performance:
- Check API response time
- Monitor network tab
- Check for large images
- Profile React components

### API Errors:
- Verify API endpoints running
- Check network connectivity
- Review error logs
- Check CORS settings

## 📞 Support

For mobile app issues:
1. Check browser console (F12)
2. Review network tab
3. Check API endpoints
4. Open GitHub issue with:
   - Device/browser info
   - Screenshots
   - Steps to reproduce
   - Error logs

## 🔄 Future Improvements

Planned features:
- [ ] Offline mode with sync
- [ ] Advanced product filters
- [ ] Order history
- [ ] Customer profiles
- [ ] Payment integration
- [ ] Push notifications
- [ ] Barcode scanning
- [ ] Multi-user login

---

**Mobile App Version:** 1.0.0  
**Last Updated:** January 28, 2026  
**Status:** Production Ready ✅
