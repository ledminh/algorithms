/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

function closestNodes(root: TreeNode | null, queries: number[]): number[][] {
  const solution = new Solution(root);

  const ans: number[][] = [];

  for (let i = 0; i < queries.length; i++) {
    ans.push(solution.binarySearch(queries[i]));
  }

  return ans;
}

class Solution {
  private v: number[] = [];

  constructor(node: TreeNode | null) {
    this.printInorder(node);
  }

  private printInorder(node: TreeNode | null): void {
    if (node === null) return;

    this.printInorder(node.left);
    this.v.push(node.val);
    this.printInorder(node.right);
  }

  binarySearch(x: number): [number, number] {
    let min = -1,
      max = -1;
    let low = 0,
      high = this.v.length - 1;

    while (low <= high) {
      let mid: number = low + Math.floor((high - low) / 2);

      if (this.v[mid] === x) return [this.v[mid], this.v[mid]];

      if (this.v[mid] < x) {
        low = mid + 1;
        min = this.v[mid];
      } else {
        high = mid - 1;
        max = this.v[mid];
      }
    }

    return [min, max];
  }
}
