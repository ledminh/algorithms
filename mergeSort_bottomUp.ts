function sortArray(nums: number[]): number[] {
  const aux = Array(nums.length);

  for (let sz = 1; sz < nums.length; sz += sz) {
    // merge each pair of sub-arrays of size sz

    for (let i = 0; i < nums.length - sz; i += 2 * sz) {
      merge(
        nums,
        aux,
        i,
        i + sz - 1,
        Math.min(i + 2 * sz - 1, nums.length - 1)
      );
    }
  }

  return nums;
}

function merge(
  a: number[],
  aux: number[],
  lo: number,
  mid: number,
  hi: number
) {
  for (let i = lo; i <= hi; i++) {
    aux[i] = a[i];
  }

  let pLo = lo,
    pHi = mid + 1;

  for (let i = lo; i <= hi; i++) {
    if (pLo > mid) a[i] = aux[pHi++];
    else if (pHi > hi) a[i] = aux[pLo++];
    else if (aux[pLo] < aux[pHi]) a[i] = aux[pLo++];
    else a[i] = aux[pHi++];
  }
}
