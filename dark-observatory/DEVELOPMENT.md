# Hướng Dẫn Phát Triển - TPB Manage

## 🎯 Quy Trình Phát Triển

### 1. Setup Ban Đầu

```bash
# Clone repo
git clone https://github.com/tranphilongib04-sys/Web_ban_hang2.git
cd dark-observatory

# Cài dependencies
npm install

# Setup database
npm run index
```

### 2. Phát Triển Web

```bash
# Terminal 1: Start Next.js dev server
npm run dev

# Open browser: http://localhost:3210
```

### 3. Phát Triển Desktop (Electron)

```bash
# Chạy cả web + Electron
npm run electron:dev

# Hoặc chạy Electron khi web đã chạy
npm run electron
```

## 📝 Hướng Dẫn Coding

### 1. Component Structure

```typescript
// src/components/MyComponent.tsx
'use client'; // Mark as client component if needed

import React from 'react';
import { cn } from '@/lib/utils'; // Tailwind merge utility

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <button
        onClick={onAction}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Action
      </button>
    </div>
  );
}
```

### 2. Database Schema

```typescript
// src/lib/db/schema.ts
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const products = sqliteTable('products', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  price: real('price').notNull(),
  quantity: integer('quantity').default(0),
});

export const productsRelations = relations(products, ({ many }) => ({
  // Define relationships
}));
```

### 3. Database Queries

```typescript
// src/lib/db/queries.ts
import { db } from './client';
import { products } from './schema';
import { eq } from 'drizzle-orm';

export async function getProduct(id: number) {
  const result = await db
    .select()
    .from(products)
    .where(eq(products.id, id));
  
  return result[0];
}

export async function createProduct(data: typeof products.$inferInsert) {
  return await db.insert(products).values(data).returning();
}
```

### 4. API Routes / Server Actions

```typescript
// src/app/api/products/route.ts
import { getProduct, createProduct } from '@/lib/db/queries';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  
  if (!id) return Response.json({ error: 'ID required' }, { status: 400 });
  
  const product = await getProduct(Number(id));
  return Response.json(product);
}

export async function POST(req: Request) {
  const data = await req.json();
  const product = await createProduct(data);
  return Response.json(product, { status: 201 });
}
```

### 5. React Server Actions

```typescript
// src/app/actions/products.ts
'use server';

import { createProduct } from '@/lib/db/queries';
import { revalidatePath } from 'next/cache';

export async function createProductAction(formData: FormData) {
  const name = formData.get('name') as string;
  const price = parseFloat(formData.get('price') as string);
  
  await createProduct({ name, price, quantity: 0 });
  revalidatePath('/products');
}
```

## 🗄️ Database Management

### Tạo Migration

```bash
# 1. Sửa schema trong src/lib/db/schema.ts
# 2. Generate migration
npm run drizzle:generate

# 3. Kiểm tra file migration trong /drizzle
# 4. Apply migration
npm run index
```

### Các Lệnh Database

```bash
# Generate migrations
npx drizzle-kit generate

# Apply migrations
npx drizzle-kit migrate

# Validate schema
npx drizzle-kit introspect

# Push to Turso (nếu sử dụng cloud)
npx drizzle-kit push

# Studio - Visual editor (dev only)
npx drizzle-kit studio
```

## 🧹 Code Quality

### Linting

```bash
# Run ESLint
npm run lint

# Fix automatically
npx eslint --fix src/
```

### TypeScript

```bash
# Type check
npx tsc --noEmit
```

### Format Code

```bash
# Với Prettier (nếu có)
npx prettier --write .
```

## 🧪 Testing (Nếu có)

```bash
# Run tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

## 📦 Building

### Build Web

```bash
npm run build
npm start
```

### Build Desktop

```bash
# Development build (for testing)
npm run electron:pack

# Production build (for distribution)
npm run electron:build
```

## 🔧 Debugging

### Browser DevTools

```bash
# Tự động mở DevTools
npm run dev
# Press: F12 trong browser hoặc Electron window
```

### Electron DevTools

```typescript
// In electron/main.ts
mainWindow.webContents.openDevTools();
```

### Debug Database

```bash
# Visual DB editor
npx drizzle-kit studio

# Open: http://localhost:3000 (typically)
```

## 🚀 Performance Optimization

### 1. Images
- Use Next.js Image component (disabled for Electron)
- Use WebP format

### 2. Code Splitting
- Automatic by Next.js
- Use dynamic imports for large components

### 3. Database Indexing

```bash
# Auto trigger
npm run index:auto
```

### 4. Tailwind CSS
- Only used classes are included in build
- Purge unused CSS automatically

## 📋 Git Workflow

```bash
# 1. Create feature branch
git checkout -b feature/feature-name

# 2. Make changes
git add .
git commit -m "feat: add new feature"

# 3. Push to remote
git push origin feature/feature-name

# 4. Create Pull Request on GitHub
# 5. Merge after review
```

## 📚 Useful Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Drizzle ORM](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [Electron Docs](https://www.electronjs.org/docs)

## ⚠️ Common Issues & Solutions

### Issue: Port 3210 already in use

```bash
# Find process using port
lsof -i :3210

# Kill process
kill -9 <PID>
```

### Issue: Database locked

```bash
# Check if db is in use
# Restart dev server
npm run dev

# Or reset database
rm sqlite.db && npm run index
```

### Issue: Node modules issues

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 🔒 Environment Variables

Required in `.env.local`:

```env
# Database
TURSO_DATABASE_URL=file:./data/tpb-manage.db
TURSO_AUTH_TOKEN=

# Optional
NEXT_PUBLIC_API_URL=http://localhost:3210
```

## 📞 Getting Help

- Check existing issues on GitHub
- Create new issue with clear description
- Include: Node version, OS, error message, steps to reproduce
