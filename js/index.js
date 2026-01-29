const 정답 = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display: flex; justify-content:center; align-items:center; position:absolute; top: 40vh; left: 35vw; background-color: white; width: 200px; height: 100px;";
    document.body.appendChild(div);
  };
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    document.querySelectorAll(".keyboard-normal-block").forEach((target) => {
      target.removeEventListener("click", handleKeyboardDown);
    });
    document
      .querySelector("#enter-key")
      .removeEventListener("click", handleKeyboardEnterDown);
    document
      .querySelector("#backspace-key")
      .removeEventListener("click", handleKeyboardBackspaceDown);
    displayGameover();
    clearInterval(timer);
  };
  const handleBackspace = () => {
    if (index !== 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`,
      );
      preBlock.innerText = "";
      index -= 1;
    }
  };
  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`,
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      const keyboardBlock = document.querySelector(
        `.keyboard-normal-block[data-key='${입력한_글자}']`,
      );
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
        keyboardBlock.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#C9B458";
        if (keyboardBlock.style.background !== "rgb(106, 170, 100)") {
          keyboardBlock.style.background = "#C9B458";
        }
      } else {
        block.style.background = "#787C7E";
        keyboardBlock.style.background = "#787C7E";
      }
      keyboardBlock.style.color = "white";
      block.style.color = "white";
    }

    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };
  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeH1 = document.querySelector("#timer");
      timeH1.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  };

  const handleKeyboardDown = (event) => {
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`,
    );

    thisBlock.innerText = event.target.dataset.key;
    index += 1;
  };

  const handleKeyboardBackspaceDown = () => {
    handleBackspace();
  };

  const handleKeyboardEnterDown = () => {
    if (index === 5) {
      handleEnterKey();
    }
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`,
    );

    if (event.key === "Backspace") handleBackspace();
    if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };
  startTimer();
  document.querySelectorAll(".keyboard-normal-block").forEach((target) => {
    target.addEventListener("click", handleKeyboardDown);
  });
  document
    .querySelector("#enter-key")
    .addEventListener("click", handleKeyboardEnterDown);
  document
    .querySelector("#backspace-key")
    .addEventListener("click", handleKeyboardBackspaceDown);
  window.addEventListener("keydown", handleKeydown);
}

appStart();
