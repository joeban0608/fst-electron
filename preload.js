const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  showContextMenu: () => ipcRenderer.send("show-context-menu"),
  onUpdateCounter: (callback) => ipcRenderer.on("update-counter", (event, command) => callback(command)),
});
