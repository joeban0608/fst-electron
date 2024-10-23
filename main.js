const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");
};

app.whenReady().then(() => {
  // 自定義右鍵選單
  ipcMain.on("show-context-menu", (event) => {
    const template = [
      {
        label: "Increment",
        click: () => {
          event.sender.send("update-counter", 1);
        },
      },
      {
        label: "Decrement",
        click: () => {
          event.sender.send("update-counter", "-1");
        },
      },
    ];

    const menu = Menu.buildFromTemplate(template);
    menu.popup(BrowserWindow.fromWebContents(event.sender));
  });

  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
