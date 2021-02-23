document.querySelector("#insertButton").addEventListener('click', insertButtonClicked);
document.querySelector("#deleteButton").addEventListener('click', deleteButtonClicked);
document.querySelector("#findButton").addEventListener('click', findButtonClicked);
document.querySelector("#printButton").addEventListener('click', printButtonClicked);
document.querySelector("#clearButton").addEventListener('click', clearButtonClicked);

function insertButtonClicked(c){
}

function deleteButtonClicked(c){
}

function findButtonClicked(c){
}

function printButtonClicked(c){
    const skiplist = new SkipList();
    skiplist.print();
}

function clearButtonClicked(c){
}