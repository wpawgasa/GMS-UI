import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

const log = require('electron-log');
const autoUpdater = require('electron-updater').autoUpdater;
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('Application is starting...');
autoUpdater.autoDownload = false;
autoUpdater.on('checking-for-update', () => {
  win.webContents.send('checkingUpdate');
});
autoUpdater.on('update-available', (info) => {
  win.webContents.send('updateAvailable', info);
});
autoUpdater.on('update-not-available', (info) => {
  win.webContents.send('updateNotAvailable', info);
});
autoUpdater.on('error', (error) => {
  win.webContents.send('updateError', error);
});
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = 'Download speed: ' + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')';
  win.webContents.send('downloadProgress', progressObj);
});
autoUpdater.on('update-downloaded', (info) => {
  win.webContents.send('updateDownloaded', info);
});

ipcMain.on('downloadUpdate', (event, arg) => {
  autoUpdater.downloadUpdate();
});
ipcMain.on('cancelUpdate', (event, arg) => {
  autoUpdater.downloadUpdate(arg);
});
ipcMain.on('quitAndInstall', (event, arg) => {
  autoUpdater.quitAndInstall();
});

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    minHeight: 300,
    frame: false,
    icon: path.join(__dirname, 'src/apleaf.256x256.png')
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    // win.loadURL(url.format({
    //   protocol: 'file:',
    //   pathname: path.join(__dirname, 'src/index.html'),
    //   slashes:  true
    // }));
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

}


try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', function() {
    createWindow();
    setInterval(() => {
      autoUpdater.checkForUpdates();
    }, 3600000);
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
