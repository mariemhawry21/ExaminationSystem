const urlParams = new URLSearchParams(window.location.search);

const Score = urlParams.get("score");
let resultPara = document.querySelector(".result");
resultPara.innerHTML = (Score*10)\100;


const username = localStorage.getItem("username");
  document.getElementById("username").textContent = username;