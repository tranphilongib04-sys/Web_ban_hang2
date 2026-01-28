# API & Features Update - TPB Manage

## 🚀 Latest Additions

### 1️⃣ **CI/CD Pipeline (GitHub Actions)**

#### Files Created:
- `.github/workflows/ci.yml` - Automated CI/CD workflow

#### Features:
- **Automatic Linting** - ESLint checks on every push
- **Type Checking** - TypeScript validation
- **Build Testing** - Automatic build verification
- **Security Audit** - npm audit for vulnerabilities
- **Multi-Node Support** - Tests on Node 18 & 20
- **Artifact Storage** - Build artifacts retained for 5 days

#### How It Works:
```yaml
Push to main/develop
    ↓
Lint & Type Check
    ↓
Build Project
    ↓
Run Tests (if any)
    ↓
Security Audit
    ↓
Notification
```

#### View Workflows:
- Go to: https://github.com/tranphilongib04-sys/Web_ban_hang2/actions
- Check status of builds & tests

---

### 2️⃣ **Swagger API Documentation**

#### Files Created:
- `src/lib/swagger.ts` - API endpoint definitions
- `src/lib/swaggerConfig.ts` - Swagger configuration
- `src/app/api/docs/route.ts` - Swagger UI endpoint

#### Features:
- **Interactive API Explorer** - Test endpoints directly
- **Complete API Documentation** - All endpoints documented
- **Request/Response Examples** - Schema definitions
- **Auto-Generated** - Updates with code changes

#### Access Swagger UI:
```
http://localhost:3210/api/docs
```

#### Available Endpoints in Swagger:
```
GET  /api/products/search      - Search & filter products
GET  /api/products/inventory   - Low inventory alerts
GET  /api/reports/sales        - Sales reports
GET  /api/orders               - Orders with filters
GET  /api/customers            - Customers with search
```

---

### 3️⃣ **Advanced Database Features**

#### New Query Functions:

**Products:**
```typescript
// Search products with multiple filters
searchProducts({
  searchTerm: "laptop",
  category: "Electronics",
  minPrice: 500,
  maxPrice: 2000,
  sortBy: "price",
  sortOrder: "asc",
  limit: 10,
  page: 1
})

// Get low inventory products
getLowInventoryProducts(threshold: 10)

// Get top selling products
getTopSellingProducts(limit: 10)

// Get products by category with stats
getProductsByCategory("Electronics")
```

**Orders:**
```typescript
// Search orders with filters
searchOrders({
  customerId: 1,
  status: "completed",
  minAmount: 100,
  maxAmount: 1000,
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-12-31'),
  sortBy: "date",
  limit: 20
})

// Get customer orders
getCustomerOrders(customerId: 1)

// Get orders by date range
getOrdersByDateRange(startDate, endDate)
```

**Customers:**
```typescript
// Search customers
searchCustomers({
  searchTerm: "john",
  limit: 10
})

// Get customer with full history
getCustomerWithHistory(customerId: 1)
```

**Analytics:**
```typescript
// Get sales summary
getSalesSummary(startDate?, endDate?)

// Get inventory value
getInventoryValue()

// Get daily sales report
getDailySalesReport(days: 30)
```

---

## 📊 New API Endpoints

### Products Search
```http
GET /api/products/search?q=laptop&category=Electronics&minPrice=500&sortBy=price&page=1&limit=10
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Laptop Pro",
      "price": 1299.99,
      "quantity": 15,
      "category": "Electronics"
    }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

### Inventory Status
```http
GET /api/products/inventory?threshold=10
```

Response:
```json
{
  "products": [
    {
      "id": 5,
      "name": "USB Cable",
      "quantity": 3
    }
  ],
  "inventory": {
    "totalItems": 1250,
    "totalValue": 45000,
    "productCount": 42
  }
}
```

### Sales Report
```http
GET /api/reports/sales?type=summary&startDate=2024-01-01&endDate=2024-12-31
GET /api/reports/sales?type=daily&days=30
```

Response:
```json
{
  "report": {
    "totalOrders": 156,
    "totalRevenue": 45000,
    "averageOrderValue": 288.46,
    "maxOrder": 5000,
    "minOrder": 50
  },
  "type": "summary"
}
```

---

## 🧪 Running Tests

```bash
# Install dependencies (if needed)
npm install

# Run linter (auto-runs on push)
npm run lint

# Type checking
npx tsc --noEmit

# Build for production
npm run build
```

---

## 🔍 Using Swagger API Documentation

### 1. Start Development Server
```bash
npm run dev
```

### 2. Open Swagger UI
```
http://localhost:3210/api/docs
```

### 3. Try Out Endpoints
- Click on endpoint
- Click "Try it out"
- Fill in parameters
- Click "Execute"
- See response

### 4. Copy Request Code
- After execution, copy as cURL/JavaScript/etc.
- Use in your application

---

## 📈 Database Query Examples

### Search Products
```typescript
import { searchProducts } from '@/lib/db/advancedQueries';

const results = await searchProducts({
  searchTerm: "phone",
  minPrice: 200,
  maxPrice: 1000,
  sortBy: "price",
  sortOrder: "asc",
  limit: 20,
  offset: 0
});

console.log(results.data);      // Array of products
console.log(results.pagination); // Pagination info
```

### Get Sales Summary
```typescript
import { getSalesSummary, getDailySalesReport } from '@/lib/db/advancedQueries';

// Overall summary
const summary = await getSalesSummary();

// Daily breakdown for last 30 days
const daily = await getDailySalesReport(30);

daily.forEach(day => {
  console.log(`${day.date}: $${day.totalSales}`);
});
```

### Get Customer With History
```typescript
import { getCustomerWithHistory } from '@/lib/db/advancedQueries';

const customer = await getCustomerWithHistory(1);

console.log(customer.customer);   // Customer info
console.log(customer.orders);     // All orders
console.log(customer.totalSpent); // Total spending
```

---

## 🚀 CI/CD Workflow Details

### Triggers:
- ✅ Push to `main` branch
- ✅ Push to `develop` branch
- ✅ Pull requests to `main`/`develop`

### Jobs:

**1. Lint (eslint + TypeScript)**
- Runs on Node 18 & 20
- Fails if: Invalid code style
- Can still continue (non-blocking)

**2. Build**
- Runs after lint passes
- Builds Next.js project
- Saves artifacts for 5 days

**3. Test**
- Runs after lint passes
- Runs test suite (if exists)
- Non-blocking

**4. Security**
- Audits npm packages
- Warns about vulnerabilities
- Non-blocking

**5. Notification**
- Final status check
- Fails if lint or build failed
- Shows overall pipeline status

---

## 📋 Configuration Files

### CI/CD Config
- **Location**: `.github/workflows/ci.yml`
- **Customize**: Edit workflow file
- **Disable**: Remove file or archive

### Swagger Config
- **Location**: `src/lib/swaggerConfig.ts`
- **Customize**: Edit servers, title, version
- **Add Endpoints**: Document in `src/lib/swagger.ts`

---

## 🎯 Next Steps

1. **Test CI/CD**:
   ```bash
   git push origin main
   # Go to GitHub Actions to see workflow
   ```

2. **Try Swagger UI**:
   ```bash
   npm run dev
   # Open http://localhost:3210/api/docs
   ```

3. **Use Advanced Queries**:
   ```typescript
   import { searchProducts, getSalesSummary } from '@/lib/db/advancedQueries';
   ```

4. **Create More Endpoints**:
   - Use advanced queries
   - Add to `src/app/api/`
   - Document in Swagger

---

## 🔗 References

- [Swagger/OpenAPI Spec](https://swagger.io/specification/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

## 📞 Support

- 🐛 **Bugs**: Create GitHub issue
- 💡 **Features**: GitHub Discussions
- 📖 **Docs**: Check README & DEVELOPMENT.md

**Happy coding! 🎉**
