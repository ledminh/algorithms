function sortArray(nums: number[]): number[] {
  shuffleArray(nums);
  sort(nums, 0, nums.length - 1);

  return nums;
}

function shuffleArray(nums: number[]) {
  for (let i = nums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    swap(nums, i, j);
  }
}

function sort(nums: number[], lo: number, hi: number) {
  if (hi <= lo) return;

  const pivotI = partition(nums, lo, hi);

  sort(nums, lo, pivotI - 1);

  sort(nums, pivotI + 1, hi);
}

function partition(a: number[], lo: number, hi: number) {
  let leftP = lo,
    rightP = hi + 1;

  const pivotP = lo;

  while (true) {
    while (a[++leftP] < a[pivotP]) if (leftP === hi) break;

    while (a[--rightP] > a[pivotP]) if (rightP === lo) break;

    if (leftP >= rightP) break;

    swap(a, leftP, rightP);
  }

  swap(a, pivotP, rightP);

  return rightP;
}

function swap(nums: number[], i: number, j: number): void {
  const temp = nums[i];

  nums[i] = nums[j];

  nums[j] = temp;
}
