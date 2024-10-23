// 當電子的消息端口可用時，發送消息
console.log('outSide here')
if (window.electronMessagePort) {
  console.log("here");
  window.electronMessagePort.postMessage("ping from Main Window");
}
console.log('after here')
