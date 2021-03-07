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
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

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

    notifyObservers(updatedState) {
        this.observers.forEach((fn) => {
            if (typeof fn === "function") fn(updatedState);
        });
    }
}

class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = [next];
    }
}

class SkipList extends Observable {
    constructor() {
        super();
        //tail
        this.sentinel = new Node(Number.POSITIVE_INFINITY, null);
        //head
        this.header = new Node(Number.NEGATIVE_INFINITY, this.sentinel);
    }

    insert(numberToInsert) {
        let lastNodesInPrevLevels = [];
        let currentNode = this.header;
        // Start at highest level
        let currentLevel = currentNode.next.length - 1;

        while (currentNode.next[currentLevel] !== null) {
            //check if insertion value >= currentNode value & < next node value
            if (numberToInsert > currentNode.value) {
                if (numberToInsert < currentNode.next[currentLevel].value) {
                    if (currentLevel === 0) {
                        const newNode = new Node(
                            numberToInsert,
                            currentNode.next[0]
                        );
                        currentNode.next[0] = newNode;

                        //flip a coin to add levels while switching pointers using the nodes in lastNodesInPrevLevels
                        let i = 1;
                        while (getRandomInt(2) !== 0) {
                            if (i > lastNodesInPrevLevels.length) {
                                newNode.next[i] = this.sentinel;
                                this.sentinel.next[i] = null;
                                this.header.next[i] = newNode;
                            } 
                            else {
                                let l = lastNodesInPrevLevels.length;
                                newNode.next[i] = lastNodesInPrevLevels[l - i].next[i];
                                lastNodesInPrevLevels[l - i].next[i] = newNode;
                            }
                            i++;
                        }

                        break;
                    } else {
                        lastNodesInPrevLevels.push(currentNode);
                        currentLevel--;
                        continue;
                    }
                } else {
                    currentNode = currentNode.next[currentLevel];
                }
            } else {
                break;
            }
        }
        
        super.notifyObservers(this.header);
    }

    delete(numberToDelete) {
        super.notifyObservers(this.header);
    }

    find(numberToFind) {
        super.notifyObservers(this.header);
    }

    toString() {
        let currentNode = this.header.next[0];
        let skipListAsString = "";

        while (currentNode.next[0] !== null) {
            skipListAsString = skipListAsString.concat(
                `${currentNode.value}, `
            );
            currentNode = currentNode.next[0];
        }

        return skipListAsString
            ? `SkipList: ${skipListAsString}`
            : "The skip list is empty.";
    }

    clear() {
        this.sentinel.next = [null];
        this.header.next = [this.sentinel];
        console.log(this.header)
        super.notifyObservers(this.header);
    }
}

const skipList = new SkipList();
