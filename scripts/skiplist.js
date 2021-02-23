// Things to think about
// How to determine the max level of the skip list - user should input or random number between  1-5
// How to

// TODO
// for insertion
// Get head node
// check if insertion value is greate or less than current node
// if it's less move to next
//      if next is null move down
//
// if next is null move down
//

class Observable {
    constructor() {
        this.observers = [];
    }

    subscribe(fnToAdd) {
        this.observers.push(fnToAdd);
    }

    unsubscribe(fnToRemove) {
        this.observers = this.observers.filter((fn) => {
            if (fn != fnToRemove) return fn;
        });
    }

    fire(updatedState) {
        this.observers.forEach((fn) => {
            if (typeof fn === "function") fn(updatedState);
        });
    }
}

class Node {
    constructor(value, next = null, down = null) {
        this.value = value;
        this.next = next;
        this.down = down;
    }
}

class SkipList extends Observable {
    constructor(head) {
        super();
        this.head = new Node(Number.NEGATIVE_INFINITY, null, null);
        this.tail = new Node(Number.POSITIVE_INFINITY, null, null);
    }

    insert(numberToInsert) {
        super.fire(this.head);
    }

    delete(numberToDelete) {
        super.fire(this.head);
    }

    find(numberToFind) {
        super.fire(this.head);
    }

    toString() {
        let currentNode = this.head;
        let skipListAsString = "";

        while (currentNode.down != null) {
            currentNode = currentNode.down;
            while (currentNode.right != this.tail) {
                skipListAsString.concat(`${currentNode.element} `);
                currentNode = currentNode.right;
            }
        }

        return skipListAsString ? `SkipList: ${skipListAsString}` : "";
    }

    clear() {
        this.head.right = this.tail;
        this.head.down = null;
        super.fire(this.head);
    }
}

const skipList = new SkipList(null);