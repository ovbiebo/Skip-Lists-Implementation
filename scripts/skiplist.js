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
        const { isFound, lastNodesInPrevLevels } = this.find(numberToInsert);

        if (!isFound) {
            const newNode = new Node(
                numberToInsert,
                lastNodesInPrevLevels[0].next[0]
            );
            lastNodesInPrevLevels[0].next[0] = newNode;

            //flip a coin to add levels while switching pointers using the nodes in lastNodesInPrevLevels
            let i = 1;
            while (getRandomInt(2) !== 0) {
                if (i > this.header.next.length - 1) {
                    newNode.next[i] = this.sentinel;
                    this.sentinel.next[i] = null;
                    this.header.next[i] = newNode;
                } else {
                    newNode.next[i] = lastNodesInPrevLevels[i].next[i];
                    lastNodesInPrevLevels[i].next[i] = newNode;
                }
                i++;
            }
        }

        super.notifyObservers(this.header);
    }

    delete(numberToDelete) {
        const { isFound, lastNodesInPrevLevels, foundNode } = this.find(
            numberToDelete
        );

        if (isFound) {
            foundNode.next.map((node, index) => {
                lastNodesInPrevLevels[index].next[index] = node;
            });
        }

        super.notifyObservers(this.header);
    }

    find(numberToFind) {
        let currentNode = this.header;
        let currentLevel = currentNode.next.length - 1; // Start at highest level
        let isFound = false;
        let lastNodesInPrevLevels = [];

        while (currentNode.next[currentLevel]) {
            if (numberToFind < currentNode.next[currentLevel].value) {
                lastNodesInPrevLevels.unshift(currentNode);
                if (currentLevel > 0) {
                    currentLevel--;
                } else {
                    //is not found
                    return { isFound, lastNodesInPrevLevels };
                }
            } else if (numberToFind > currentNode.next[currentLevel].value) {
                currentNode = currentNode.next[currentLevel];
            } else if (numberToFind == currentNode.next[currentLevel].value) {
                isFound = true;
                lastNodesInPrevLevels.unshift(currentNode);
                currentLevel--;
            } else {
                return { isFound: false, lastNodesInPrevLevels };
            }
        }

        //is found
        return {
            isFound,
            lastNodesInPrevLevels,
            foundNode: currentNode.next[0],
        };
    }

    clear() {
        this.sentinel.next = [null];
        this.header.next = [this.sentinel];
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
}

const skipList = new SkipList();
