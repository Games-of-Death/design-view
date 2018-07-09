const {ipcRenderer} = require('electron');

function toggleGridCell() {
    var counter = document.getElementById('weightCounter');
    var weight = Number(counter.textContent);
    if (this.classList.contains('gridCellOn')) {
        this.classList.remove('gridCellOn');
        counter.textContent = --weight;
    } else {
        this.classList.add('gridCellOn');
        counter.textContent = ++weight;
    }
}

function styleClickedButton(button) {
    button.classList.add('clickedButton');
    window.setTimeout((button) => { button.classList.remove('clickedButton'); }, 85, button);
}

var grid = document.getElementById('designGrid');
for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 18; j++) {
        let temp = document.createElement('div');
        temp.className = 'gridCell';
        temp.setAttribute('id', i + '-' + j);
        temp.onclick = toggleGridCell;
        grid.appendChild(temp);
    }
}

// TODO Add call to styleClickedButton() in each html onclick

function clearGrid() {
    var cells = [].slice.call(document.getElementsByClassName('gridCellOn'));
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove('gridCellOn');
    }
    document.getElementById('weightCounter').textContent = '0';
}

function saveShape() {
    shapeCells = [];
    for (var i = 0; i < 12; i++) {
        shapeCells.push([]);
        for (var j = 0; j < 18; j++) {
            shapeCells[i].push(document.getElementById(i + '-' + j).classList.contains('gridCellOn') ? 1 : 0);
        }
    }
    shape = {
        'cells': shapeCells,
        'name': 'unTitLEd'
    };
    ipcRenderer.sendSync('save-request', shape);
}
