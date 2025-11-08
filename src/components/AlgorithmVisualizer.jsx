import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Shuffle, Settings, Moon, Sun, Code, Volume2, VolumeX, Info, Keyboard } from 'lucide-react';

const AlgorithmVisualizer = () => {
  const [activeTab, setActiveTab] = useState('linear');
  const [array1D, setArray1D] = useState([12, 45, 23, 67, 34, 89, 56, 78]);
  const [sortedArray, setSortedArray] = useState([12, 23, 34, 45, 56, 67, 78, 89]);
  const [sortArray, setSortArray] = useState([64, 34, 25, 12, 22, 11, 90, 88]);
  const [target, setTarget] = useState(67);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(7);
  const [mid, setMid] = useState(-1);
  const [found, setFound] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState([]);
  const [comparisons, setComparisons] = useState(0);
  
  // New Features State
  const [speed, setSpeed] = useState(800);
  const [arraySize, setArraySize] = useState(8);
  const [darkMode, setDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Sorting states
  const [sortingArray, setSortingArray] = useState([64, 34, 25, 12, 22, 11, 90, 88]);
  const [comparing, setComparing] = useState([-1, -1]);
  const [sorted, setSorted] = useState([]);
  const [swaps, setSwaps] = useState(0);
  const [sortComplete, setSortComplete] = useState(false);

  // Quick Sort states
  const [quickStack, setQuickStack] = useState([]);
  const [pivot, setPivot] = useState(-1);

  // Merge Sort states
  const [mergeAux, setMergeAux] = useState([]);
  const [mergeStack, setMergeStack] = useState([]);

  // Heap Sort states
  const [heapSize, setHeapSize] = useState(0);

  const resetLinearSearch = () => {
    setCurrentIndex(-1);
    setFound(false);
    setIsRunning(false);
    setSteps([]);
    setComparisons(0);
  };

  const resetBinarySearch = () => {
    setLeft(0);
    setRight(sortedArray.length - 1);
    setMid(-1);
    setFound(false);
    setIsRunning(false);
    setSteps([]);
    setComparisons(0);
  };

  const resetSort = () => {
    setSortingArray([...sortArray]);
    setComparing([-1, -1]);
    setSorted([]);
    setSwaps(0);
    setComparisons(0);
    setIsRunning(false);
    setSteps([]);
    setSortComplete(false);
    setPivot(-1);
    setQuickStack([]);
    setMergeStack([]);
    setMergeAux([]);
    setHeapSize(0);
  };

  // Sound effects
  const playSound = (type) => {
    if (!soundEnabled) return;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'compare') {
      oscillator.frequency.value = 400;
      gainNode.gain.value = 0.1;
    } else if (type === 'swap') {
      oscillator.frequency.value = 600;
      gainNode.gain.value = 0.15;
    } else if (type === 'found') {
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.2;
    }
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const linearSearchStep = () => {
    if (currentIndex < array1D.length - 1 && !found) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setComparisons(prev => prev + 1);
      playSound('compare');
      setSteps(prev => [...prev, `Step ${comparisons + 1}: Checking index ${nextIndex} → value = ${array1D[nextIndex]}`]);
      
      if (array1D[nextIndex] === target) {
        setFound(true);
        playSound('found');
        setSteps(prev => [...prev, `✓ SUCCESS! Found ${target} at index ${nextIndex} after ${comparisons + 1} comparisons`]);
        setIsRunning(false);
      }
    } else if (!found && currentIndex >= array1D.length - 1) {
      setSteps(prev => [...prev, `✗ FAILED: ${target} not found after checking all ${array1D.length} elements`]);
      setIsRunning(false);
    }
  };

  const binarySearchStep = () => {
    if (left <= right && !found) {
      const newMid = Math.floor((left + right) / 2);
      setMid(newMid);
      setComparisons(prev => prev + 1);
      playSound('compare');
      setSteps(prev => [...prev, `Step ${comparisons + 1}: Middle index = ${newMid}, value = ${sortedArray[newMid]}`]);

      if (sortedArray[newMid] === target) {
        setFound(true);
        playSound('found');
        setSteps(prev => [...prev, `✓ SUCCESS! Found ${target} at index ${newMid} after ${comparisons + 1} comparisons`]);
        setIsRunning(false);
      } else if (sortedArray[newMid] < target) {
        setSteps(prev => [...prev, `   ${sortedArray[newMid]} < ${target} → Search RIGHT half`]);
        setLeft(newMid + 1);
      } else {
        setSteps(prev => [...prev, `   ${sortedArray[newMid]} > ${target} → Search LEFT half`]);
        setRight(newMid - 1);
      }
    } else if (!found) {
      setSteps(prev => [...prev, `✗ FAILED: ${target} not found`]);
      setIsRunning(false);
    }
  };

  // Bubble Sort
  const [bubbleI, setBubbleI] = useState(0);
  const [bubbleJ, setBubbleJ] = useState(0);

  const bubbleSortStep = () => {
    const arr = [...sortingArray];
    const n = arr.length;

    if (bubbleI < n - 1) {
      if (bubbleJ < n - bubbleI - 1) {
        setComparing([bubbleJ, bubbleJ + 1]);
        setComparisons(prev => prev + 1);
        playSound('compare');
        
        if (arr[bubbleJ] > arr[bubbleJ + 1]) {
          [arr[bubbleJ], arr[bubbleJ + 1]] = [arr[bubbleJ + 1], arr[bubbleJ]];
          setSwaps(prev => prev + 1);
          playSound('swap');
          setSteps(prev => [...prev, `Swap: ${arr[bubbleJ + 1]} ↔ ${arr[bubbleJ]}`]);
          setSortingArray(arr);
        }
        setBubbleJ(bubbleJ + 1);
      } else {
        setSorted(prev => [...prev, n - bubbleI - 1]);
        setBubbleJ(0);
        setBubbleI(bubbleI + 1);
      }
    } else {
      setSorted(Array.from({length: n}, (_, i) => i));
      setSortComplete(true);
      playSound('found');
      setSteps(prev => [...prev, `✓ Complete! ${swaps} swaps, ${comparisons} comparisons`]);
      setIsRunning(false);
    }
  };

  // Selection Sort
  const [selectionI, setSelectionI] = useState(0);
  const [selectionJ, setSelectionJ] = useState(0);
  const [minIdx, setMinIdx] = useState(0);

  const selectionSortStep = () => {
    const arr = [...sortingArray];
    const n = arr.length;

    if (selectionI < n - 1) {
      if (selectionJ === selectionI) {
        setMinIdx(selectionI);
        setSelectionJ(selectionI + 1);
      } else if (selectionJ < n) {
        setComparing([minIdx, selectionJ]);
        setComparisons(prev => prev + 1);
        playSound('compare');
        
        if (arr[selectionJ] < arr[minIdx]) {
          setMinIdx(selectionJ);
        }
        setSelectionJ(selectionJ + 1);
      } else {
        if (minIdx !== selectionI) {
          [arr[selectionI], arr[minIdx]] = [arr[minIdx], arr[selectionI]];
          setSwaps(prev => prev + 1);
          playSound('swap');
          setSteps(prev => [...prev, `Swap: Position ${selectionI} ↔ ${minIdx}`]);
          setSortingArray(arr);
        }
        setSorted(prev => [...prev, selectionI]);
        setSelectionI(selectionI + 1);
        setSelectionJ(selectionI + 1);
      }
    } else {
      setSorted(Array.from({length: n}, (_, i) => i));
      setSortComplete(true);
      playSound('found');
      setSteps(prev => [...prev, `✓ Complete! ${swaps} swaps, ${comparisons} comparisons`]);
      setIsRunning(false);
    }
  };

  // Insertion Sort
  const [insertionI, setInsertionI] = useState(1);
  const [insertionJ, setInsertionJ] = useState(0);
  const [key, setKey] = useState(null);

  const insertionSortStep = () => {
    const arr = [...sortingArray];
    const n = arr.length;

    if (insertionI < n) {
      if (insertionJ === 0) {
        setKey(arr[insertionI]);
        setInsertionJ(insertionI - 1);
        setComparing([insertionI, -1]);
      } else if (insertionJ >= 0 && arr[insertionJ] > key) {
        setComparing([insertionJ, insertionJ + 1]);
        setComparisons(prev => prev + 1);
        playSound('compare');
        arr[insertionJ + 1] = arr[insertionJ];
        setSortingArray(arr);
        setInsertionJ(insertionJ - 1);
      } else {
        arr[insertionJ + 1] = key;
        setSortingArray(arr);
        setSwaps(prev => prev + 1);
        playSound('swap');
        setSteps(prev => [...prev, `Insert ${key} at position ${insertionJ + 1}`]);
        setSorted(Array.from({length: insertionI + 1}, (_, i) => i));
        setInsertionI(insertionI + 1);
        setInsertionJ(0);
      }
    } else {
      setSorted(Array.from({length: n}, (_, i) => i));
      setSortComplete(true);
      playSound('found');
      setSteps(prev => [...prev, `✓ Complete! ${swaps} operations, ${comparisons} comparisons`]);
      setIsRunning(false);
    }
  };

  // Quick Sort
  const [quickI, setQuickI] = useState(0);
  const [quickLow, setQuickLow] = useState(0);
  const [quickHigh, setQuickHigh] = useState(0);

  const quickSortStep = () => {
    const arr = [...sortingArray];
    
    if (quickStack.length === 0 && quickI === 0) {
      setQuickStack([[0, arr.length - 1]]);
      setQuickI(1);
      return;
    }

    if (quickStack.length > 0) {
      const [low, high] = quickStack[quickStack.length - 1];
      
      if (quickI === 1) {
        setPivot(high);
        setQuickLow(low);
        setQuickHigh(low);
        setQuickI(2);
      } else if (quickI === 2) {
        if (quickHigh < high) {
          setComparing([quickHigh, high]);
          setComparisons(prev => prev + 1);
          playSound('compare');
          
          if (arr[quickHigh] < arr[high]) {
            [arr[quickLow], arr[quickHigh]] = [arr[quickHigh], arr[quickLow]];
            setSwaps(prev => prev + 1);
            playSound('swap');
            setSortingArray(arr);
            setQuickLow(quickLow + 1);
          }
          setQuickHigh(quickHigh + 1);
        } else {
          [arr[quickLow], arr[high]] = [arr[high], arr[quickLow]];
          setSortingArray(arr);
          const newStack = [...quickStack];
          newStack.pop();
          
          if (quickLow - 1 > low) newStack.push([low, quickLow - 1]);
          if (quickLow + 1 < high) newStack.push([quickLow + 1, high]);
          
          setQuickStack(newStack);
          setQuickI(1);
          setSorted(prev => [...prev, quickLow]);
        }
      }
    } else {
      setSorted(Array.from({length: arr.length}, (_, i) => i));
      setSortComplete(true);
      playSound('found');
      setSteps(prev => [...prev, `✓ Quick Sort Complete!`]);
      setIsRunning(false);
    }
  };

  // Merge Sort
  const [mergeStep, setMergeStep] = useState(0);

  const mergeSortStep = () => {
    const arr = [...sortingArray];
    const n = arr.length;

    if (mergeStep === 0) {
      const stack = [];
      for (let size = 1; size < n; size *= 2) {
        for (let start = 0; start < n - 1; start += 2 * size) {
          const mid = Math.min(start + size - 1, n - 1);
          const end = Math.min(start + 2 * size - 1, n - 1);
          if (mid < end) {
            stack.push([start, mid, end]);
          }
        }
      }
      setMergeStack(stack);
      setMergeStep(1);
      return;
    }

    if (mergeStack.length > 0) {
      const [start, mid, end] = mergeStack[0];
      setComparing([start, end]);
      setComparisons(prev => prev + 1);
      playSound('compare');
      
      const left = arr.slice(start, mid + 1);
      const right = arr.slice(mid + 1, end + 1);
      let i = 0, j = 0, k = start;
      
      while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
          arr[k++] = left[i++];
        } else {
          arr[k++] = right[j++];
          setSwaps(prev => prev + 1);
          playSound('swap');
        }
      }
      
      while (i < left.length) arr[k++] = left[i++];
      while (j < right.length) arr[k++] = right[j++];
      
      setSortingArray(arr);
      setMergeStack(mergeStack.slice(1));
      
      for (let i = start; i <= end; i++) {
        if (!sorted.includes(i)) {
          setSorted(prev => [...prev, i]);
        }
      }
    } else {
      setSorted(Array.from({length: n}, (_, i) => i));
      setSortComplete(true);
      playSound('found');
      setSteps(prev => [...prev, `✓ Merge Sort Complete!`]);
      setIsRunning(false);
    }
  };

  // Heap Sort
  const [heapStep, setHeapStep] = useState(0);
  const [heapI, setHeapI] = useState(0);

  const heapify = (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      return { arr, swapped: true, positions: [i, largest] };
    }
    return { arr, swapped: false, positions: [] };
  };

  const heapSortStep = () => {
    const arr = [...sortingArray];
    const n = arr.length;

    if (heapStep === 0) {
      setHeapSize(n);
      setHeapI(Math.floor(n / 2) - 1);
      setHeapStep(1);
      return;
    }

    if (heapStep === 1) {
      if (heapI >= 0) {
        const result = heapify(arr, heapSize, heapI);
        setComparing(result.positions);
        setComparisons(prev => prev + 1);
        playSound('compare');
        
        if (result.swapped) {
          setSwaps(prev => prev + 1);
          playSound('swap');
          setSortingArray(result.arr);
        }
        setHeapI(heapI - 1);
      } else {
        setHeapStep(2);
        setHeapI(n - 1);
      }
    } else if (heapStep === 2) {
      if (heapI > 0) {
        [arr[0], arr[heapI]] = [arr[heapI], arr[0]];
        setSortingArray(arr);
        setSwaps(prev => prev + 1);
        playSound('swap');
        setSorted(prev => [...prev, heapI]);
        
        const newSize = heapI;
        const result = heapify(arr, newSize, 0);
        setSortingArray(result.arr);
        setHeapSize(newSize);
        setHeapI(heapI - 1);
      } else {
        setSorted(Array.from({length: n}, (_, i) => i));
        setSortComplete(true);
        playSound('found');
        setSteps(prev => [...prev, `✓ Heap Sort Complete!`]);
        setIsRunning(false);
      }
    }
  };

  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => {
        if (activeTab === 'linear') linearSearchStep();
        else if (activeTab === 'binary') binarySearchStep();
        else if (activeTab === 'bubble') bubbleSortStep();
        else if (activeTab === 'selection') selectionSortStep();
        else if (activeTab === 'insertion') insertionSortStep();
        else if (activeTab === 'quick') quickSortStep();
        else if (activeTab === 'merge') mergeSortStep();
        else if (activeTab === 'heap') heapSortStep();
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [isRunning, currentIndex, left, right, bubbleI, bubbleJ, selectionI, selectionJ, insertionI, insertionJ, quickI, quickStack, mergeStack, heapStep, heapI, speed]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        setIsRunning(prev => !prev);
      } else if (e.key === 'r' || e.key === 'R') {
        handleStart();
      } else if (e.key === 's' || e.key === 'S') {
        setShowSettings(prev => !prev);
      } else if (e.key === 'c' || e.key === 'C') {
        setShowCode(prev => !prev);
      } else if (e.key === 'h' || e.key === 'H') {
        setShowHelp(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleStart = () => {
    if (activeTab === 'linear') {
      resetLinearSearch();
    } else if (activeTab === 'binary') {
      resetBinarySearch();
    } else {
      resetSort();
      if (activeTab === 'bubble') {
        setBubbleI(0);
        setBubbleJ(0);
      } else if (activeTab === 'selection') {
        setSelectionI(0);
        setSelectionJ(0);
      } else if (activeTab === 'insertion') {
        setInsertionI(1);
        setInsertionJ(0);
      } else if (activeTab === 'quick') {
        setQuickI(0);
        setQuickStack([]);
      } else if (activeTab === 'merge') {
        setMergeStep(0);
        setMergeStack([]);
      } else if (activeTab === 'heap') {
        setHeapStep(0);
        setHeapI(0);
      }
    }
    setIsRunning(true);
  };

  const generateRandomArray = () => {
    const newArray = Array.from({length: arraySize}, () => Math.floor(Math.random() * 90) + 10);
    if (activeTab === 'linear') {
      setArray1D(newArray);
      resetLinearSearch();
    } else if (activeTab === 'binary') {
      setSortedArray([...newArray].sort((a, b) => a - b));
      resetBinarySearch();
    } else {
      setSortArray(newArray);
      resetSort();
    }
  };

  const getCodeSnippet = () => {
    const codes = {
      linear: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Found at index i
    }
  }
  return -1; // Not found
}`,
      binary: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
      bubble: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
      selection: `function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
      insertion: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i], j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
      quick: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    let pivot = partition(arr, low, high);
    quickSort(arr, low, pivot - 1);
    quickSort(arr, pivot + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  let pivot = arr[high], i = low;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[high]] = [arr[high], arr[i]];
  return i;
}`,
      merge: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  let result = [], i = 0, j = 0;
  while (i < left.length && j < right.length) {
    result.push(left[i] < right[j] ? left[i++] : right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
      heap: `function heapSort(arr) {
  const n = arr.length;
  
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`
    };
    return codes[activeTab] || '';
  };

  const bgColor = darkMode ? 'from-slate-900 via-purple-900 to-slate-900' : 'from-gray-100 via-blue-100 to-gray-100';
  const cardBg = darkMode ? 'bg-slate-800' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const secondaryText = darkMode ? 'text-slate-400' : 'text-gray-600';

  return (
    <div className={`w-full min-h-screen bg-gradient-to-br ${bgColor} p-4 md:p-6 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        {/* Header with Controls */}
        <div className="text-center mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-slate-700 text-white' : 'bg-gray-200 text-gray-900'} hover:opacity-80`}
                title="Settings (S)"
              >
                <Settings size={20} />
              </button>
              <button
                onClick={() => setShowCode(!showCode)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-slate-700 text-white' : 'bg-gray-200 text-gray-900'} hover:opacity-80`}
                title="Show Code (C)"
              >
                <Code size={20} />
              </button>
              <button
                onClick={() => setShowHelp(!showHelp)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-slate-700 text-white' : 'bg-gray-200 text-gray-900'} hover:opacity-80`}
                title="Help (H)"
              >
                <Info size={20} />
              </button>
            </div>
            
            <h1 className={`text-2xl md:text-4xl font-bold ${textColor}`}>
              🔍 Algorithm Visualizer
            </h1>
            
            <div className="flex gap-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-slate-700 text-white' : 'bg-gray-200 text-gray-900'} hover:opacity-80`}
                title="Toggle Sound"
              >
                {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-slate-700 text-white' : 'bg-gray-200 text-gray-900'} hover:opacity-80`}
                title="Toggle Theme"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
          <p className={secondaryText}>Interactive Algorithm Learning Platform</p>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className={`${cardBg} p-4 md:p-6 rounded-xl shadow-xl mb-6 border ${darkMode ? 'border-purple-500/30' : 'border-blue-300'}`}>
            <h3 className={`text-xl font-bold ${textColor} mb-4`}>⚙️ Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block mb-2 font-semibold ${textColor}`}>
                  Speed: {speed}ms ({speed < 400 ? 'Fast' : speed < 800 ? 'Medium' : 'Slow'})
                </label>
                <input
                  type="range"
                  min="200"
                  max="2000"
                  step="200"
                  value={speed}
                  onChange={(e) => setSpeed(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className={`block mb-2 font-semibold ${textColor}`}>
                  Array Size: {arraySize}
                </label>
                <input
                  type="range"
                  min="5"
                  max="15"
                  step="1"
                  value={arraySize}
                  onChange={(e) => {
                    setArraySize(parseInt(e.target.value));
                    generateRandomArray();
                  }}
                  className="w-full"
                  disabled={isRunning}
                />
              </div>
            </div>
          </div>
        )}

        {/* Help Panel */}
        {showHelp && (
          <div className={`${cardBg} p-4 md:p-6 rounded-xl shadow-xl mb-6 border ${darkMode ? 'border-purple-500/30' : 'border-blue-300'}`}>
            <h3 className={`text-xl font-bold ${textColor} mb-4 flex items-center gap-2`}>
              <Keyboard size={20} /> Keyboard Shortcuts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={secondaryText}>
                <div className="mb-2"><kbd className={`px-2 py-1 rounded ${darkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>Space</kbd> - Play/Pause</div>
                <div className="mb-2"><kbd className={`px-2 py-1 rounded ${darkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>R</kbd> - Reset</div>
                <div className="mb-2"><kbd className={`px-2 py-1 rounded ${darkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>S</kbd> - Toggle Settings</div>
              </div>
              <div className={secondaryText}>
                <div className="mb-2"><kbd className={`px-2 py-1 rounded ${darkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>C</kbd> - Toggle Code</div>
                <div className="mb-2"><kbd className={`px-2 py-1 rounded ${darkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>H</kbd> - Toggle Help</div>
              </div>
            </div>
            <div className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-blue-50'}`}>
              <h4 className={`font-bold ${textColor} mb-2`}>📚 How to Use:</h4>
              <ul className={`list-disc list-inside space-y-1 ${secondaryText}`}>
                <li>Select an algorithm from the tabs below</li>
                <li>Click Start to begin visualization</li>
                <li>Use Pause/Resume to control playback</li>
                <li>Adjust speed and array size in Settings</li>
                <li>Enable sound for audio feedback</li>
              </ul>
            </div>
          </div>
        )}

        {/* Code Display */}
        {showCode && (
          <div className={`${cardBg} p-4 md:p-6 rounded-xl shadow-xl mb-6 border ${darkMode ? 'border-purple-500/30' : 'border-blue-300'}`}>
            <h3 className={`text-xl font-bold ${textColor} mb-4`}>💻 Code Implementation</h3>
            <pre className={`${darkMode ? 'bg-slate-900' : 'bg-gray-100'} p-4 rounded-lg overflow-x-auto text-sm`}>
              <code className={darkMode ? 'text-green-400' : 'text-green-700'}>{getCodeSnippet()}</code>
            </pre>
          </div>
        )}

        {/* Algorithm Tabs */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-6">
          {[
            {key: 'linear', label: '📊 Linear', short: 'Linear'},
            {key: 'binary', label: '⚡ Binary', short: 'Binary'},
            {key: 'bubble', label: '🫧 Bubble', short: 'Bubble'},
            {key: 'selection', label: '🎯 Selection', short: 'Select'},
            {key: 'insertion', label: '📥 Insert', short: 'Insert'},
            {key: 'quick', label: '⚡ Quick', short: 'Quick'},
            {key: 'merge', label: '🔀 Merge', short: 'Merge'},
            {key: 'heap', label: '🌳 Heap', short: 'Heap'}
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setIsRunning(false);
              }}
              className={`px-3 py-2 md:px-4 md:py-3 font-bold text-xs md:text-sm transition-all rounded-lg ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : `${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-white text-gray-700'} hover:opacity-80`
              }`}
            >
              <span className="hidden md:inline">{tab.label}</span>
              <span className="md:hidden">{tab.short}</span>
            </button>
          ))}
        </div>

        {/* Main Visualization Area */}
        <div className={`${cardBg} p-4 md:p-6 rounded-xl shadow-xl border ${darkMode ? 'border-purple-500/30' : 'border-blue-300'}`}>
          {/* Algorithm Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className={`text-2xl md:text-3xl font-bold ${textColor} mb-2`}>
                {activeTab === 'linear' && 'Linear Search'}
                {activeTab === 'binary' && 'Binary Search'}
                {activeTab === 'bubble' && 'Bubble Sort'}
                {activeTab === 'selection' && 'Selection Sort'}
                {activeTab === 'insertion' && 'Insertion Sort'}
                {activeTab === 'quick' && 'Quick Sort'}
                {activeTab === 'merge' && 'Merge Sort'}
                {activeTab === 'heap' && 'Heap Sort'}
              </h2>
              <p className={secondaryText}>
                {(activeTab === 'linear' || activeTab === 'binary') ? 
                  `Time: O(${activeTab === 'linear' ? 'n' : 'log n'})` :
                  `Time: O(${activeTab === 'quick' || activeTab === 'merge' || activeTab === 'heap' ? 'n log n' : 'n²'})`
                }
              </p>
            </div>
            <div className="text-right">
              <div className="text-xl md:text-2xl font-bold text-yellow-400">
                {(activeTab === 'linear' || activeTab === 'binary') ? comparisons : swaps}
              </div>
              <div className={`text-xs md:text-sm ${secondaryText}`}>
                {(activeTab === 'linear' || activeTab === 'binary') ? 'Comparisons' : 'Swaps'}
              </div>
            </div>
          </div>

          {/* Input Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {(activeTab === 'linear' || activeTab === 'binary') && (
              <div>
                <label className={`block mb-2 font-semibold ${textColor}`}>Target Value:</label>
                <input
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
                  className={`border-2 ${darkMode ? 'border-purple-500 bg-slate-700 text-white' : 'border-blue-500 bg-white text-gray-900'} rounded-lg px-4 py-2 w-full`}
                  disabled={isRunning}
                />
              </div>
            )}
            <div className="flex items-end">
              <button
                onClick={generateRandomArray}
                disabled={isRunning}
                className={`${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white px-4 py-2 rounded-lg hover:opacity-80 disabled:bg-gray-600 w-full flex items-center justify-center gap-2`}
              >
                <Shuffle size={18} /> Random Array
              </button>
            </div>
          </div>

          {/* Array Visualization */}
          <div className={`${darkMode ? 'bg-slate-900' : 'bg-gray-50'} p-4 rounded-lg mb-6 overflow-x-auto`}>
            <div className="flex gap-2 flex-wrap justify-center min-w-max">
              {(activeTab === 'linear' ? array1D : activeTab === 'binary' ? sortedArray : sortingArray).map((val, idx) => (
                <div key={idx} className="text-center">
                  <div className={`text-xs ${secondaryText} mb-1`}>{idx}</div>
                  <div
                    className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-lg md:text-xl font-bold rounded-lg transition-all duration-300 ${
                      // Search highlighting
                      (activeTab === 'linear' && idx === currentIndex && found) ? 'bg-green-500 text-white scale-110 shadow-xl' :
                      (activeTab === 'linear' && idx === currentIndex) ? 'bg-yellow-400 text-black scale-110 shadow-xl animate-pulse' :
                      (activeTab === 'linear' && idx < currentIndex) ? 'bg-red-400 text-white opacity-50' :
                      (activeTab === 'binary' && idx === mid && found) ? 'bg-green-500 text-white scale-110 shadow-xl' :
                      (activeTab === 'binary' && idx === mid) ? 'bg-yellow-400 text-black scale-110 shadow-xl animate-pulse' :
                      (activeTab === 'binary' && idx >= left && idx <= right) ? 'bg-cyan-600 text-white' :
                      (activeTab === 'binary') ? 'bg-slate-600 text-slate-400 opacity-40' :
                      // Sort highlighting
                      sorted.includes(idx) ? 'bg-green-500 text-white' :
                      comparing.includes(idx) ? 'bg-yellow-400 text-black scale-110 shadow-xl' :
                      pivot === idx ? 'bg-orange-500 text-white scale-110 shadow-xl' :
                      (activeTab === 'linear') ? 'bg-purple-600 text-white' :
                      (activeTab === 'binary') ? 'bg-cyan-600 text-white' :
                      (activeTab === 'bubble') ? 'bg-blue-600 text-white' :
                      (activeTab === 'selection') ? 'bg-green-600 text-white' :
                      (activeTab === 'insertion') ? 'bg-orange-600 text-white' :
                      (activeTab === 'quick') ? 'bg-red-600 text-white' :
                      (activeTab === 'merge') ? 'bg-purple-600 text-white' :
                      'bg-pink-600 text-white'
                    }`}
                  >
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={handleStart}
              disabled={isRunning}
              className="bg-green-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-600 flex items-center gap-2 font-semibold flex-1 md:flex-initial justify-center"
            >
              <Play size={20} /> Start
            </button>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-semibold flex-1 md:flex-initial justify-center"
            >
              {isRunning ? <><Pause size={20} /> Pause</> : <><Play size={20} /> Resume</>}
            </button>
            <button
              onClick={() => {
                if (activeTab === 'linear') resetLinearSearch();
                else if (activeTab === 'binary') resetBinarySearch();
                else resetSort();
              }}
              className={`${darkMode ? 'bg-slate-600' : 'bg-gray-600'} text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:opacity-80 flex items-center gap-2 font-semibold flex-1 md:flex-initial justify-center`}
            >
              <RotateCcw size={20} /> Reset
            </button>
          </div>

          {/* Steps Log */}
          <div className={`${darkMode ? 'bg-slate-900' : 'bg-gray-50'} p-4 rounded-lg border ${darkMode ? 'border-purple-500/30' : 'border-blue-300'}`}>
            <h3 className={`font-bold mb-3 ${textColor} text-lg`}>📝 Execution Steps:</h3>
            <div className="max-h-48 overflow-y-auto space-y-1">
              {steps.length === 0 ? (
                <div className={`${secondaryText} text-sm`}>Click "Start" to begin visualization...</div>
              ) : (
                steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`text-sm p-2 rounded ${
                      step.includes('SUCCESS') || step.includes('Complete') ? `${darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'} font-bold` :
                      step.includes('FAILED') ? `${darkMode ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-800'} font-bold` :
                      `${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-white text-gray-700'}`
                    }`}
                  >
                    {step}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Algorithm Comparison Table */}
        <div className={`mt-6 ${cardBg} p-4 md:p-6 rounded-lg border ${darkMode ? 'border-purple-500/20' : 'border-blue-200'}`}>
          <h3 className={`${textColor} font-bold mb-3 text-lg`}>💡 Algorithm Complexity Comparison:</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={darkMode ? 'bg-slate-700' : 'bg-gray-200'}>
                  <th className={`p-2 text-left ${textColor}`}>Algorithm</th>
                  <th className={`p-2 text-left ${textColor}`}>Best</th>
                  <th className={`p-2 text-left ${textColor}`}>Average</th>
                  <th className={`p-2 text-left ${textColor}`}>Worst</th>
                  <th className={`p-2 text-left ${textColor}`}>Space</th>
                  <th className={`p-2 text-left ${textColor}`}>Stable</th>
                </tr>
              </thead>
              <tbody className={secondaryText}>
                <tr className={darkMode ? 'bg-slate-800/50' : 'bg-gray-50'}>
                  <td className="p-2 font-semibold">Bubble Sort</td>
                  <td className="p-2">O(n)</td>
                  <td className="p-2">O(n²)</td>
                  <td className="p-2">O(n²)</td>
                  <td className="p-2">O(1)</td>
                  <td className="p-2">✓ Yes</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Selection Sort</td>
                  <td className="p-2">O(n²)</td>
                  <td className="p-2">O(n²)</td>
                  <td className="p-2">O(n²)</td>
                  <td className="p-2">O(1)</td>
                  <td className="p-2">✗ No</td>
                </tr>
                <tr className={darkMode ? 'bg-slate-800/50' : 'bg-gray-50'}>
                  <td className="p-2 font-semibold">Insertion Sort</td>
                  <td className="p-2">O(n)</td>
                  <td className="p-2">O(n²)</td>
                  <td className="p-2">O(n²)</td>
                  <td className="p-2">O(1)</td>
                  <td className="p-2">✓ Yes</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Quick Sort</td>
                  <td className="p-2">O(n log n)</td>
                  <td className="p-2">O(n log n)</td>
                  <td className="p-2">O(n²)</td>
                  <td className="p-2">O(log n)</td>
                  <td className="p-2">✗ No</td>
                </tr>
                <tr className={darkMode ? 'bg-slate-800/50' : 'bg-gray-50'}>
                  <td className="p-2 font-semibold">Merge Sort</td>
                  <td className="p-2">O(n log n)</td>
                  <td className="p-2">O(n log n)</td>
                  <td className="p-2">O(n log n)</td>
                  <td className="p-2">O(n)</td>
                  <td className="p-2">✓ Yes</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Heap Sort</td>
                  <td className="p-2">O(n log n)</td>
                  <td className="p-2">O(n log n)</td>
                  <td className="p-2">O(n log n)</td>
                  <td className="p-2">O(1)</td>
                  <td className="p-2">✗ No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center mt-8 pb-6 border-t ${darkMode ? 'border-slate-700' : 'border-gray-300'} pt-6`}>
          <p className={`${secondaryText} text-sm mb-2`}>
            Made with ❤️ using React & Tailwind CSS | Press <kbd className={`px-2 py-1 rounded ${darkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>H</kbd> for help
          </p>
          <div className={`flex items-center justify-center gap-2 ${textColor} font-semibold`}>
            <span>Developed by</span>
            <a 
              href="https://bhowlader.github.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-bold"
            >
              Bibek Howlader
            </a>
          </div>
          <a 
            href="https://bhowlader.github.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-block mt-2 text-xs ${secondaryText} hover:text-purple-400 transition-colors duration-300`}
          >
          </a>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;