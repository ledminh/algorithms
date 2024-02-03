// Implementation of a HashSet data structure
class HashSet<T extends string | number | symbol> {
  private hash: Record<T, boolean>; // Hash table to store the elements
  private size: number; // Number of elements in the set

  constructor() {
    this.hash = {} as Record<T, boolean>; // Initialize an empty hash table
    this.size = 0; // Initialize the size to 0
  }

  // Add an element to the set if it doesn't already exist
  add(value: T): void {
    if (!this.contains(value)) {
      this.hash[value] = true; // Add the element to the hash table
      this.size++; // Increment the size
    }
  }

  // Remove an element from the set if it exists
  remove(value: T): void {
    if (this.contains(value)) {
      delete this.hash[value]; // Remove the element from the hash table
      this.size--; // Decrement the size
    }
  }

  // Check if an element exists in the set
  contains(value: T): boolean {
    return Object.prototype.hasOwnProperty.call(this.hash, value);
  }

  // Get the number of elements in the set
  getSize(): number {
    return this.size;
  }

  // Check if the set is empty
  isEmpty(): boolean {
    return this.size === 0;
  }

  // Clear the set by resetting the hash table and size
  clear(): void {
    this.hash = {} as Record<T, boolean>;
    this.size = 0;
  }
}

// Implementation of a Min Heap Priority Queue data structure
class MinHeapPQ<T> {
  private heap: T[]; // Array to store the elements of the heap

  constructor() {
    this.heap = []; // Initialize an empty heap
  }

  // Get the index of the parent node of a given index
  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  // Get the index of the left child node of a given index
  private getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  // Get the index of the right child node of a given index
  private getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  // Swap two elements in the heap
  private swap(index1: number, index2: number): void {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  // Get the minimum element in the heap without removing it
  peek(): T | undefined {
    if (this.heap.length === 0) {
      throw new Error("Heap is empty");
    }
    return this.heap[0];
  }

  // Insert an element into the heap
  insert(value: T): void {
    this.heap.push(value); // Add the element to the end of the heap
    let currentIndex = this.heap.length - 1;
    let parentIndex = this.getParentIndex(currentIndex);
    while (
      currentIndex > 0 &&
      this.heap[currentIndex] < this.heap[parentIndex]
    ) {
      this.swap(currentIndex, parentIndex); // Swap the element with its parent if it is smaller
      currentIndex = parentIndex;
      parentIndex = this.getParentIndex(currentIndex);
    }
  }

  // Remove and return the minimum element from the heap
  popMin(): T | undefined {
    if (this.heap.length === 0) {
      throw new Error("Heap is empty");
    }
    const min = this.heap[0]; // Store the minimum element
    const last = this.heap.pop(); // Remove the last element from the heap
    if (this.heap.length > 0 && last !== undefined) {
      this.heap[0] = last; // Replace the root with the last element
      let currentIndex = 0;
      let leftChildIndex = this.getLeftChildIndex(currentIndex);
      let rightChildIndex = this.getRightChildIndex(currentIndex);
      while (
        (leftChildIndex < this.heap.length &&
          this.heap[leftChildIndex] < this.heap[currentIndex]) ||
        (rightChildIndex < this.heap.length &&
          this.heap[rightChildIndex] < this.heap[currentIndex])
      ) {
        const smallerChildIndex =
          rightChildIndex >= this.heap.length ||
          this.heap[leftChildIndex] < this.heap[rightChildIndex]
            ? leftChildIndex
            : rightChildIndex;

        this.swap(currentIndex, smallerChildIndex); // Swap the element with its smaller child
        currentIndex = smallerChildIndex;
        leftChildIndex = this.getLeftChildIndex(currentIndex);
        rightChildIndex = this.getRightChildIndex(currentIndex);
      }
    }
    return min;
  }

  // Get the number of elements in the heap
  size(): number {
    return this.heap.length;
  }

  // Check if the heap is empty
  isEmpty(): boolean {
    return this.heap.length === 0;
  }
}

// Implementation of a Smallest Infinite Set using HashSet and MinHeapPQ
class SmallestInfiniteSet {
  private isPresent: HashSet<number>; // HashSet to store the added integers
  private addedIntegers: MinHeapPQ<number>; // MinHeapPQ to store the added integers in sorted order
  private currentInteger: number; // Current integer to be added to the set

  constructor() {
    this.isPresent = new HashSet<number>(); // Initialize an empty HashSet
    this.addedIntegers = new MinHeapPQ<number>(); // Initialize an empty MinHeapPQ
    this.currentInteger = 1; // Start with the smallest integer
  }

  // Remove and return the smallest integer from the set
  popSmallest(): number {
    let answer: number;
    if (!this.addedIntegers.isEmpty()) {
      const minValue = this.addedIntegers.popMin(); // Get the smallest integer from the MinHeapPQ
      if (minValue !== undefined) {
        answer = minValue;
        this.isPresent.remove(answer); // Remove the integer from the HashSet
      } else {
        throw new Error("Unexpected undefined value popped from MinHeap");
      }
    } else {
      answer = this.currentInteger; // If no integers are added, return the current integer
      this.currentInteger += 1; // Increment the current integer for the next pop
    }
    return answer;
  }

  // Add an integer to the set if it is smaller than the current integer and not already present
  addBack(num: number): void {
    if (this.currentInteger <= num || this.isPresent.contains(num)) {
      return; // Ignore if the integer is not smaller or already present
    }
    this.addedIntegers.insert(num); // Add the integer to the MinHeapPQ
    this.isPresent.add(num); // Add the integer to the HashSet
  }
}

// The overall process of the code is to implement a Smallest Infinite Set,
// which maintains a set of integers in sorted order.
// The set supports adding integers and removing the smallest integer.
// The implementation uses a HashSet to keep track of the added integers,
// and a MinHeapPQ to store the added integers in sorted order.
// The current smallest integer is also maintained separately.
// When adding an integer, it is checked if it is smaller than the current integer
// and not already present in the set. If so, it is added to the MinHeapPQ and HashSet.
// When removing the smallest integer, it is popped from the MinHeapPQ,
// and if it is present in the HashSet, it is removed.
// If no integers are added, the current integer is returned.
