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

class Node {
    constructor(value, next, down) {
        this.value = value;
        this.next = next;
        this.down = down;
    }
}

class SkipList {
    constructor(head){
        this.head = new Node();
    }

    insert(node) {
        const input = document.querySelector("#insert");
    }

    delete(node) {
        const input = document.querySelector("#delete");
    }

    find(node) {
        const input = document.querySelector("#find");
    }

    print() {
        console.log(this.head)
    }

    clear() {
        this.head = null;
    }
}