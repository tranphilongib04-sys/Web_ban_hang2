# TPB Manage - Quick Reference

## 🚀 Quick Start (30 seconds)

```bash
cd dark-observatory
npm install
npm run index
npm run dev
# Open: http://localhost:3210
```

## 📱 Desktop App

```bash
npm run electron:dev
```

## 📚 Documentation Files

| File | Mô Tả |
|------|-------|
| [README.md](README.md) | Project overview & setup |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Tech stack & structure |
| [DEVELOPMENT.md](DEVELOPMENT.md) | Coding guide & best practices |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to contribute |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Common issues & fixes |

## 🔧 Essential Commands

```bash
# Development
npm run dev              # Web server
npm run electron:dev    # Desktop app
npm run lint            # Check code

# Database
npm run index           # Setup/sync database
npm run index:auto      # Auto indexing script

# Building
npm run build           # Build web app
npm run electron:build  # Build desktop

# Drizzle ORM
npx drizzle-kit generate    # Create migrations
npx drizzle-kit migrate     # Apply migrations
npx drizzle-kit push        # Push to cloud (Turso)
npx drizzle-kit studio      # Visual DB editor
```

## 📂 Project Structure

```
dark-observatory/
├── src/
│   ├── app/          # Pages & API routes
│   ├── components/   # React components
│   ├── lib/db/       # Database layer
│   └── styles/       # Tailwind config
├── electron/         # Desktop app code
├── drizzle/          # Database migrations
├── public/           # Static files
├── README.md         # Main documentation
├── ARCHITECTURE.md   # Tech details
├── DEVELOPMENT.md    # Coding guide
└── package.json      # Dependencies
```

## 🌐 Ports & URLs

| Service | URL | Notes |
|---------|-----|-------|
| Web App | http://localhost:3210 | Next.js dev server |
| DB Studio | http://localhost:3000 | Drizzle Kit (when running) |

## 📋 Environment Setup

```bash
# Create .env.local
echo "TURSO_DATABASE_URL=file:./data/tpb-manage.db" > .env.local
echo "TURSO_AUTH_TOKEN=" >> .env.local

# Verify
cat .env.local
```

## ✅ Pre-GitHub Checklist

- [x] README.md - Comprehensive
- [x] ARCHITECTURE.md - Structure documented
- [x] DEVELOPMENT.md - Setup & coding guide
- [x] CONTRIBUTING.md - Contribution guide
- [x] TROUBLESHOOTING.md - Common issues
- [x] .gitignore - Updated
- [x] Scripts - Working (index, index:auto)
- [x] Log files - Cleaned
- [x] Environment - Properly configured

## 🤖 For ChatGPT Integration

The repository is now optimized for AI tools like ChatGPT with:
✅ Comprehensive README
✅ Well-structured codebase
✅ Clear architecture documentation
✅ Development guidelines
✅ Troubleshooting guide
✅ Contributing guide
✅ Clean git history (log files removed)

## 🔗 GitHub Links (Update After Pushing)

- **Repository**: https://github.com/tranphilongib04-sys/Web_ban_hang2
- **Issues**: https://github.com/tranphilongib04-sys/Web_ban_hang2/issues
- **Discussions**: https://github.com/tranphilongib04-sys/Web_ban_hang2/discussions
- **Releases**: https://github.com/tranphilongib04-sys/Web_ban_hang2/releases

## 💡 Common Tasks

### Add a new page
```bash
# Create: src/app/your-page/page.tsx
export default function YourPage() {
  return <h1>Your Page</h1>;
}
```

### Add a database table
```bash
# Edit: src/lib/db/schema.ts
# Then: npm run drizzle:generate && npm run index
```

### Add a component
```bash
# Create: src/components/YourComponent.tsx
'use client';
export function YourComponent() {
  return <div>Component</div>;
}
```

## 📞 Support

- 📖 Read docs first
- 🔍 Check TROUBLESHOOTING.md
- 🐛 Search GitHub Issues
- 💬 Create GitHub Discussion
- 📝 Report Issue with details

---

**Ready to push to GitHub! 🚀**
