# TPB Manage - Web Ban Hàng 2

Ứng dụng quản lý bán hàng với giao diện desktop được xây dựng bằng Next.js, React, Electron và SQLite.

## 📋 Mô Tả

TPB Manage là một ứng dụng desktop toàn diện để quản lý cửa hàng bán hàng, hỗ trợ:
- Quản lý sản phẩm
- Quản lý đơn hàng
- Quản lý khách hàng
- Báo cáo doanh số
- Xuất/Nhập dữ liệu Excel
- Giao diện tối/sáng

## 🛠 Công Nghệ

- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** SQLite (local), Turso (optional)
- **ORM:** Drizzle ORM
- **Desktop:** Electron
- **UI Components:** Radix UI
- **Chart:** Recharts

## 📦 Yêu Cầu

- Node.js 18+
- npm hoặc yarn
- Git

## 🚀 Cài Đặt & Chạy

### 1. Clone repository
```bash
git clone https://github.com/tranphilongib04-sys/Web_ban_hang2.git
cd Web_ban_hang2/dark-observatory
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình biến môi trường
Tạo file `.env.local` hoặc `.env`:
```env
TURSO_DATABASE_URL=file:./data/tpb-manage.db
TURSO_AUTH_TOKEN=
```

### 4. Chuẩn bị database
```bash
npm run index
# hoặc
npm run index:auto
```

### 5. Chạy dự án

**Development Web:**
```bash
npm run dev
# Truy cập: http://localhost:3210
```

**Development Desktop (Electron):**
```bash
npm run electron:dev
```

**Production Build:**
```bash
npm run build
npm start
```

**Build Desktop App:**
```bash
npm run electron:build
```

## 📁 Cấu Trúc Dự Án

```
dark-observatory/
├── src/
│   ├── app/              # Next.js pages & layouts
│   ├── components/       # React components
│   ├── lib/
│   │   └── db/          # Database schema & queries
│   └── styles/          # CSS & Tailwind config
├── electron/            # Electron main process
├── drizzle/             # Database migrations
├── public/              # Static assets
├── data/                # SQLite database
├── drizzle.config.ts    # ORM configuration
├── next.config.mjs      # Next.js configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies & scripts
```

## 🗄️ Database

### Migrations
```bash
npx drizzle-kit generate    # Generate migrations
npx drizzle-kit migrate     # Apply migrations
npx drizzle-kit push        # Push to remote (Turso)
npx drizzle-kit introspect  # Validate schema
```

## 🔍 Linting & Quality

```bash
npm run lint     # Run ESLint
```

## 📝 Scripts

| Script | Mô Tả |
|--------|-------|
| `npm run dev` | Chạy dev server Next.js |
| `npm run build` | Build production |
| `npm start` | Chạy server production |
| `npm run electron` | Chạy Electron |
| `npm run electron:dev` | Chạy Next.js + Electron |
| `npm run electron:build` | Build Electron app |
| `npm run electron:pack` | Pack Electron app |
| `npm run index` | Trigger database indexing |
| `npm run index:auto` | Chạy script indexing tự động |
| `npm run lint` | Chạy linter |

## 🤖 ChatGPT Integration

Dự án này được tối ưu hóa để sử dụng với ChatGPT/Copilot:

1. **README.md**: Tài liệu toàn diện
2. **Cấu trúc rõ ràng**: Dễ hiểu architecture
3. **TypeScript**: Type safety
4. **Comments**: Mã có tài liệu

## 📄 Giấy Phép

MIT

## 👤 Tác Giả

tranphilongib04-sys

## 🐛 Báo Cáo Lỗi

Vui lòng tạo issue trên GitHub nếu gặp vấn đề.
