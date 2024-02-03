class SmallestInfiniteSet {
  private currentInteger: number;
  private addedIntegers: MinHeapPQ;
  private isPresent: HashSet;

  constructor() {
    this.currentInteger = 1;
    this.addedIntegers = new MinHeapPQ();
    this.isPresent = new HashSet();
  }

  popSmallest(): number {
    if (!this.addedIntegers.isEmpty()) {
      const minVal = this.addedIntegers.popMin();
      this.isPresent.remove(minVal);
      return minVal;
    }

    const curVal = this.currentInteger;
    this.currentInteger++;

    return curVal;
  }

  addBack(num: number): void {
    if (this.currentInteger <= num || this.isPresent.contains(num)) return;

    this.addedIntegers.add(num);
    this.isPresent.add(num);
  }
}

class HashSet {
  private hash: Record<number, boolean>;

  constructor() {
    this.hash = {};
  }

  public add(val: number) {
    this.hash[val] = true;
  }

  public remove(val: number) {
    delete this.hash[val];
  }

  public contains(val: number) {
    return this.hash[val];
  }
}

class MinHeapPQ {
  private heap: number[];

  constructor() {
    this.heap = [];
  }

  public isEmpty(): boolean {
    return this.heap.length === 0;
  }

  public popMin(): number {
    if (this.heap.length === 0) throw new Error("Heap is empty");

    const min = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length == 0 || last === undefined) return min;

    this.heap[0] = last;

    let curIndex = 0;
    let leftChildIndex = this.getLeftChildIndex(curIndex);
    let rightChildIndex = this.getRightChildIndex(curIndex);

    while (
      (leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex] < this.heap[curIndex]) ||
      (rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex] < this.heap[curIndex])
    ) {
      const smallerChildIndex =
        rightChildIndex >= this.heap.length ||
        this.heap[leftChildIndex] < this.heap[rightChildIndex]
          ? leftChildIndex
          : rightChildIndex;

      this.swap(curIndex, smallerChildIndex);

      curIndex = smallerChildIndex;
      leftChildIndex = this.getLeftChildIndex(curIndex);
      rightChildIndex = this.getRightChildIndex(curIndex);
    }

    return min;
  }

  public add(num: number) {
    this.heap.push(num);

    let curIndex = this.heap.length - 1;
    let parentIndex = this.getParentIndex(curIndex);

    while (curIndex > 0 && this.heap[curIndex] < this.heap[parentIndex]) {
      this.swap(curIndex, parentIndex);
      curIndex = parentIndex;
      parentIndex = this.getParentIndex(curIndex);
    }
  }

  private getLeftChildIndex(i: number): number {
    return 2 * i + 1;
  }
  private getRightChildIndex(i: number): number {
    return 2 * i + 2;
  }

  private swap(i1: number, i2: number) {
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
  }

  private getParentIndex(i: number): number {
    return Math.floor((i - 1) / 2);
  }
}
