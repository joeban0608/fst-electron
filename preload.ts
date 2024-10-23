const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  setTitle: (title: string) => ipcRenderer.send("set-title", title),
});
