import { app, BrowserWindow } from 'electron' // eslint-disable-line
// const { ipcMain } = require('electron')
// 文件保存位置
const fs = require('fs');
const path = require('path');
const hitbdata = path.format({ dir: 'C:\\hitbdata' });
if (!fs.existsSync(hitbdata)) { fs.mkdirSync(hitbdata) }
const hitbdataSystem = path.format({ dir: 'C:\\hitbdata\\system' });
if (!fs.existsSync(hitbdataSystem)) { fs.mkdirSync(hitbdataSystem) }
const hitbdataLoaded = path.format({ dir: 'C:\\hitbdata\\loaded' });
if (!fs.existsSync(hitbdataLoaded)) { fs.mkdirSync(hitbdataLoaded) }
const hitbdataCompare = path.format({ dir: 'C:\\hitbdata\\compare' });
if (!fs.existsSync(hitbdataCompare)) { fs.mkdirSync(hitbdataCompare) }
const hitbdataUser = path.format({ dir: 'C:\\hitbdata\\user' });
if (!fs.existsSync(hitbdataUser)) { fs.mkdirSync(hitbdataUser) }

// todo:'electron' should be listed in the project's dependencies, not devDependencies
// ipcMain.on('asynchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.sender.send('asynchronous-reply', 'pong')
// })
// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.returnValue = 'pong'
// })

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    autoHideMenuBar: true,
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.maximize();

  mainWindow.webContents.send('starting', 'whoooooooh!')
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
