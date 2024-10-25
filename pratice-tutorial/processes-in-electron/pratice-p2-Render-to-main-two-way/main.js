const { app, BrowserWindow, ipcMain, dialog } = require("electron/main");
const path = require("node:path");

// render 使用 window.electronAPI.openFile() 拿回 handleFileOpen return 的 value (但拿到會是一個 promise)
async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  // return 即是傳 value 至 renderer
  if (!canceled) {
    return filePaths[0];
  } else {
    return "file is not found";
  }
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  ipcMain.handle("dialog:openFile", handleFileOpen);
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
