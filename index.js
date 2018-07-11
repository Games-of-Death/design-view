const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const fs = require('fs');

let win;

function createWindow () {
    win = new BrowserWindow({width: 780, height: 444, useContentSize: true, autoHideMenuBar: true, resizable: false});
    win.loadFile('index.html');
    win.on('closed', () => {
      win = null;
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});
app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
});

ipcMain.on('save-request', (event, shape) => {
    if (!('savePath' in shape)) {
        let options = {
            'filters': [{'name': 'Shape files', 'extensions': ['shp']}],
            'defaultPath': app.getPath('home')
        };
        shape['savePath'] = dialog.showSaveDialog(win, options);
    }
    fs.writeFile(shape['savePath'], JSON.stringify(shape), (err) => { if (err) throw err; });
    event.returnValue = shape['savePath'];
});

ipcMain.on('attach-request', (event, currentCode) => {
    if (currentCode !== null) {
        let options = {
            'type': 'info',
            'buttons': ['Cancel', 'Replace'],
            'title': 'Code already attached',
            'message': 'This shape already has code attached to it. Do you want to replace it with different code?'
        }
        if (dialog.showMessageBox(win, options) === 0) {
            event.returnValue = currentCode;
            return;
        }
    }
    let options = {
        'filters': [{'name': 'Python code', 'extensions': ['py']}],
        'defaultPath': app.getPath('home')
    };
    let selected = dialog.showOpenDialog(win, options);
    event.returnValue = selected ? selected[0] : null;
});
