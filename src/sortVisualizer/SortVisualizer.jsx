import React, { useState, useEffect, useRef } from 'react';
import './SortVisualizer.css';
import { getQuickSortAnimations } from '../algorithms/QuickSort';
import { getInsertionSortAnimations } from '../algorithms/InsertionSort';
import { getMergeSortAnimations } from '../algorithms/MergeSort';
import { getBubbleSortAnimations } from '../algorithms/BubbleSort';
import { getSelectionSortAnimations } from '../algorithms/SelectionSort';
import { getCountSortAnimations } from '../algorithms/CountSort';
import { getHeapSortAnimations } from '../algorithms/HeapSort';
const ARR_LEN = 150;
const DELAY = 3;
const ACCESSED_COLOUR = 'red';
const SORTED_COLOUR = '#ef18f2';

export default function SortVisualizer(props) {
  const [arr, setArr] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const containerRef = useRef(null);

  useEffect(initialiseArray, []);

  function initialiseArray() {
    if (isSorting) return;
    if (isSorted) resetArrayColour();
    setIsSorted(false);
    const arr = [];
    
      
      for(let i=0;i<ARR_LEN;i++){
        arr.push(Math.floor(Math.random()*(60)+5));
      }
      setArr(arr)
    
  }

  function bubbleSort() {
    const animations =getBubbleSortAnimations(arr);
    animateArrayUpdate(animations)
  }
  function selectionSort(){
    const animations =getSelectionSortAnimations(arr);
    animateArrayUpdate(animations)
  }
  function heapSort(){
    const animations =getHeapSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function mergeSort() {
    const animations = getMergeSortAnimations(arr);
   
    animateArrayUpdate(animations);
  }

  function insertionSort() {
    const animations = getInsertionSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function quickSort() {
    const animations = getQuickSortAnimations(arr);
    animateArrayUpdate(animations);
  }
  function countSort() {
    const animations = getCountSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function animateArrayUpdate(animations) {
    if (isSorting) return;
    setIsSorting(true);
    animations.forEach(([comparison, swapped], index) => {
      setTimeout(() => {
        if (!swapped) {
          if (comparison.length === 2) {
            const [i, j] = comparison;
            animateArrayAccess(i);
            animateArrayAccess(j);
          } else {
            const [i] = comparison;
            animateArrayAccess(i);
          }
        } else {
          setArr((prevArr) => {
            const [k, newValue] = comparison;
            const newArr = [...prevArr];
            newArr[k] = newValue;
            return newArr;
          });
        }
      }, index * DELAY);
    });
    setTimeout(() => {
      animateSortedArray();
    }, animations.length * DELAY);
  }

  function animateArrayAccess(index) {
    const arrayBars = containerRef.current.children;
    const arrayBarStyle = arrayBars[index].style;
    setTimeout(() => {
      arrayBarStyle.backgroundColor = ACCESSED_COLOUR;
    }, DELAY);
    setTimeout(() => {
      arrayBarStyle.backgroundColor = '';
    }, DELAY * 2);
  }

  function animateSortedArray() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arrayBars.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      setTimeout(
        () => (arrayBarStyle.backgroundColor = SORTED_COLOUR),
        i * DELAY,
      );
    }
    setTimeout(() => {
      setIsSorted(true);
      setIsSorting(false);
    }, arrayBars.length * DELAY);
  }

  function resetArrayColour() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arr.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      arrayBarStyle.backgroundColor = '';
    }
  }

  return (
    <div className="visualizer-container">
      <div className="array-container" ref={containerRef}>
        {arr.map((barHeight, index) => (
          <div
            className="array-bar"
            style={{
              height: `${barHeight}vmin`,
              width: `${30 / ARR_LEN}vw`,
            }}
            key={index}
          ></div>
        ))}
      </div>
      <footer className="app-footer">
        <ul>
          <li>
            <button className="app-button" onClick={initialiseArray}>
              Create new array
            </button>
          </li>
          <li>
            <button className="app-button" onClick={mergeSort}>
              Merge sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={insertionSort}>
              Insertion sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={quickSort}>
              Quick sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={bubbleSort}>
              Bubble sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={selectionSort}>
              Selection sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={countSort}>
              Count sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={heapSort}>
              Heap Sort
            </button>
          </li>
        </ul>
      </footer>
    </div>
  );
}


