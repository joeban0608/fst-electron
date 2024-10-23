const counter = document.getElementById("counter");

window.electronAPI.onUpdateCounter((value) => {
  console.log("value", value);
  const oldValue = Number(counter.innerText);
  const newValue = oldValue + value;
  counter.innerText = newValue.toString();
  window.electronAPI.counterValue(newValue);
});
