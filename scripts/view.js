document.querySelector("#insert").addEventListener("submit", insertSubmitted);
document.querySelector("#delete").addEventListener("submit", deleteSubmitted);
document.querySelector("#find").addEventListener("submit", findSubmitted);
document
    .querySelector("#printButton")
    .addEventListener("click", printButtonClicked);
document
    .querySelector("#clearButton")
    .addEventListener("click", clearButtonClicked);

const skiplistGraphicDisplay = document.querySelector(
    "#skipListGraphicDisplay"
);
const skiplistTextDisplay = document.querySelector("#skipListTextDisplay");

function insertSubmitted(c) {
    c.preventDefault();
    skipList.insert(Number.parseFloat(c.target.insert.value));
}

function deleteSubmitted(c) {
    c.preventDefault();
    skipList.delete(Number.parseFloat(c.target.delete.value));
}

function findSubmitted(c) {
    c.preventDefault();
    const { isFound } = skipList.find(Number.parseFloat(c.target.find.value));
    write(
        `${c.target.find.value} ${
            isFound ? "is in the skiplist" : "is NOT in the skiplist"
        }`
    );
}

function printButtonClicked(c) {
    write(skipList.toString());
}

function clearButtonClicked(c) {
    skipList.clear();
}

skipList.subscribe(renderSkipList);

function renderSkipList(updatedSkiplist) {
    skiplistGraphicDisplay.innerHTML = "";
    let pointers = document.createElement("div");
    pointers.setAttribute("class", "lines");
    skiplistGraphicDisplay.appendChild(pointers);

    let currentNode = updatedSkiplist;

    while (currentNode != null) {
        skiplistGraphicDisplay.appendChild(drawNode(currentNode));
        currentNode = currentNode.next[0];
    }

    for (e = 0; e < updatedSkiplist.next.length; e++) {
        pointers.appendChild(document.createElement("hr"));
    }

    write("");
}

function drawNode(node) {
    //creates node div
    let newNode = document.createElement("div");
    newNode.setAttribute("class", "node");

    //creates value div inside node div
    let value = document.createElement("div");
    value.setAttribute("class", "value");
    value.appendChild(document.createTextNode(node.value));
    newNode.appendChild(value);

    //creates levels div inside node div
    let levels = document.createElement("div");
    newNode.appendChild(levels);

    //creates individual level divs inside levels div
    node.next.map((next, index) => {
        let level = document.createElement("div");
        level.setAttribute("class", "level");
        levels.appendChild(level);
    });

    return newNode;
}

function write(content) {
    skiplistTextDisplay.innerText = content;
}

renderSkipList(skipList.header);
