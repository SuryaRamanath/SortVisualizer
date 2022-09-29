import { swap } from "./Utility";

export function getHeapSortAnimations(arr) {
  const len = arr.length;
  const animations = [];
  heapSort(arr, len, animations);
  return animations;
}

function heapSort(arr, n, animations) {
  for (var i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, animations);
  }

  for (var k = n - 1; k > 0; k--) {
    animations.push([[0, arr[k]], true]);
    animations.push([[k, arr[0]], true]);

    swap(arr, 0, k);

    heapify(arr, k, 0, animations);
  }
}

function heapify(arr, n, i, animations) {
  var largest = i; // Initialize largest as root
  var l = 2 * i + 1; // left = 2*i + 1
  var r = 2 * i + 2; // right = 2*i + 2

  // If left child is larger than root
  if (l < n && arr[l] > arr[largest]) {
    animations.push([[l, largest], false]);
    animations.push([[l, largest], false]);
    largest = l;
  }

  // If right child is larger than largest so far
  if (r < n && arr[r] > arr[largest]) {
    animations.push([[r, largest], false]);
    animations.push([[r, largest], false]);
    largest = r;
  }

  // If largest is not root
  if (largest !== i) {
    animations.push([[i, arr[largest]], true]);
    animations.push([[largest, arr[i]], true]);

    swap(arr, i, largest);

    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest, animations);
  }
}
