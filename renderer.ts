const setButton = document.getElementById("btn");
const titleInput =
  (document.getElementById("title") as HTMLInputElement) || null;
setButton?.addEventListener("click", () => {
  if (titleInput) {
    const title = titleInput?.value || "";
    window.electronAPI.setTitle(title);
  }
});
