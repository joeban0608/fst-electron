const setButton = document.getElementById("btn");
const titleInput = document.getElementById("title");
setButton.addEventListener("click", () => {
  if (titleInput) {
    const title = titleInput.value;
    window.electronAPI.changeTitle(title);
  }
});
