const { app, Tray, Menu, nativeImage } = require("electron/main");

let tray;

app.whenReady().then(() => {
  const icon = nativeImage
    .createFromPath("menu2.png")
    .resize({ width: 16, height: 16 });
  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: "Item1", type: "radio" },
    { label: "Item2", type: "radio" },
    { label: "Item3", type: "radio", checked: true },
    { label: "Item4", type: "radio" },
  ]);

  tray.setToolTip("This is my application.");
  tray.setContextMenu(contextMenu);
});
