document
    .querySelector("#insertButton")
    .addEventListener("click", insertButtonClicked);
document
    .querySelector("#deleteButton")
    .addEventListener("click", deleteButtonClicked);
document
    .querySelector("#findButton")
    .addEventListener("click", findButtonClicked);
document
    .querySelector("#printButton")
    .addEventListener("click", printButtonClicked);
document
    .querySelector("#clearButton")
    .addEventListener("click", clearButtonClicked);

const insertField = document.querySelector("#insert");
const deleteField = document.querySelector("#delete");
const findField = document.querySelector("#find");

const skiplistGraphicDisplay = document.querySelector(
    "#skipListGraphicDisplay"
);
const skiplistTextDisplay = document.querySelector("#skipListTextDisplay");

function insertButtonClicked(c) {
    skipList.insert(insertField.value);
}

function deleteButtonClicked(c) {
    skipList.delete(deleteField.value);
}

function findButtonClicked(c) {
    skipList.find(findField.value);
}

function printButtonClicked(c) {
    write(skipList.toString());
}

function clearButtonClicked(c) {
    skipList.clear();
}

skipList.subscribe(drawSkipList);

function drawSkipList(updatedSkiplist) {
    let currentNode = updatedSkiplist;

    while (currentNode.down != null) {
        currentNode = currentNode.down;
        while (currentNode.right != this.tail) {
            drawNode();
            skiplistGraphicDisplay.appendChild();
            currentNode = currentNode.right;
        }
    }

    drawNode();
}

function drawNode(){
    let newNode = document.createElement("div");
    let newNodeContent = document.createTextNode(2);
    newNode.appendChild(newNodeContent);
    newNode.setAttribute("class", "node");
    skiplistGraphicDisplay.appendChild(newNode);
}

function write(skiplist) {
    skiplistTextDisplay.innerText = skiplist;
}
