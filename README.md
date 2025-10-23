# Financial Dashboard - Quick Start Guide

> **For LAMP Developers**: This React app is different from traditional PHP files. You can't just open `.jsx` files in a browser like `.html` files. React requires a **build process** to transform JSX into browser-readable JavaScript.

---

## 📋 Table of Contents

- [Why Doesn't JSX Work in Chrome?](#why-doesnt-jsx-work-in-chrome)
- [Prerequisites](#prerequisites)
- [Quick Start (5 Minutes)](#quick-start-5-minutes)
- [Getting API Keys](#getting-api-keys)
- [Development Workflow](#development-workflow)
- [Deployment to Production](#deployment-to-production)
- [Troubleshooting](#troubleshooting)

---

## 🤔 Why Doesn't JSX Work in Chrome?

**TL;DR**: Browsers don't understand JSX. It needs to be compiled to JavaScript first.

### The LAMP Way (What You're Used To)
```
PHP File → Apache reads it → Executes PHP → Sends HTML to browser → Done ✅
```

### The React Way (What's Different)
```
JSX File → Build tool compiles it → Creates JS bundle → Browser runs JS → Renders UI ✅
```

**Key Differences:**

| Traditional LAMP | React SPA |
|-----------------|-----------|
| `.php` files run server-side | `.jsx` files are **source code** |
| Apache/PHP processes requests | Node.js builds the app |
| Direct HTML output | JavaScript renders HTML dynamically |
| Page reloads on navigation | Single page, no reloads |
| Can open `.html` directly | **Must use dev server or build** |

**Think of it like this:** JSX is to JavaScript what `.scss` is to `.css` - it needs compilation!

---

## ✅ Prerequisites

Before you start, install these on your system:

### 1. Node.js & npm (The React "Runtime")

**What it is:** Node.js is like PHP's interpreter, but for JavaScript. npm is like Composer for PHP.

**Install:**

```bash
# Check if already installed
node --version   # Should show v18 or higher
npm --version    # Should show v9 or higher

# If not installed, download from:
# https://nodejs.org/
# Choose the LTS (Long Term Support) version
```

**For Ubuntu/Debian:**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**For Mac (with Homebrew):**
```bash
brew install node
```

### 2. A Code Editor

- VS Code (recommended) - has great React support
- PHPStorm - also supports React/JSX
- Sublime Text with Babel plugin

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Create a New React Project

React uses **Vite** (pronounced "veet") as its build tool. Think of Vite like Webpack, but faster.

```bash
# Navigate to where you want the project
cd ~/projects

# Create new React app called "financial-dashboard"
npm create vite@latest financial-dashboard -- --template react

# This creates a folder with all necessary files
```

**What just happened?** This created a React project structure with configuration files, similar to running `composer create-project` for Laravel.

### Step 2: Enter the Project Directory

```bash
cd financial-dashboard
```

### Step 3: Install Dependencies (Like `composer install`)

```bash
npm install
```

**What this does:** Downloads all required packages listed in `package.json` (similar to `composer.json`). Creates a `node_modules` folder (like PHP's `vendor` folder).

⏱️ **Wait time:** 30-60 seconds depending on internet speed.

### Step 4: Install Required Libraries

This dashboard needs some extra packages:

```bash
npm install lucide-react
```

**What is lucide-react?** An icon library (those pretty icons for charts, menus, etc.)

### Step 5: Replace the Default Code

1. **Delete** the default content in `src/App.jsx`
2. **Copy** the Financial Dashboard code into `src/App.jsx`
3. **Save** the file

**Location:** `financial-dashboard/src/App.jsx`

### Step 6: Update the CSS (Optional but Recommended)

Replace `src/index.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}
```

### Step 7: Install Tailwind CSS (Required for Styling)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Step 8: Start the Development Server

```bash
npm run dev
```

**What happens:**
- Vite starts a development server (like `php -S localhost:8000`)
- Your app is compiled and served
- Console shows: `Local: http://localhost:5173/`

### Step 9: Open in Browser

Visit: **http://localhost:5173/**

🎉 **You should see your dashboard!**

---

## 🔑 Getting API Keys

The dashboard uses demo API keys by default. Get real keys for production:

### Metals.dev (Gold & Silver Prices)

1. Go to: https://metals.dev/
2. Click "Get API Key" or "Sign Up"
3. Create free account (no credit card needed)
4. Copy your API key
5. In `src/App.jsx`, find line ~23:
   ```javascript
   const metalsResponse = await fetch('https://api.metals.dev/v1/latest?api_key=demo&currency=USD&unit=toz');
   ```
6. Replace `demo` with your key:
   ```javascript
   const metalsResponse = await fetch('https://api.metals.dev/v1/latest?api_key=YOUR_KEY_HERE&currency=USD&unit=toz');
   ```

**Free tier limits:** 100 requests/month

### Finnhub (Stock Prices)

1. Go to: https://finnhub.io/register
2. Sign up (free, no credit card)
3. Verify email
4. Dashboard will show your API key
5. In `src/App.jsx`, find line ~44:
   ```javascript
   const FINNHUB_API_KEY = 'demo';
   ```
6. Replace with your key:
   ```javascript
   const FINNHUB_API_KEY = 'your_actual_key_here';
   ```

**Free tier limits:** 60 API calls/minute

---

## 🛠️ Development Workflow

### Running the App

```bash
# Start dev server (with hot reload)
npm run dev

# Stop the server
# Press Ctrl+C in terminal
```

**Hot Reload:** When you save changes to `.jsx` files, the browser auto-updates. No manual refresh needed!

### File Structure

```
financial-dashboard/
├── node_modules/          # Dependencies (like vendor/)
├── public/                # Static files (images, etc.)
├── src/
│   ├── App.jsx           # 👈 Main dashboard code goes here
│   ├── main.jsx          # Entry point (don't touch)
│   └── index.css         # Global styles
├── index.html            # Root HTML file
├── package.json          # Dependencies list (like composer.json)
├── vite.config.js        # Build configuration
└── README.md             # This file
```

### Making Changes

1. Edit `src/App.jsx`
2. Save file
3. Browser auto-refreshes
4. See changes immediately

**Unlike LAMP:** No need to restart Apache or clear caches!

---

## 🚀 Deployment to Production

When ready to deploy, you need to **build** the app:

### Step 1: Build for Production

```bash
npm run build
```

**What happens:**
- Creates optimized, minified JavaScript
- Outputs to `dist/` folder
- Ready for production hosting

### Step 2: Deploy the `dist` Folder

The `dist` folder contains your production-ready app:

```
dist/
├── index.html          # Main HTML file
├── assets/
│   ├── index-abc123.js   # Bundled JavaScript
│   └── index-def456.css  # Bundled CSS
```

**Option A: Traditional Web Host (Like Your LAMP Server)**

1. Upload `dist/` contents to your web root
2. Point domain to the folder
3. Configure server (see below)

**Important:** You need URL rewriting for SPAs!

**Apache (.htaccess in `dist/` folder):**

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx:**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Option B: Modern Static Hosts (Easiest)**

Deploy to platforms that understand SPAs:

- **Netlify** (free): Just drag-and-drop the `dist` folder
- **Vercel** (free): Connect GitHub repo, auto-deploys
- **GitHub Pages** (free): Use `gh-pages` package
- **Cloudflare Pages** (free): Connect Git repo

### Step 3: Test Production Build Locally

```bash
# Install preview server
npm install -g serve

# Serve the built files
serve -s dist

# Opens on http://localhost:3000
```

---

## 🐛 Troubleshooting

### "npm: command not found"

**Problem:** Node.js not installed

**Solution:** Install Node.js from https://nodejs.org/

### Port 5173 Already in Use

**Problem:** Another app using that port

**Solution:**

```bash
# Kill the process on port 5173
# Mac/Linux:
lsof -ti:5173 | xargs kill -9

# Windows:
netstat -ano | findstr :5173
taskkill /PID [PID_NUMBER] /F

# Or change port in vite.config.js
```

### "Cannot find module 'lucide-react'"

**Problem:** Dependencies not installed

**Solution:**

```bash
npm install
npm install lucide-react
```

### Blank White Page After Build

**Problem:** Assets loading from wrong path

**Solution:** Check `vite.config.js` base path:

```javascript
export default {
  base: '/', // Change if deployed to subdirectory
}
```

### API Errors / No Data Showing

**Problem:** Using demo API keys with rate limits

**Solution:** Get your own API keys (see above)

### Changes Not Showing Up

**Problem:** Browser cache or dev server stuck

**Solution:**

```bash
# Stop dev server (Ctrl+C)
# Clear cache or hard refresh (Ctrl+Shift+R)
# Restart dev server
npm run dev
```

---

## 📚 Learn More

### React Concepts (For LAMP Devs)

| React Concept | LAMP Equivalent |
|--------------|-----------------|
| Component | PHP function/class that outputs HTML |
| Props | Function parameters |
| State (`useState`) | Session variables |
| `useEffect` | Code that runs on page load |
| JSX | HTML mixed with PHP (but in JS) |

### Helpful Resources

- **React Docs:** https://react.dev/learn
- **Vite Docs:** https://vitejs.dev/guide/
- **Tailwind CSS:** https://tailwindcss.com/docs

### Common Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Package Management
npm install             # Install all dependencies
npm install [package]   # Add new package
npm uninstall [package] # Remove package
npm update              # Update packages

# Debugging
npm list                # Show installed packages
npm outdated            # Show outdated packages
```

---

## 💡 Tips for LAMP Developers

1. **Stop thinking in pages:** React is one page that changes content dynamically
2. **Embrace the terminal:** You'll use `npm` commands instead of FTP/SFTP
3. **Hot reload is amazing:** Changes appear instantly without refresh
4. **Components are reusable:** Build once, use everywhere (like PHP includes++)
5. **State management is key:** Learn `useState` - it's like session variables
6. **Browser DevTools:** React has its own DevTools extension - install it!

---

## 🆘 Need Help?

- Check browser console (F12) for errors
- Read error messages - they're usually helpful!
- Google error messages with "react" keyword
- Stack Overflow is your friend

---

## 📝 License

This dashboard is free to use and modify. No attribution required.

---

**Questions?** Open an issue or reach out!

---



## Development Notes

### AI Assistance
This application was developed with AI assistance:
- **Initial scaffold & architecture**: Claude (Anthropic)
- **React components**: AI-generated, human-reviewed
- **API integration**: Collaborative development
- **Documentation**: AI-assisted writing and formatting

All AI-generated code has been reviewed, tested, and modified for production use.

---

## Credits

- Dashboard architecture and React components developed with assistance from Claude (Anthropic)
- All code reviewed, tested, and customized for production use
- API integrations: Metals.dev, Finnhub