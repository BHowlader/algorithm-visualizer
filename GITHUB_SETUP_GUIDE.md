# 📦 GitHub Setup & Deployment Guide

## Step-by-Step Instructions to Push to GitHub

### 1️⃣ Create Project Structure

Create the following folder structure:

```
algorithm-visualizer/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── AlgorithmVisualizer.jsx
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .gitignore
├── package.json
├── tailwind.config.js
└── README.md
```

### 2️⃣ Copy Files

Copy each file I provided into the correct location:

1. **package.json** → Root directory
2. **README.md** → Root directory
3. **tailwind.config.js** → Root directory
4. **.gitignore** → Root directory
5. **index.html** → public/ folder
6. **AlgorithmVisualizer.jsx** → src/components/ folder
7. **App.js** → src/ folder
8. **index.js** → src/ folder
9. **index.css** → src/ folder

### 3️⃣ Create Missing Files

Create **App.css** in src/ folder:
```css
.App {
  text-align: center;
}
```

Create **postcss.config.js** in root:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 4️⃣ Initialize Git Repository

Open terminal in your project folder and run:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Algorithm Visualizer"
```

### 5️⃣ Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the **"+"** icon → **"New repository"**
3. Repository name: `algorithm-visualizer`
4. Description: "Interactive visualizer for search and sorting algorithms"
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README (we already have one)
7. Click **"Create repository"**

### 6️⃣ Push to GitHub

Copy the commands from GitHub or use these:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/algorithm-visualizer.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## 🚀 Deploy to GitHub Pages

### Option A: Using gh-pages (Recommended)

1. **Install gh-pages package:**
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json:**
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/algorithm-visualizer",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}
```

3. **Deploy:**
```bash
npm run deploy
```

4. **Enable GitHub Pages:**
   - Go to repository **Settings** → **Pages**
   - Source: `gh-pages` branch
   - Click **Save**
   - Your site will be live at: `https://YOUR_USERNAME.github.io/algorithm-visualizer`

### Option B: Using Vercel (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **"Add New Project"**
4. Import your `algorithm-visualizer` repository
5. Click **Deploy**
6. Done! You'll get a live URL instantly

### Option C: Using Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Connect to GitHub and select your repository
5. Build command: `npm run build`
6. Publish directory: `build`
7. Click **Deploy**

---

## 🔧 Local Development

### First Time Setup:

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/algorithm-visualizer.git
cd algorithm-visualizer

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Making Changes:

```bash
# Make your changes in code

# Test locally
npm start

# Add changes
git add .

# Commit with message
git commit -m "Add feature: XYZ"

# Push to GitHub
git push origin main

# Deploy (if using gh-pages)
npm run deploy
```

---

## 📝 Update Repository Info

Before pushing, update these in your files:

### In README.md:
- Replace `yourusername` with your GitHub username
- Add your name and social links
- Update the demo link after deployment

### In package.json:
- Update `author` field
- Update `repository.url` with your repo URL

---

## ✅ Checklist Before Pushing

- [ ] All files are in correct folders
- [ ] package.json has correct author info
- [ ] README.md has your GitHub username
- [ ] .gitignore is present
- [ ] Code runs locally without errors (`npm start`)
- [ ] All dependencies are installed
- [ ] Git is initialized
- [ ] Remote repository is created on GitHub

---

## 🆘 Troubleshooting

### Error: "gh-pages not found"
```bash
npm install gh-pages --save-dev
```

### Error: "Permission denied"
```bash
# Use HTTPS instead of SSH
git remote set-url origin https://github.com/YOUR_USERNAME/algorithm-visualizer.git
```

### Error: "Build failed"
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Tailwind styles not working
```bash
# Make sure postcss.config.js exists
# Restart development server
npm start
```

---

## 🎉 Success!

Once deployed, share your project:
- Add the live URL to your GitHub repository description
- Share on LinkedIn with #WebDevelopment #React #Algorithms
- Add to your portfolio
- Star your own repository! ⭐

---

**Need Help?** Open an issue in your repository or check React/Vercel documentation.