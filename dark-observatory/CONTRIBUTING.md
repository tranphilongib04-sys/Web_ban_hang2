# Hướng Dẫn Đóng Góp - TPB Manage

## 🤝 Cách Tham Gia

Cảm ơn bạn đã quan tâm! Chúng tôi chào đón mọi đóng góp.

## 📋 Quy Trình Đóng Góp

### 1. Fork Repository
```bash
# Vào: https://github.com/tranphilongib04-sys/Web_ban_hang2
# Nhấn "Fork"
```

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/Web_ban_hang2.git
cd Web_ban_hang2/dark-observatory
```

### 3. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 4. Make Changes
- Commit thường xuyên với message rõ ràng
- Follow code style (xem bên dưới)

### 5. Push & Create PR
```bash
git push origin feature/your-feature-name
```

## 📝 Commit Message Guidelines

```
Format: <type>(<scope>): <subject>

Types:
  feat:     New feature
  fix:      Bug fix
  docs:     Documentation
  style:    Code style (no logic change)
  refactor: Code refactoring
  test:     Tests
  chore:    Build, dependencies, etc.

Examples:
  feat(products): add product filtering
  fix(db): resolve migration issue
  docs(readme): update setup instructions
```

## 🎨 Code Style

### TypeScript/React
- Use **strict TypeScript**
- Prefer **functional components**
- Use **arrow functions**
- Add **JSDoc comments** for public APIs

```typescript
/**
 * Formats a price to currency string
 * @param price - Price in decimal
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted price string
 */
function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
}
```

### CSS/Tailwind
- Use **Tailwind CSS utilities**
- Avoid inline styles
- Use semantic class names
- Mobile-first responsive design

```tsx
// Good
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Avoid
<div style="display: grid; columns: 3; gap: 4px;">
```

### Naming Conventions
- **Components**: PascalCase (`MyComponent`)
- **Files**: kebab-case (`my-component.tsx`)
- **Functions**: camelCase (`myFunction()`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_ITEMS`)
- **CSS Classes**: kebab-case (`my-class-name`)

## 🧪 Testing

Before submitting PR:

```bash
# Run type check
npx tsc --noEmit

# Run linter
npm run lint

# Build
npm run build

# Test Electron (if desktop changes)
npm run electron:pack
```

## ✅ PR Checklist

- [ ] Branch created from `main`
- [ ] All commits have clear messages
- [ ] Code follows style guide
- [ ] TypeScript types are correct
- [ ] No console.log or debug code
- [ ] Documentation updated (if needed)
- [ ] .env files not committed
- [ ] Tests pass (if applicable)

## 🐛 Bug Reports

When reporting issues:

1. **Clear title**: "Button doesn't work in dark mode"
2. **Describe problem**: What you expected vs what happened
3. **Reproduce steps**: Step-by-step
4. **Screenshots**: If UI related
5. **Environment**:
   - OS: Windows/Mac/Linux
   - Node version: `node --version`
   - npm version: `npm --version`

Example:
```
Title: Dark mode toggle freezes app

Description:
When clicking dark mode toggle button, app becomes unresponsive.

Steps:
1. Open app
2. Click theme toggle in header
3. App freezes

Expected:
Theme changes smoothly

Actual:
App becomes unresponsive, need to restart

OS: Windows 11
Node: v18.17.0
npm: 9.8.1
```

## 💡 Feature Requests

Describe:
1. **What**: Feature name and use case
2. **Why**: Problem it solves
3. **How**: Suggested implementation (optional)

Example:
```
Title: Add product image upload

Use Case:
Users need to upload product images to display in store

Problem:
Currently, only image URLs are supported

Suggested Implementation:
- Add image upload form
- Store images in local /public/products folder
- Show thumbnails in product list
```

## 📚 Documentation

If adding features:
- Update README.md if user-facing
- Update ARCHITECTURE.md if structure changes
- Update DEVELOPMENT.md if setup changes
- Add JSDoc comments in code

## 🚀 Deployment

Only maintainers can deploy:
```bash
npm run electron:build
# Desktop app uploaded to releases
```

## 📞 Questions?

- Create discussion on GitHub
- Check existing issues/PRs
- Open a GitHub Discussion

## 📄 License

All contributions are MIT licensed.

---

**Thank you for contributing! 🎉**
