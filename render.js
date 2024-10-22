const information = document.getElementById("info");
// alert("information", information);
console.log("versions", versions);
information.innerText = `This app is using 
Chrome (v${versions.chrome()}), 
Node.js (v${versions.node()}), 
and Electron (v${versions.electron()})
constant: hello: ${constant.hello}
`;
const handlePingPongFunc = async () => {
  const response = await window.versions.ping()
  console.log(response) // prints out 'pong'
}

handlePingPongFunc()