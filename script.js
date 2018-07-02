function gridCellToggle() {
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

grid = document.getElementById('designGrid');
for (var i = 0; i < 12; i++) {
    for (var j = 0; j < 18; j++) {
        temp = document.createElement('div');
        temp.className = 'gridCell gridCellOff';
        temp.onclick = gridCellToggle;
        grid.appendChild(temp);
    }
}
