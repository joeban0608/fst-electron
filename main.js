const { app, BrowserWindow, MessageChannelMain } = require("electron");
const path = require("path");

app.whenReady().then(async () => {
  // 創建主窗口
  const mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      contextIsolation: false,
      preload: path.join(__dirname, "preloadMain.js"), // 主窗口的 preload 腳本
    },
  });

  // 創建次要窗口
  const secondaryWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      contextIsolation: false,
      preload: path.join(__dirname, "preloadSecondary.js"), // 次要窗口的 preload 腳本
    },
  });
  // 打開開發者工具
  mainWindow.webContents.openDevTools();
  secondaryWindow.webContents.openDevTools();

  // 設置消息通道
  const { port1, port2 } = new MessageChannelMain();

  // 主窗口準備好時，傳遞 port1
  mainWindow.once("ready-to-show", () => {
    mainWindow.webContents.postMessage("port", null, [port1]);
    mainWindow.show();
  });

  // 次要窗口準備好時，傳遞 port2
  secondaryWindow.once("ready-to-show", () => {
    secondaryWindow.webContents.postMessage("port", null, [port2]);
    secondaryWindow.show();
  });

  // 加載兩個窗口的 HTML
  mainWindow.loadFile("index.html");
  secondaryWindow.loadFile("index.html"); // 你可以加載不同的文件，這裡為了簡化也加載相同的 HTML
});
