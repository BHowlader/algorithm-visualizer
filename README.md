# 🔍 Algorithm Visualizer

An interactive web application to visualize popular **Search** and **Sorting** algorithms step-by-step.

![Algorithm Visualizer](https://img.shields.io/badge/React-18.x-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

### Search Algorithms
- **Linear Search** - Sequential search through unsorted arrays
- **Binary Search** - Efficient divide-and-conquer on sorted arrays

### Sorting Algorithms
- **Bubble Sort** - Compare and swap adjacent elements
- **Selection Sort** - Find minimum and place at start
- **Insertion Sort** - Build sorted array incrementally

## 🎯 Key Features
- ✨ Real-time step-by-step visualization
- ⏯️ Play, Pause, and Reset controls
- 🎲 Random array generation
- 📊 Live statistics (comparisons, swaps)
- 🎨 Color-coded visual feedback
- 📱 Responsive design

## 🚀 Demo

[Live Demo](#) *(Add your deployment link here)*

## 📸 Screenshots

### Linear Search
![Linear Search Demo](screenshots/linear-search.png)

### Bubble Sort
![Bubble Sort Demo](screenshots/bubble-sort.png)

## 🛠️ Technologies Used

- **React** 18.x
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **JavaScript ES6+**

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/algorithm-visualizer.git
cd algorithm-visualizer
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Open your browser**
Navigate to `http://localhost:3000`

## 📁 Project Structure
```
algorithm-visualizer/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── AlgorithmVisualizer.jsx
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
├── tailwind.config.js
├── README.md
└── .gitignore
```

## 🎮 How to Use

1. **Select an Algorithm** - Click on any algorithm tab (Linear, Binary, Bubble, Selection, Insertion)
2. **Set Parameters** - For searches, enter a target value; for sorts, use the default or generate random arrays
3. **Start Visualization** - Click the "Start" button to begin
4. **Control Playback** - Use Pause/Resume to control speed, Reset to start over
5. **Watch & Learn** - Observe the color-coded steps and read the step-by-step log

## 🎨 Color Legend

- 🟡 **Yellow** - Currently comparing/checking
- 🟢 **Green** - Found/Sorted
- 🔴 **Red** - Already checked (Linear Search)
- 🔵 **Blue/Purple** - Unchecked elements
- ⚪ **Gray** - Eliminated (Binary Search)

## 📚 Algorithm Complexity

| Algorithm | Time Complexity | Space | Best For |
|-----------|----------------|-------|----------|
| Linear Search | O(n) | O(1) | Unsorted data |
| Binary Search | O(log n) | O(1) | Sorted data |
| Bubble Sort | O(n²) | O(1) | Small datasets |
| Selection Sort | O(n²) | O(1) | Minimal swaps |
| Insertion Sort | O(n²) | O(1) | Nearly sorted |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Future Enhancements

- [ ] Quick Sort visualization
- [ ] Merge Sort visualization
- [ ] Heap Sort visualization
- [ ] Speed control slider
- [ ] Sound effects
- [ ] Dark/Light theme toggle
- [ ] Code snippets display
- [ ] Export animation as GIF

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Inspired by VisuAlgo and Algorithm Visualizer
- Built with React and Tailwind CSS
- Icons by Lucide React

## ⭐ Show Your Support

Give a ⭐️ if this project helped you learn algorithms!

---

**Made with ❤️ and React**