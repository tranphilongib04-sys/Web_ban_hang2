# Hướng Dẫn Khắc Phục Sự Cố - TPB Manage

## 🔴 Lỗi Phổ Biến & Giải Pháp

### 1. Port 3210 Đã Sử Dụng

**Lỗi:**
```
Error: listen EADDRINUSE: address already in use :::3210
```

**Giải Pháp:**

```bash
# Cách 1: Tìm process đang dùng port
lsof -i :3210

# Cách 2: Kill process
kill -9 <PID>

# Cách 3: Sử dụng port khác
npm run dev -- -p 3211
```

### 2. Node Modules Bị Lỗi

**Lỗi:**
```
Module not found: Can't resolve '@/...'
Cannot find module 'next'
```

**Giải Pháp:**

```bash
# Xoá node_modules
rm -rf node_modules package-lock.json

# Cài lại
npm install

# Hoặc nếu vẫn lỗi
npm cache clean --force
npm install
```

### 3. Lỗi TypeScript

**Lỗi:**
```
error TS2304: Cannot find name 'React'
Type 'X' is not assignable to type 'Y'
```

**Giải Pháp:**

```bash
# Kiểm tra type definitions
npm install --save-dev @types/node @types/react @types/react-dom

# Rebuild
npm run build
```

### 4. Database Locked

**Lỗi:**
```
Error: database is locked
SQLITE_BUSY: database is locked
```

**Giải Pháp:**

```bash
# Cách 1: Restart dev server
npm run dev

# Cách 2: Xoá database và rebuild
rm sqlite.db
npm run index

# Cách 3: Check process đang dùng db
lsof | grep sqlite.db
```

### 5. Electron Không Hiển Thị

**Lỗi:**
```
Electron window blank
White screen of death
```

**Giải Pháp:**

```bash
# Cách 1: Đảm bảo web server chạy trước
npm run dev

# Cách 2: Trong terminal khác
npm run electron:dev

# Cách 3: Check dev tools
# Nhấn: Ctrl+Shift+I hoặc Cmd+Option+I

# Cách 4: Kiểm tra logs
cat ~/Library/Logs/TPB\ Manage/main.log  # macOS
cat ~/.config/TPB\ Manage/main.log       # Linux
```

### 6. Migration Errors

**Lỗi:**
```
Error: No migrations found
Cannot read property 'up' of undefined
```

**Giải Pháp:**

```bash
# Tạo migration từ schema
npx drizzle-kit generate

# Apply migrations
npx drizzle-kit migrate

# Hoặc reset database
rm sqlite.db
npm run index
```

### 7. Build Fails

**Lỗi:**
```
error during build
Build failed with errors
```

**Giải Pháp:**

```bash
# Xoá build cache
rm -rf .next dist build

# Rebuild
npm run build

# Nếu vẫn lỗi, check:
npm run lint  # Kiểm tra linting errors
npx tsc --noEmit  # Kiểm tra TypeScript
```

### 8. Electron Build Fails

**Lỗi:**
```
Error building app
Icon not found
```

**Giải Pháp:**

```bash
# Chắc chắn web đã build
npm run build

# Build Electron
npm run electron:build

# Nếu icon missing:
# Tạo icon tại: build/TPB-Manage.icns (macOS)
#                 build/TPB-Manage.png (Linux)
#                 build/TPB-Manage.ico (Windows)

# Hoặc skip icon:
npm run electron:pack
```

### 9. Hot Reload Không Hoạt Động

**Lỗi:**
```
Changes not reflecting in browser
Page not updating
```

**Giải Pháp:**

```bash
# Cách 1: Hard refresh
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (macOS)

# Cách 2: Restart dev server
npm run dev

# Cách 3: Clear .next cache
rm -rf .next
npm run dev
```

### 10. Environment Variables Not Working

**Lỗi:**
```
process.env.VAR is undefined
```

**Giải Pháp:**

```bash
# 1. Tạo .env.local
cp .env .env.local

# 2. Thêm variables
echo "TURSO_DATABASE_URL=file:./data/tpb-manage.db" >> .env.local

# 3. Variables phải bắt đầu với NEXT_PUBLIC_ nếu dùng client-side
# Client-side: NEXT_PUBLIC_VAR
# Server-side: VAR

# 4. Restart dev server
npm run dev
```

## ⚙️ Advanced Troubleshooting

### Kiểm tra Node & npm Version

```bash
node --version    # Should be 18+
npm --version     # Should be 9+
```

### Kiểm tra Disk Space

```bash
df -h  # Check available space
```

### View Detailed Logs

```bash
# Electron logs
npm run electron:dev 2>&1 | tee electron.log

# Build logs
npm run build 2>&1 | tee build.log
```

### Reset Everything

```bash
# ⚠️ Xoá tất cả local data
rm -rf node_modules .next dist build dist-electron
rm sqlite.db
rm package-lock.json
npm install
npm run index
```

## 🔧 System Issues

### macOS: Code Signing Error

```bash
# Nếu gặp code signing issues:
sudo xcode-select --reset
```

### Linux: Missing Dependencies

```bash
# Install system dependencies
sudo apt-get install libnss3 libgconf-2-4 libxss1
```

### Windows: Build Tools Missing

```bash
# Install Windows Build Tools
npm install --global --production windows-build-tools
```

## 📊 Performance Issues

### App Running Slow

```bash
# 1. Check if database is large
ls -lh sqlite.db

# 2. Optimize database
npm run index

# 3. Clear browser cache
# DevTools → Application → Clear Site Data

# 4. Check disk space
df -h
```

### Memory Leaks

```bash
# Check memory usage
top      # Press 'q' to quit
ps aux | grep node
ps aux | grep electron
```

## 📝 Debugging Tips

### 1. Browser DevTools
```bash
# Auto open DevTools
npm run dev

# In Electron: F12 atau Cmd+Option+I
```

### 2. Debug Database

```bash
# Visual database editor
npx drizzle-kit studio
# Open: http://localhost:3000
```

### 3. Add Console Logs

```typescript
// src/lib/db/queries.ts
console.log('DEBUG:', { query, params });

// src/components/MyComponent.tsx
console.debug('Render with props:', { title, onAction });
```

### 4. Network Inspection

```bash
# Browser DevTools → Network tab
# Kiểm tra API requests và responses
```

## 📞 Still Having Issues?

1. **Search existing issues**: GitHub Issues
2. **Create detailed issue**:
   - Clear title
   - Error message (full stack trace)
   - Steps to reproduce
   - Your environment (OS, Node version, etc.)
3. **Check logs**:
   - Browser console (F12)
   - Terminal output
   - Application logs

## 🔗 Useful Resources

- [Next.js Troubleshooting](https://nextjs.org/docs/messages)
- [Electron Debugging](https://www.electronjs.org/docs/tutorial/debugging)
- [SQLite Errors](https://www.sqlite.org/rescode.html)
- [Node.js Error Codes](https://nodejs.org/api/errors.html)

---

**Nếu vẫn gặp vấn đề, hãy tạo issue trên GitHub! 🆘**
