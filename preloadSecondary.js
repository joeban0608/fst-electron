const { ipcRenderer } = require("electron");

ipcRenderer.on("port", (e) => {
  // port received, make it globally available.
  window.electronMessagePort = e.ports[0];

  window.electronMessagePort.onmessage = (messageEvent) => {
    console.log("messageEvent", messageEvent);
    console.log("Secondary Window received:", messageEvent.data);

    // handle message
  };
});
