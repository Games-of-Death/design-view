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

ipcMain.on('save-request', (event, arg) => {
    fs.writeFile(dialog.showSaveDialog(win), JSON.stringify(arg), (err) => { if (err) throw err; });
});
