# Architecture - TPB Manage

## 📊 Cấu Trúc Ứng Dụng

```
┌─────────────────────────────────────┐
│     Electron (Desktop)              │
│  ┌─────────────────────────────────┐│
│  │   Next.js Web App (port 3210)  ││
│  │  ┌───────────────────────────┐  ││
│  │  │   React Components        │  ││
│  │  │   - Pages & Layouts       │  ││
│  │  │   - UI Components (Radix) │  ││
│  │  └───────────────────────────┘  ││
│  │  ┌───────────────────────────┐  ││
│  │  │   API Routes              │  ││
│  │  │   - Server Actions        │  ││
│  │  └───────────────────────────┘  ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
           ▼
┌─────────────────────────────────────┐
│   Drizzle ORM                       │
│   ├─ Schema Definition              │
│   ├─ Query Builder                  │
│   └─ Migrations                     │
└─────────────────────────────────────┘
           ▼
┌─────────────────────────────────────┐
│   Database Layer                    │
│   ├─ SQLite (local)                 │
│   └─ Turso (optional cloud)         │
└─────────────────────────────────────┘
```

## 📁 Thư Mục Chính

### `/src/app`
- **Route-based pages** của Next.js 13+ App Router
- Layouts, templates, error boundaries
- Server components & client components

### `/src/components`
- **Reusable React components**
- Radix UI component wrappers
- Form components
- Dialog/Modal components

### `/src/lib/db`
- **Schema**: Định nghĩa bảng database
- **Queries**: Database query functions
- **Migrations**: Quản lý schema versions

### `/src/styles`
- **Tailwind CSS** configuration
- Global styles
- CSS modules

### `/electron`
- **Main process**: Điều khiển cửa sổ Electron
- **Preload scripts**: Communication IPC
- **Tray icons**: System tray integration

### `/drizzle`
- **Migration files**: Generated từ schema changes
- **Meta files**: Tracking schema versions

## 🔄 Dòng Dữ Liệu

```
User Action (UI)
    ▼
React Component Event Handler
    ▼
API Route / Server Action
    ▼
Drizzle ORM Query
    ▼
SQLite Database
    ▼
Response (JSON)
    ▼
Update Component State (UI)
```

## 🛠 Tech Stack Chi Tiết

| Layer | Công Nghệ | Mục Đích |
|-------|-----------|---------|
| **Desktop** | Electron 33 | App wrapper |
| **Web Server** | Next.js 16 | Framework |
| **UI Library** | React 19 | Components |
| **Styling** | Tailwind CSS 4 | Utility CSS |
| **Database** | SQLite / Turso | Data storage |
| **ORM** | Drizzle Kit | Database operations |
| **Tables** | Radix UI + TailwindCSS | Data display |
| **Type Safety** | TypeScript | Static typing |

## 🔐 Security

- **Environment variables**: Sensitive data in `.env.local`
- **Type safety**: TypeScript prevents many bugs
- **SQL Injection prevention**: Drizzle ORM parameterized queries

## ♿ Accessibility

- **Radix UI**: Accessible component primitives
- **ARIA labels**: Proper semantic HTML
- **Keyboard navigation**: Full keyboard support

## 🎨 Styling System

- **Tailwind CSS**: Utility-first CSS framework
- **Dark mode**: Next Themes integration
- **Component variants**: Class variance authority (CVA)
- **Animations**: Tailwind animations + tw-animate-css

## 📊 Data Management

### Current State Management
- React Context/Hooks for local state
- Server Actions for mutations
- React Query (if needed for caching)

### Database Interactions
- Direct SQLite for local data
- Optional Turso for cloud sync
- Drizzle migrations for schema versioning

## 🚀 Performance Considerations

- **Next.js Image Optimization**: Disabled (Electron compatible)
- **Code Splitting**: Automatic by Next.js
- **Database Indexing**: Via trigger-indexing.sh
- **Caching**: Browser cache + Server cache

## 📱 Cross-Platform

- **Windows**: Electron builder native support
- **macOS**: Universal binary (x64 + arm64)
- **Linux**: AppImage support available

## 🔄 CI/CD Ready

- ESLint configured
- TypeScript strict mode
- Vercel deployment ready
- Build scripts for desktop apps
