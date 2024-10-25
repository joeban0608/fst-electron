const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  changeTitle: (title) => ipcRenderer.send("change-title", title),
});
