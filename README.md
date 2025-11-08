# 🔍 Advanced Algorithm Visualizer

An interactive, feature-rich web application to visualize and learn popular **Search** and **Sorting** algorithms with real-time animations, customizable controls, and educational resources.

![Algorithm Visualizer](https://img.shields.io/badge/React-18.x-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8) ![Status](https://img.shields.io/badge/status-active-success)

## 🌟 Live Demo

**[🚀 Try it Live](https://BHowlader.github.io/algorithm-visualizer)**

---

## ✨ Features

### 🔎 **Search Algorithms**
- **Linear Search** - Sequential search through unsorted arrays (O(n))
- **Binary Search** - Efficient divide-and-conquer on sorted arrays (O(log n))

### 📊 **Sorting Algorithms**
- **Bubble Sort** - Compare and swap adjacent elements (O(n²))
- **Selection Sort** - Find minimum and place at start (O(n²))
- **Insertion Sort** - Build sorted array incrementally (O(n²))
- **Quick Sort** - Fast divide-and-conquer with pivot (O(n log n))
- **Merge Sort** - Stable divide-and-conquer merging (O(n log n))
- **Heap Sort** - In-place heap-based sorting (O(n log n))

### 🎮 **Interactive Controls**
- ⏯️ **Play/Pause/Reset** - Full playback control
- ⚡ **Speed Control** - Adjustable animation speed (200ms - 2000ms)
- 📏 **Array Size Selector** - Choose from 5 to 15 elements
- 🎲 **Random Array Generator** - Create new test data instantly
- 🎯 **Custom Target Input** - Set search values manually

### 🎨 **Visual Features**
- 🌓 **Dark/Light Theme Toggle** - Beautiful themes for any preference
- 🎨 **Color-Coded Visualization** - Clear visual feedback
  - 🟡 Yellow - Currently comparing
  - 🟢 Green - Sorted/Found
  - 🔴 Red - Already checked
  - 🟠 Orange - Pivot element
  - 🔵 Blue/Purple - Active elements
- 📊 **Real-time Statistics** - Live comparison and swap counters
- 📝 **Step-by-step Log** - Detailed execution tracking

### 💻 **Learning Tools**
- 📖 **Code Display** - View actual implementation for each algorithm
- 📚 **Algorithm Comparison Table** - Time/space complexity reference
- ❓ **Interactive Help System** - Built-in tutorials and guides
- ⌨️ **Keyboard Shortcuts** - Efficient navigation

### 🔊 **Audio Feedback**
- 🎵 **Sound Effects** - Audio cues for comparisons, swaps, and completions
- 🔇 **Toggle On/Off** - Optional sound control

### 📱 **User Experience**
- 📱 **Fully Responsive** - Works on mobile, tablet, and desktop
- ⌨️ **Keyboard Navigation** - Complete keyboard support
- ⚙️ **Settings Panel** - Customize your experience
- 🎯 **Smooth Animations** - Beautiful transitions and effects

---

## 🛠️ Technologies Used

- **React 18.x** - Modern UI library with hooks
- **Tailwind CSS 3.x** - Utility-first styling
- **Lucide React** - Beautiful icon system
- **JavaScript ES6+** - Modern JavaScript features
- **Web Audio API** - Sound effects
- **CSS3 Animations** - Smooth transitions

---

## 📦 Installation & Setup

### Prerequisites
- Node.js v14 or higher
- npm or yarn package manager
- Git

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/BHowlader/algorithm-visualizer.git
cd algorithm-visualizer

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Open browser
# Application will open at http://localhost:3000
```

### Build for Production

```bash
# Create optimized production build
npm run build

# The build folder contains your production-ready app
```

### Deploy to GitHub Pages

```bash
# Install gh-pages (if not already installed)
npm install --save-dev gh-pages

# Deploy to GitHub Pages
npm run deploy

# Your site will be live at:
# https://<username>.github.io/algorithm-visualizer
```

---

## 📁 Project Structure

```
algorithm-visualizer/
├── public/
│   ├── index.html              # HTML template
│   └── favicon.ico             # Site favicon
├── src/
│   ├── components/
│   │   └── AlgorithmVisualizer.jsx  # Main component (2500+ lines)
│   ├── App.js                  # Root component
│   ├── App.css                 # App styles
│   ├── index.js                # Entry point
│   └── index.css               # Global styles + Tailwind
├── package.json                # Dependencies & scripts
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

---

## 🎮 How to Use

### Basic Usage
1. **Select Algorithm** - Click any tab (Linear, Binary, Bubble, etc.)
2. **Configure** - Set target value (for search) or generate random array
3. **Start** - Click "Start" button or press **Space**
4. **Control** - Use Play/Pause/Reset buttons
5. **Learn** - Watch visualization and read step-by-step log

### Advanced Features
- **Settings** (S key) - Adjust speed and array size
- **Code View** (C key) - See implementation
- **Help** (H key) - View keyboard shortcuts
- **Sound** - Toggle audio feedback
- **Theme** - Switch between dark/light modes

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play/Pause visualization |
| `R` | Reset current algorithm |
| `S` | Toggle Settings panel |
| `C` | Toggle Code display |
| `H` | Toggle Help panel |

---

## 📚 Algorithm Complexity Reference

| Algorithm | Best Case | Average Case | Worst Case | Space | Stable |
|-----------|-----------|--------------|------------|-------|--------|
| **Linear Search** | O(1) | O(n) | O(n) | O(1) | N/A |
| **Binary Search** | O(1) | O(log n) | O(log n) | O(1) | N/A |
| **Bubble Sort** | O(n) | O(n²) | O(n²) | O(1) | ✓ Yes |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | O(1) | ✗ No |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) | ✓ Yes |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | ✗ No |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | ✓ Yes |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | ✗ No |

---

## 🎯 Key Learning Outcomes

After using this visualizer, you'll understand:
- ✅ How different search algorithms work
- ✅ Trade-offs between sorting algorithms
- ✅ Time and space complexity concepts
- ✅ When to use each algorithm
- ✅ Step-by-step algorithm execution
- ✅ Real-world performance differences

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open Pull Request**

### Contribution Ideas
- Add more algorithms (Radix Sort, Counting Sort, etc.)
- Improve mobile experience
- Add more themes
- Translate to other languages
- Add graph algorithms (BFS, DFS, Dijkstra)
- Performance optimizations

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature idea? Please open an issue!

**Bug Report Template:**
```
**Description:** Brief description
**Steps to Reproduce:** 1. 2. 3.
**Expected:** What should happen
**Actual:** What actually happens
**Browser:** Chrome/Firefox/Safari version
**Screenshots:** If applicable
```

---

## 📝 Changelog

### Version 2.0.0 (Current)
- ✨ Added Quick Sort, Merge Sort, Heap Sort
- ✨ Speed control slider (200ms - 2000ms)
- ✨ Array size selector (5-15 elements)
- ✨ Dark/Light theme toggle
- ✨ Sound effects with toggle
- ✨ Code display panel
- ✨ Keyboard shortcuts system
- ✨ Interactive help/tutorial
- ✨ Settings panel
- ✨ Algorithm comparison table
- 📱 Improved mobile responsiveness
- 🎨 Enhanced visual feedback
- 🐛 Various bug fixes and optimizations

### Version 1.0.0
- Initial release with 5 algorithms
- Basic visualization
- Play/Pause/Reset controls

---

## 🎓 Educational Use

This project is perfect for:
- 📚 Computer Science students
- 👨‍🏫 Teachers and educators
- 💼 Interview preparation
- 🎯 Algorithm learning
- 🏫 Classroom demonstrations
- 📖 Self-study and practice

**Teachers:** Feel free to use this in your curriculum! It's designed to make algorithm learning interactive and engaging.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 [Bibek Howlader]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@BHowlader](https://github.com/BHowlader)
- LinkedIn: [Bibek Howlader](https://www.linkedin.com/in/bibek-howlader-273944221)
- Email: bibekhowlader8@gmail.com
- Portfolio: [bhowlader.github.io](https://bhowlader.github.io)

---

## 🙏 Acknowledgments

- **Inspired by:** [VisuAlgo](https://visualgo.net) - Algorithm Visualization
- **Built with:** React, Tailwind CSS, Lucide Icons
- **Deployed on:** GitHub Pages
- **Special thanks to:**
  - The React team for an amazing framework
  - Tailwind Labs for beautiful styling
  - The open-source community

---

## ⭐ Show Your Support

If this project helped you learn algorithms or you found it useful, please:
- ⭐ Star this repository
- 🐛 Report bugs or suggest features
- 📢 Share with others learning algorithms
- 💖 Consider contributing

**Give a ⭐️ if this project helped you!**

---

## 🔗 Related Projects

- [Sorting Visualizer](https://github.com/clementmihailescu/Sorting-Visualizer)
- [Algorithm Visualizer](https://github.com/algorithm-visualizer/algorithm-visualizer)
- [VisuAlgo](https://visualgo.net)

---

## 📈 Project Stats

![GitHub stars](https://img.shields.io/github/stars/BHowlader/algorithm-visualizer?style=social)
![GitHub forks](https://img.shields.io/github/forks/BHowlader/algorithm-visualizer?style=social)
![GitHub issues](https://img.shields.io/github/issues/BHowlader/algorithm-visualizer)
![GitHub pull requests](https://img.shields.io/github/issues-pr/BHowlader/algorithm-visualizer)

---

## 🚀 Future Enhancements

### Planned Features
- [ ] More sorting algorithms (Radix, Counting, Bucket Sort)
- [ ] Graph algorithms (BFS, DFS, Dijkstra, A*)
- [ ] Tree algorithms (BST operations, AVL, Red-Black)
- [ ] String algorithms (KMP, Rabin-Karp)
- [ ] Export visualization as GIF/Video
- [ ] Save/Load custom arrays
- [ ] Algorithm comparison mode (side-by-side)
- [ ] Custom color themes
- [ ] Internationalization (i18n)
- [ ] Performance analytics
- [ ] Quiz mode for learning
- [ ] Code execution timer

### Community Requests
- Submit your ideas via [Issues](https://github.com/BHowlader/algorithm-visualizer/issues)

---

## 💬 Feedback

Your feedback is valuable! Please:
- 🌟 Star the repo if you like it
- 🐛 Report bugs via Issues
- 💡 Suggest features
- 📢 Share with others
- ✍️ Write a review or blog post

---

## 📞 Contact & Support

- **Issues:** [GitHub Issues](https://github.com/BHowlader/algorithm-visualizer/issues)
- **Discussions:** [GitHub Discussions](https://github.com/BHowlader/algorithm-visualizer/discussions)
- **Email:** bibekhowlader8@gmail.com
- LinkedIn: [Bibek Howlader](https://www.linkedin.com/in/bibek-howlader-273944221)

---

<div align="center">

### Made with ❤️ using React & Tailwind CSS

**[⬆ Back to Top](#-advanced-algorithm-visualizer)**

---

**Star ⭐ this repository if you found it helpful!**

</div>
