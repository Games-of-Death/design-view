function toggleGridCell() {
    counter = document.getElementById('weightCounter');
    weight = Number(counter.textContent);
    if (this.classList.contains('gridCellOn')) {
        this.classList.remove('gridCellOn');
        counter.textContent = --weight;
    } else {
        this.classList.add('gridCellOn');
        counter.textContent = ++weight;
    }
}

function styleClickedButton() {
    this.className = 'clickedButton';
    window.setTimeout(function (sender) { sender.className = ''; }, 85, this);
}

grid = document.getElementById('designGrid');
for (var i = 0; i < 12; i++) {
    for (var j = 0; j < 18; j++) {
        temp = document.createElement('div');
        temp.className = 'gridCell';
        temp.setAttribute('data-row', i);
        temp.setAttribute('data-col', j);
        temp.onclick = toggleGridCell;
        grid.appendChild(temp);
    }
}

buttons = document.getElementsByTagName('button');
for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = styleClickedButton;
}

clearButton = document.getElementById('clearButton');
clearButton.onclick = function () {
    cells = [].slice.call(document.getElementsByClassName('gridCellOn'));
    for (var i = 0; i < cells.length; i++) {
        cells[i].classList.remove('gridCellOn');
    }
    document.getElementById('weightCounter').textContent = '0';
}
