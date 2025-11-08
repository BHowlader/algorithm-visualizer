import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Shuffle } from 'lucide-react';

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
  
  // Sorting states
  const [sortingArray, setSortingArray] = useState([64, 34, 25, 12, 22, 11, 90, 88]);
  const [comparing, setComparing] = useState([-1, -1]);
  const [sorted, setSorted] = useState([]);
  const [swaps, setSwaps] = useState(0);
  const [sortComplete, setSortComplete] = useState(false);

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
  };

  const linearSearchStep = () => {
    if (currentIndex < array1D.length - 1 && !found) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setComparisons(prev => prev + 1);
      setSteps(prev => [...prev, `Step ${comparisons + 1}: Checking index ${nextIndex} → value = ${array1D[nextIndex]}`]);
      
      if (array1D[nextIndex] === target) {
        setFound(true);
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
      setSteps(prev => [...prev, `Step ${comparisons + 1}: Middle index = ${newMid}, value = ${sortedArray[newMid]}`]);

      if (sortedArray[newMid] === target) {
        setFound(true);
        setSteps(prev => [...prev, `✓ SUCCESS! Found ${target} at index ${newMid} after ${comparisons + 1} comparisons`]);
        setIsRunning(false);
      } else if (sortedArray[newMid] < target) {
        setSteps(prev => [...prev, `   ${sortedArray[newMid]} < ${target} → Search RIGHT half [${newMid + 1}, ${right}]`]);
        setLeft(newMid + 1);
      } else {
        setSteps(prev => [...prev, `   ${sortedArray[newMid]} > ${target} → Search LEFT half [${left}, ${newMid - 1}]`]);
        setRight(newMid - 1);
      }
    } else if (!found) {
      setSteps(prev => [...prev, `✗ FAILED: ${target} not found after ${comparisons} comparisons`]);
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
        
        if (arr[bubbleJ] > arr[bubbleJ + 1]) {
          [arr[bubbleJ], arr[bubbleJ + 1]] = [arr[bubbleJ + 1], arr[bubbleJ]];
          setSwaps(prev => prev + 1);
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
      setSteps(prev => [...prev, `✓ Sorting Complete! ${swaps} swaps, ${comparisons} comparisons`]);
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
        
        if (arr[selectionJ] < arr[minIdx]) {
          setMinIdx(selectionJ);
        }
        setSelectionJ(selectionJ + 1);
      } else {
        if (minIdx !== selectionI) {
          [arr[selectionI], arr[minIdx]] = [arr[minIdx], arr[selectionI]];
          setSwaps(prev => prev + 1);
          setSteps(prev => [...prev, `Swap: Position ${selectionI} ↔ Position ${minIdx}`]);
          setSortingArray(arr);
        }
        setSorted(prev => [...prev, selectionI]);
        setSelectionI(selectionI + 1);
        setSelectionJ(selectionI + 1);
      }
    } else {
      setSorted(Array.from({length: n}, (_, i) => i));
      setSortComplete(true);
      setSteps(prev => [...prev, `✓ Sorting Complete! ${swaps} swaps, ${comparisons} comparisons`]);
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
        arr[insertionJ + 1] = arr[insertionJ];
        setSortingArray(arr);
        setInsertionJ(insertionJ - 1);
      } else {
        arr[insertionJ + 1] = key;
        setSortingArray(arr);
        setSwaps(prev => prev + 1);
        setSteps(prev => [...prev, `Insert ${key} at position ${insertionJ + 1}`]);
        setSorted(Array.from({length: insertionI + 1}, (_, i) => i));
        setInsertionI(insertionI + 1);
        setInsertionJ(0);
      }
    } else {
      setSorted(Array.from({length: n}, (_, i) => i));
      setSortComplete(true);
      setSteps(prev => [...prev, `✓ Sorting Complete! ${swaps} operations, ${comparisons} comparisons`]);
      setIsRunning(false);
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
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isRunning, currentIndex, left, right, bubbleI, bubbleJ, selectionI, selectionJ, insertionI, insertionJ]);

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
      }
    }
    setIsRunning(true);
  };

  const generateRandomArray = () => {
    const newArray = Array.from({length: 8}, () => Math.floor(Math.random() * 90) + 10);
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

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-xl shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          🔍 Algorithm Visualizer
        </h1>
        <p className="text-purple-200">Search & Sort Algorithms - Step by Step</p>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-6">
        {[
          {key: 'linear', label: '📊 Linear', color: 'purple'},
          {key: 'binary', label: '⚡ Binary', color: 'cyan'},
          {key: 'bubble', label: '🫧 Bubble', color: 'blue'},
          {key: 'selection', label: '🎯 Selection', color: 'green'},
          {key: 'insertion', label: '📥 Insertion', color: 'orange'}
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setIsRunning(false);
            }}
            className={`px-4 py-3 font-bold text-sm transition-all rounded-lg ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Linear Search */}
      {activeTab === 'linear' && (
        <div className="bg-slate-800 p-6 rounded-xl shadow-xl border border-purple-500/30">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Linear Search</h2>
              <p className="text-purple-300">Sequential search - O(n)</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-400">{comparisons}</div>
              <div className="text-sm text-slate-400">Comparisons</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-2 font-semibold text-white">Target:</label>
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
                className="border-2 border-purple-500 bg-slate-700 text-white rounded-lg px-4 py-2 w-full"
                disabled={isRunning}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={generateRandomArray}
                disabled={isRunning}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-600 w-full flex items-center justify-center gap-2"
              >
                <Shuffle size={18} /> Random
              </button>
            </div>
          </div>

          <div className="bg-slate-900 p-4 rounded-lg mb-6">
            <div className="flex gap-2 flex-wrap justify-center">
              {array1D.map((val, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-xs text-slate-400 mb-1">idx: {idx}</div>
                  <div
                    className={`w-20 h-20 flex items-center justify-center text-xl font-bold rounded-lg transition-all duration-300 ${
                      idx === currentIndex && found
                        ? 'bg-green-500 text-white scale-110 shadow-xl'
                        : idx === currentIndex
                        ? 'bg-yellow-400 text-black scale-110 shadow-xl animate-pulse'
                        : idx < currentIndex
                        ? 'bg-red-400 text-white opacity-50'
                        : 'bg-purple-600 text-white'
                    }`}
                  >
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button onClick={handleStart} disabled={isRunning} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-600 flex items-center gap-2 font-semibold flex-1">
              <Play size={20} /> Start
            </button>
            <button onClick={() => setIsRunning(!isRunning)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-semibold flex-1">
              {isRunning ? <><Pause size={20} /> Pause</> : <><Play size={20} /> Resume</>}
            </button>
            <button onClick={resetLinearSearch} className="bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 flex items-center gap-2 font-semibold flex-1">
              <RotateCcw size={20} /> Reset
            </button>
          </div>

          <div className="bg-slate-900 p-4 rounded-lg border border-purple-500/30">
            <h3 className="font-bold mb-3 text-white text-lg">📝 Steps:</h3>
            <div className="max-h-48 overflow-y-auto space-y-1">
              {steps.length === 0 ? (
                <div className="text-slate-400 text-sm">Click "Start" to begin...</div>
              ) : (
                steps.map((step, idx) => (
                  <div key={idx} className={`text-sm p-2 rounded ${
                    step.includes('SUCCESS') ? 'bg-green-900/50 text-green-300 font-bold' :
                    step.includes('FAILED') ? 'bg-red-900/50 text-red-300 font-bold' :
                    'bg-slate-800 text-slate-300'
                  }`}>{step}</div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Binary Search */}
      {activeTab === 'binary' && (
        <div className="bg-slate-800 p-6 rounded-xl shadow-xl border border-purple-500/30">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Binary Search</h2>
              <p className="text-cyan-300">Divide & conquer - O(log n)</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-400">{comparisons}</div>
              <div className="text-sm text-slate-400">Comparisons</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-2 font-semibold text-white">Target:</label>
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
                className="border-2 border-cyan-500 bg-slate-700 text-white rounded-lg px-4 py-2 w-full"
                disabled={isRunning}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={generateRandomArray}
                disabled={isRunning}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-600 w-full flex items-center justify-center gap-2"
              >
                <Shuffle size={18} /> Random
              </button>
            </div>
          </div>

          <div className="bg-slate-900 p-4 rounded-lg mb-6">
            <div className="flex gap-2 flex-wrap justify-center">
                {sortedArray.map((val, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-xs text-slate-400 mb-1">idx: {idx}</div>
                  <div
                    className={`w-20 h-20 flex flex-col items-center justify-center text-xl font-bold rounded-lg transition-all duration-300 ${
                      idx === mid && found
                        ? 'bg-green-500 text-white scale-110 shadow-xl'
                        : idx === mid
                        ? 'bg-yellow-400 text-black scale-110 shadow-xl animate-pulse'
                        : idx >= left && idx <= right
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-600 text-slate-400 opacity-40'
                    }`}
                  >
                    {val}
                    {idx === mid && <div className="text-xs mt-1">M</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button onClick={handleStart} disabled={isRunning} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-600 flex items-center gap-2 font-semibold flex-1">
              <Play size={20} /> Start
            </button>
            <button onClick={() => setIsRunning(!isRunning)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-semibold flex-1">
              {isRunning ? <><Pause size={20} /> Pause</> : <><Play size={20} /> Resume</>}
            </button>
            <button onClick={resetBinarySearch} className="bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 flex items-center gap-2 font-semibold flex-1">
              <RotateCcw size={20} /> Reset
            </button>
          </div>

          <div className="bg-slate-900 p-4 rounded-lg border border-cyan-500/30">
            <h3 className="font-bold mb-3 text-white text-lg">📝 Steps:</h3>
            <div className="max-h-48 overflow-y-auto space-y-1">
              {steps.length === 0 ? (
                <div className="text-slate-400 text-sm">Click "Start" to begin...</div>
              ) : (
                steps.map((step, idx) => (
                  <div key={idx} className={`text-sm p-2 rounded ${
                    step.includes('SUCCESS') ? 'bg-green-900/50 text-green-300 font-bold' :
                    step.includes('FAILED') ? 'bg-red-900/50 text-red-300 font-bold' :
                    'bg-slate-800 text-slate-300'
                  }`}>{step}</div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bubble Sort */}
      {activeTab === 'bubble' && (
        <div className="bg-slate-800 p-6 rounded-xl shadow-xl border border-blue-500/30">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Bubble Sort</h2>
              <p className="text-blue-300">Compare adjacent elements - O(n²)</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-400">{swaps}</div>
              <div className="text-sm text-slate-400">Swaps</div>
            </div>
          </div>

          <div className="flex justify-end mb-6">
            <button
              onClick={generateRandomArray}
              disabled={isRunning}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-600 flex items-center gap-2"
            >
              <Shuffle size={18} /> Random Array
            </button>
          </div>

          <div className="bg-slate-900 p-4 rounded-lg mb-6">
            <div className="flex gap-2 flex-wrap justify-center">
              {sortingArray.map((val, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-xs text-slate-400 mb-1">{idx}</div>
                  <div
                    className={`w-20 h-20 flex items-center justify-center text-xl font-bold rounded-lg transition-all duration-300 ${
                      sorted.includes(idx)
                        ? 'bg-green-500 text-white'
                        : comparing.includes(idx)
                        ? 'bg-yellow-400 text-black scale-110 shadow-xl'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button onClick={handleStart} disabled={isRunning} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-600 flex items-center gap-2 font-semibold flex-1">
              <Play size={20} /> Start
            </button>
            <button onClick={() => setIsRunning(!isRunning)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-semibold flex-1">
              {isRunning ? <><Pause size={20} /> Pause</> : <><Play size={20} /> Resume</>}
            </button>
            <button onClick={resetSort} className="bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 flex items-center gap-2 font-semibold flex-1">
              <RotateCcw size={20} /> Reset
            </button>
          </div>

          <div className="bg-slate-900 p-4 rounded-lg border border-blue-500/30">
            <h3 className="font-bold mb-3 text-white text-lg">📝 Steps:</h3>
            <div className="max-h-48 overflow-y-auto space-y-1">
              {steps.length === 0 ? (
                <div className="text-slate-400 text-sm">Click "Start" to begin sorting...</div>
              ) : (
                steps.map((step, idx) => (
                  <div key={idx} className={`text-sm p-2 rounded ${
                    step.includes('Complete') ? 'bg-green-900/50 text-green-300 font-bold' :
                    'bg-slate-800 text-slate-300'
                  }`}>{step}</div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Selection Sort */}
      {activeTab === 'selection' && (
        <div className="bg-slate-800 p-6 rounded-xl shadow-xl border border-green-500/30">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Selection Sort</h2>
              <p className="text-green-300">Find minimum, place at start - O(n²)</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-400">{swaps}</div>
              <div className="text-sm text-slate-400">Swaps</div>
            </div>
          </div>

          <div className="flex justify-end mb-6">
            <button
              onClick={generateRandomArray}
              disabled={isRunning}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-600 flex items-center gap-2"
            >
              <Shuffle size={18} /> Random Array
            </button>
          </div>

          <div className="bg-slate-900 p-4 rounded-lg mb-6">
            <div className="flex gap-2 flex-wrap justify-center">
              {sortingArray.map((val, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-xs text-slate-400 mb-1">{idx}</div>
                  <div
                    className={`w-20 h-20 flex items-center justify-center text-xl font-bold rounded-lg transition-all duration-300 ${
                      sorted.includes(idx)
                        ? 'bg-green-500 text-white'
                        : comparing.includes(idx)
                        ? 'bg-yellow-400 text-black scale-110 shadow-xl'
                        : 'bg-green-600 text-white'
                    }`}
                  >
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button onClick={handleStart} disabled={isRunning} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-600 flex items-center gap-2 font-semibold flex-1">
              <Play size={20} /> Start
            </button>
            <button onClick={() => setIsRunning(!isRunning)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-semibold flex-1">
              {isRunning ? <><Pause size={20} /> Pause</> : <><Play size={20} /> Resume</>}
            </button>
            <button onClick={resetSort} className="bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 flex items-center gap-2 font-semibold flex-1">
              <RotateCcw size={20} /> Reset
            </button>
          </div>

          <div className="bg-slate-900 p-4 rounded-lg border border-green-500/30">
            <h3 className="font-bold mb-3 text-white text-lg">📝 Steps:</h3>
            <div className="max-h-48 overflow-y-auto space-y-1">
              {steps.length === 0 ? (
                <div className="text-slate-400 text-sm">Click "Start" to begin sorting...</div>
              ) : (
                steps.map((step, idx) => (
                  <div key={idx} className={`text-sm p-2 rounded ${
                    step.includes('Complete') ? 'bg-green-900/50 text-green-300 font-bold' :
                    'bg-slate-800 text-slate-300'
                  }`}>{step}</div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Insertion Sort */}
      {activeTab === 'insertion' && (
        <div className="bg-slate-800 p-6 rounded-xl shadow-xl border border-orange-500/30">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Insertion Sort</h2>
              <p className="text-orange-300">Build sorted array one item at a time - O(n²)</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-400">{swaps}</div>
              <div className="text-sm text-slate-400">Operations</div>
            </div>
          </div>

          <div className="flex justify-end mb-6">
            <button
              onClick={generateRandomArray}
              disabled={isRunning}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:bg-gray-600 flex items-center gap-2"
            >
              <Shuffle size={18} /> Random Array
            </button>
          </div>

          <div className="bg-slate-900 p-4 rounded-lg mb-6">
            <div className="flex gap-2 flex-wrap justify-center">
              {sortingArray.map((val, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-xs text-slate-400 mb-1">{idx}</div>
                  <div
                    className={`w-20 h-20 flex items-center justify-center text-xl font-bold rounded-lg transition-all duration-300 ${
                      sorted.includes(idx)
                        ? 'bg-green-500 text-white'
                        : comparing.includes(idx)
                        ? 'bg-yellow-400 text-black scale-110 shadow-xl'
                        : 'bg-orange-600 text-white'
                    }`}
                  >
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button onClick={handleStart} disabled={isRunning} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-600 flex items-center gap-2 font-semibold flex-1">
              <Play size={20} /> Start
            </button>
            <button onClick={() => setIsRunning(!isRunning)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-semibold flex-1">
              {isRunning ? <><Pause size={20} /> Pause</> : <><Play size={20} /> Resume</>}
            </button>
            <button onClick={resetSort} className="bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 flex items-center gap-2 font-semibold flex-1">
              <RotateCcw size={20} /> Reset
            </button>
          </div>

          <div className="bg-slate-900 p-4 rounded-lg border border-orange-500/30">
            <h3 className="font-bold mb-3 text-white text-lg">📝 Steps:</h3>
            <div className="max-h-48 overflow-y-auto space-y-1">
              {steps.length === 0 ? (
                <div className="text-slate-400 text-sm">Click "Start" to begin sorting...</div>
              ) : (
                steps.map((step, idx) => (
                  <div key={idx} className={`text-sm p-2 rounded ${
                    step.includes('Complete') ? 'bg-green-900/50 text-green-300 font-bold' :
                    'bg-slate-800 text-slate-300'
                  }`}>{step}</div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 bg-slate-800/50 p-4 rounded-lg border border-purple-500/20">
        <h3 className="text-white font-bold mb-3">💡 Algorithm Comparison:</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          <div className="bg-slate-900 p-3 rounded">
            <div className="text-purple-300 font-semibold mb-1">Linear Search</div>
            <div className="text-slate-400">O(n) time</div>
            <div className="text-slate-400">Unsorted OK</div>
          </div>
          <div className="bg-slate-900 p-3 rounded">
            <div className="text-cyan-300 font-semibold mb-1">Binary Search</div>
            <div className="text-slate-400">O(log n) time</div>
            <div className="text-slate-400">Needs sorted</div>
          </div>
          <div className="bg-slate-900 p-3 rounded">
            <div className="text-blue-300 font-semibold mb-1">Bubble Sort</div>
            <div className="text-slate-400">O(n²) time</div>
            <div className="text-slate-400">Simple & stable</div>
          </div>
          <div className="bg-slate-900 p-3 rounded">
            <div className="text-green-300 font-semibold mb-1">Selection Sort</div>
            <div className="text-slate-400">O(n²) time</div>
            <div className="text-slate-400">Min swaps</div>
          </div>
          <div className="bg-slate-900 p-3 rounded">
            <div className="text-orange-300 font-semibold mb-1">Insertion Sort</div>
            <div className="text-slate-400">O(n²) time</div>
            <div className="text-slate-400">Good for small</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;