# PROJECT SUMMARY - TPB Manage

## 📌 Tổng Quan Dự Án

**Tên**: TPB Manage (Web Ban Hàng 2)
**Mô Tả**: Ứng dụng quản lý cửa hàng bán lẻ toàn diện
**Loại**: Desktop Application (Electron) + Web Application (Next.js)
**Năm Bắt Đầu**: 2024

## 🎯 Mục Đích

Cung cấp giải pháp quản lý bán hàng hiệu quả cho các cửa hàng nhỏ/vừa với:
- Giao diện thân thiện
- Dữ liệu lưu trữ local/cloud
- Xuất/Nhập báo cáo Excel
- Dark/Light mode

## 🏗️ Kiến Trúc Chính

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI

### Backend
- **API**: Next.js API Routes / Server Actions
- **Database**: SQLite (local) + Turso (optional)
- **ORM**: Drizzle Kit

### Desktop
- **Runtime**: Electron 33
- **Builder**: electron-builder

### Tools
- **Language**: TypeScript 5
- **Linter**: ESLint 9
- **Package Manager**: npm

## 📂 Cấu Trúc Thư Mục

```
dark-observatory/                    # Main project folder
├── src/                             # Source code
│   ├── app/                         # Next.js pages & API routes
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Home page
│   │   ├── (protected)/             # Protected routes
│   │   └── api/                     # API endpoints
│   ├── components/                  # Reusable React components
│   │   ├── ui/                      # Radix UI wrappers
│   │   ├── forms/                   # Form components
│   │   └── ...                      # Feature components
│   ├── lib/                         # Utilities & helpers
│   │   ├── db/                      # Database layer
│   │   │   ├── schema.ts            # Database tables
│   │   │   ├── client.ts            # DB connection
│   │   │   └── queries.ts           # Query functions
│   │   └── utils.ts                 # Helper functions
│   └── styles/                      # Global styles
├── electron/                        # Electron main process
│   └── main.ts                      # Window & IPC setup
├── drizzle/                         # Database migrations
│   ├── 0001_*.sql                   # Migration files
│   └── meta/                        # Drizzle metadata
├── public/                          # Static assets
│   └── icons/                       # App icons
├── data/                            # SQLite database
│   └── tpb-manage.db                # Local database
├── Documentation
│   ├── README.md                    # Main documentation
│   ├── ARCHITECTURE.md              # Architecture details
│   ├── DEVELOPMENT.md               # Development guide
│   ├── CONTRIBUTING.md              # Contribution guide
│   ├── TROUBLESHOOTING.md           # Troubleshooting
│   ├── QUICK_REFERENCE.md           # Quick commands
│   └── PROJECT_SUMMARY.md           # This file
├── Configuration
│   ├── package.json                 # Dependencies & scripts
│   ├── tsconfig.json                # TypeScript config
│   ├── next.config.mjs              # Next.js config
│   ├── drizzle.config.ts            # ORM config
│   ├── tailwind.config.js           # CSS config
│   ├── postcss.config.mjs           # PostCSS config
│   ├── eslint.config.mjs            # Linter config
│   ├── .gitignore                   # Git ignore rules
│   ├── .env                         # Environment template
│   ├── .env.local                   # Local environment (ignored)
│   └── components.json              # Shadcn/ui config
└── Scripts
    ├── trigger-indexing.sh          # Database indexing script
    └── build-and-create-shortcut.sh # Desktop build script
```

## 🔄 Data Flow

```
User (Desktop/Browser)
    ↓
Electron Window / Browser
    ↓
React Components (UI)
    ↓
Event Handlers / Form Submissions
    ↓
API Routes / Server Actions
    ↓
Drizzle ORM Query Builder
    ↓
SQLite Database
    ↓
Response Data
    ↓
Component State Update
    ↓
Rendered UI
```

## 📦 Core Features

### 1. Product Management
- CRUD operations for products
- Product categories
- Pricing & inventory

### 2. Order Management
- Create/view orders
- Order status tracking
- Order history

### 3. Customer Management
- Customer database
- Contact information
- Purchase history

### 4. Reporting
- Sales reports
- Charts & analytics
- Export to Excel

### 5. User Interface
- Dark/Light mode
- Responsive design
- Desktop integration

## 🔐 Security Considerations

- **Environment Variables**: Sensitive data in `.env.local`
- **Type Safety**: TypeScript prevents injection attacks
- **SQL Injection**: Drizzle ORM uses parameterized queries
- **CORS**: API routes auto-protected
- **IPC Security**: Electron preload scripts validation

## 📊 Database Schema

### Tables (Example)

```typescript
// Products
products {
  id: number (primary key)
  name: string
  price: float
  quantity: integer
  category: string
  description: text
}

// Orders
orders {
  id: number
  customerId: number (foreign key)
  orderDate: date
  totalAmount: float
  status: enum
}

// Customers
customers {
  id: number
  name: string
  email: string
  phone: string
  address: text
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Git

### Installation
```bash
git clone https://github.com/tranphilongib04-sys/Web_ban_hang2.git
cd dark-observatory
npm install
npm run index
```

### Development
```bash
# Web development
npm run dev

# Desktop development
npm run electron:dev

# Production build
npm run build
npm run electron:build
```

## 📝 Key Files to Know

| File | Purpose |
|------|---------|
| `src/lib/db/schema.ts` | Database table definitions |
| `src/lib/db/queries.ts` | Database query functions |
| `src/app/layout.tsx` | Root layout & providers |
| `src/app/page.tsx` | Home page |
| `electron/main.ts` | Electron window setup |
| `drizzle.config.ts` | ORM configuration |
| `next.config.mjs` | Next.js configuration |

## 🔗 Dependencies (Major)

### Runtime
- `next`: 16.1.4 - React framework
- `react`: 19.2.3 - UI library
- `drizzle-orm`: 0.45.1 - Database ORM
- `@radix-ui/*`: UI components
- `tailwindcss`: 4 - CSS framework
- `electron`: 33.0.0 - Desktop runtime
- `better-sqlite3`: 12.6.2 - Local DB
- `exceljs`: 4.4.0 - Excel export
- `recharts`: 3.7.0 - Charts
- `sonner`: 2.0.7 - Notifications

### Development
- `typescript`: 5 - Type checking
- `eslint`: 9 - Code linting
- `drizzle-kit`: 0.31.8 - ORM tools
- `electron-builder`: 25.1.8 - Build tool

## 🎯 Development Workflow

1. **Feature Branch**: `git checkout -b feature/name`
2. **Code**: Write TypeScript + React
3. **Database**: Update schema, run migrations
4. **Test**: Manual testing in dev mode
5. **Lint**: `npm run lint`
6. **Build**: `npm run build`
7. **Commit**: Clear commit messages
8. **Push**: `git push origin feature/name`
9. **PR**: Create pull request

## 📈 Performance Notes

- Next.js automatic code splitting
- Tailwind CSS purges unused styles
- Database indexing via `npm run index`
- Hot reload in development
- Optimized Electron builds

## 🧪 Testing Strategy

- TypeScript for static type checking
- ESLint for code quality
- Manual testing in dev mode
- Build verification before release

## 🔄 Deployment

### Web Deployment
- Vercel (automatic from GitHub)
- Custom server (Next.js production)

### Desktop Deployment
- GitHub Releases (electron-builder)
- Auto-update capability (not yet configured)

## 📄 Documentation Map

```
QUICK_REFERENCE.md ← Start here!
    ↓
README.md (Full overview)
    ├─ ARCHITECTURE.md (Tech details)
    ├─ DEVELOPMENT.md (How to code)
    ├─ CONTRIBUTING.md (How to contribute)
    ├─ TROUBLESHOOTING.md (Fix issues)
    └─ PROJECT_SUMMARY.md (This file)
```

## 🤖 AI Assistant Integration Notes

This project is optimized for AI tools (ChatGPT, Copilot) with:
- Clear architecture documentation
- Type-safe codebase
- Comprehensive README
- Development guidelines
- Troubleshooting guide
- Quick reference commands

## 📞 Support & Contributing

- **Issues**: GitHub Issues for bugs
- **Discussions**: GitHub Discussions for ideas
- **Contributing**: See CONTRIBUTING.md
- **Troubleshooting**: See TROUBLESHOOTING.md

## 📄 License

MIT License

## 👤 Author

tranphilongib04-sys

---

**Last Updated**: January 28, 2026
**Version**: 1.0.0
**Status**: ✅ Ready for GitHub
