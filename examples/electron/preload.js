const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  fetchDashboardData: () => ipcRenderer.invoke('fetch-dashboard-data'),
  onThemeChanged: (callback) => ipcRenderer.on('os-theme-changed', (_e, theme) => callback(theme)),
});
