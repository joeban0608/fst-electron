const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const { updateElectronApp } = require("update-electron-app");
updateElectronApp();

const mainHandleSetTitleFromRenderMsg = (event, title) => {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
};
function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // change-title or set-title 沒差，這只是個 channel, 對應 renderer 的 channel
  ipcMain.on("change-title", mainHandleSetTitleFromRenderMsg);

  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
