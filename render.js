// renderer.js

// 操作 DOM 元素
const rootElement = document.getElementById("root");

// 新增內容到 #root
const newDiv = document.createElement("div");
newDiv.textContent = "This is rendered by renderer.js";
rootElement.appendChild(newDiv);

// 你也可以添加更多功能，比如事件處理
document.addEventListener("click", () => {
  alert("Document clicked!");
});
