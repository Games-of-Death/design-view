function toggleGridCell() {
    counter = document.getElementById('weightCounter');
    weight = Number(counter.textContent);
    if (this.classList.contains('gridCellOff')) {
        this.className = 'gridCell gridCellOn';
        counter.textContent = ++weight;
    } else {
        this.className = 'gridCell gridCellOff';
        counter.textContent = --weight;
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
        temp.className = 'gridCell gridCellOff';
        temp.onclick = toggleGridCell;
        grid.appendChild(temp);
    }
}

buttons = document.getElementsByTagName('button');
for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = styleClickedButton;
}
