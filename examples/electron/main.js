const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron');
const path = require('node:path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: true,
      contextIsolation: true,
    },
  });

  // Emulate data loading over IPC with simulated 2s latency
  ipcMain.handle('fetch-dashboard-data', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1800));
    return {
      title: 'Electron Desktop Workspace',
      records: [
        { id: 1, name: 'Local Cache File #1', size: '24 MB' },
        { id: 2, name: 'Local Cache File #2', size: '118 MB' },
      ],
    };
  });

  // Sync OS dark mode changes to renderer
  nativeTheme.on('updated', () => {
    win.webContents.send('os-theme-changed', nativeTheme.shouldUseDarkColors ? 'dark' : 'light');
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);
