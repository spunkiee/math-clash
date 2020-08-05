const rowSize = 8;
const colSize = 8;

const cells = [];
var currentSum = 0;
let target;
let score = 0;

function addCells() {
    const arr = [];
    for (let i = 0; i < colSize; i++) {
        arr.push({selected: false, number: Math.ceil(Math.random()*9)}); //Pushing an object rather than an element
    }
    cells.unshift(arr); //Pushes Array at top
}

var id = setInterval(() => {
    if(cells.length === rowSize){
        //alert('Game Over');
        clearInterval(id);
        return;
    }
    
    addCells();

    render();

}, 10000);

function render() {
    for (let i = 0; i < cells.length; i++) {
        for(let j=0; j<cells[i].length; j++){

            const el = document.getElementById('cell' + i + j);
            el.innerText = cells[i][j].number;

            if(cells[i][j].number !== '') {
                el.classList.add('filled-cell');
            }else if (el.classList.contains('filled-cell')){
                el.classList.remove('filled-cell');
            }
            

            if(cells[i][j].selected){
                el.classList.add('selected');
            }else if(el.classList.contains('selected')){
                el.classList.remove('selected');
            }
        }
    }
}

function initBoard() {
    const board = document.getElementById('board');

    for (let i=0; i<rowSize; i++){
        let rowEl = document.createElement('div');
        rowEl.classList.add('row');

        for(let j=0; j<colSize; j++){
            const el = document.createElement('div');
            el.setAttribute('id', 'cell' + i + j);
            el.classList.add('cell');
            el.addEventListener('click',(event) => handleClick(event, i, j, el));
            rowEl.appendChild(el);
        }
        board.appendChild(rowEl);
    }
}

initBoard();
initTarget();
initCurrentSum();
initScore();

addCells();
render();

function initTarget() {
    target = 5 + Math.ceil(Math.random() * 20);
    document.getElementById('target').innerText = target;
}

function initCurrentSum() {
    document.getElementById('currentSum').innerText = currentSum;
}

function initScore() {
    document.getElementById('score').innerText = 'Score: ' + score;
}

function handleClick(event, i, j, el) {
    if (i>=cells.length || j>=cells[i].length){
        return;
    }

    cells[i][j].selected = !cells[i][j].selected;

    if(cells[i][j].selected){
        currentSum += cells[i][j].number;
    } else {
        currentSum -= cells[i][j].number;
    }

    if(currentSum > target){
        deselectAllSelected();
        currentSum = 0;
    }

    if(currentSum === target){
        const numOfElementsRemoved = removeSelectedElementsFromList();
        score += numOfElementsRemoved;
        currentSum = 0;
        initScore();
        initTarget();
    }

    initCurrentSum();

    render();
}

function deselectAllSelected() {
    for(let i=0; i<cells.length; i++){
        for(let j=0; j<cells[i].length; j++){
            if(cells[i][j].selected === true){
                cells[i][j].selected = false;
            }
        }
    }
}

function removeSelectedElementsFromList() {
    let count = 0;
    for(let i=0; i<cells.length; i++){
        for(let j=0; j<cells[i].length; j++){
            if(cells[i][j].selected === true){
                count++;
                cells[i][j].number = '';
                cells[i][j].selected = false;
            }
        }
    }
    return count;
}