const urlParams = new URLSearchParams(window.location.search);

const Score = urlParams.get("score");
let resultPara = document.querySelector(".result");
resultPara.innerHTML = Score;
