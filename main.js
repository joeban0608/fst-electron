const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile("index.html");

  // 自定義右鍵選單
  ipcMain.on("show-context-menu", (event) => {
    const template = [
      {
        label: "Option 1",
        click: () => {
          event.sender.send("context-menu-command", "Option 1");
        },
      },
      {
        label: "Option 2",
        click: () => {
          event.sender.send("context-menu-command", "Option 2");
        },
      },
    ];

    const menu = Menu.buildFromTemplate(template);
    menu.popup(BrowserWindow.fromWebContents(event.sender));
  });

  // 設置 macOS 上的應用菜單
  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [{ role: "about" }, { type: "separator" }, { role: "quit" }],
    },
  ]);

  Menu.setApplicationMenu(menu);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
});
