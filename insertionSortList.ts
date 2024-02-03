class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val ?? 0;
    this.next = next ?? null;
  }
}

function insertionSortList(head: ListNode | null): ListNode | null {
  let pos = head;
  const dummy = new ListNode();

  while (pos !== null) {
    const curNode = pos;
    let newPrevPos = dummy;

    while (newPrevPos.next !== null && newPrevPos.next.val <= curNode.val) {
      newPrevPos = newPrevPos.next;
    }

    pos = pos.next;

    curNode.next = newPrevPos.next;
    newPrevPos.next = curNode;
  }

  return dummy.next;
}
