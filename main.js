const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    titleBarStyle: 'hidden',
    frame: false,           // Remove window frame
    transparent: true,      // Make window background transparent
    resizable: true,       
    alwaysOnTop: false,   
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/icon/cat.jpg'),
    ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {})
  });


  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));
  
  // start with widget in center
  const windowWidth = 500;
  const windowHeight = 500;
  mainWindow.setPosition(
    Math.floor((width - windowWidth) / 2),
    Math.floor((height - windowHeight) / 2)
  );
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  ipcMain.on('minimize-window', () => {
    mainWindow.minimize();
  });
  
  ipcMain.on('close-window', () => {
    mainWindow.close();
  });
}

app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
