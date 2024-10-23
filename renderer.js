window.addEventListener("contextmenu", (e) => {
  e.preventDefault(); // 禁止默認右鍵菜單
  window.electronAPI.showContextMenu(); // 觸發自定義上下文菜單
});

// window.electronAPI.onUpdateCounter((command) => {
//   console.log("選擇的命令:", command);
//   // 根據選擇的指令執行相應操作
// });
window.electronAPI.onUpdateCounter((value) => {
  const oldValue = Number(counter.innerText);
  const newValue = oldValue + Number(value);
  counter.innerText = newValue.toString();
  window.electronAPI.counterValue(newValue);
});
