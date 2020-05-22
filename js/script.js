const colorAreas = document.querySelectorAll(".color-area");
const btnsLock = document.querySelectorAll(".btn-lock");
const btnRefresh = document.querySelector("#btn-refresh");

const generateRandomHexadecimal = () => {
  const randomNumber = Math.random() * Math.random();
  const hexadecimal = randomNumber.toString(16).substr(6, 6);
  return `#${hexadecimal}`;
};

const savePallete = () => {
  const pallete = [];
  colorAreas.forEach((colorArea) => {
    const palleteItem = {
      color: colorArea.children[1].textContent,
      locked: colorArea.getAttribute("data-lock-color"),
    };

    pallete.push(palleteItem);
  });

  localStorage.setItem("pallete-saved", JSON.stringify(pallete));
};

const lockColorArea = () => {
  btnsLock.forEach((btnLock) => {
    btnLock.addEventListener("click", () => {
      let locked = btnLock.parentElement.getAttribute("data-lock-color");
      let lockIcon;

      [locked, lockIcon] =
        locked === "false" ? [true, "img/lock.svg"] : [false, "img/unlock.svg"];

      btnLock.firstElementChild.setAttribute("src", lockIcon);
      btnLock.parentElement.setAttribute("data-lock-color", locked);

      savePallete();
    });
  });
};

const copyToClipboard = (element) => {
  element.addEventListener("click", (event) => {
    event.stopPropagation();
    const value = element.children[1].textContent;
    const fakeInput = document.createElement("input");
    document.body.appendChild(fakeInput);
    fakeInput.value = value;
    fakeInput.select();
    document.execCommand("copy");
    fakeInput.remove();
  });
};

const changeBackgroundColors = () => {
  colorAreas.forEach((colorArea) => {
    const locked = colorArea.getAttribute("data-lock-color");

    if (locked === "false") {
      const hexadecimal = generateRandomHexadecimal();
      colorArea.style.background = hexadecimal;
      colorArea.children[1].textContent = hexadecimal;
    }

    copyToClipboard(colorArea);
  });

  savePallete();
};

const getPalleteSaved = () => {
  const palleteSaved = JSON.parse(localStorage.getItem("pallete-saved"));
  return palleteSaved;
};

const setPalleteSaved = () => {
  const palleteSaved = getPalleteSaved();

  for (const i in palleteSaved) {
    const { color, locked } = palleteSaved[i];
    const lockIcon = locked === "true" ? "img/lock.svg" : "img/unlock.svg";

    colorAreas[i].style.background = color;
    colorAreas[i].children[1].textContent = color;
    colorAreas[i].setAttribute("data-lock-color", locked);
    colorAreas[i].firstElementChild.firstElementChild.setAttribute(
      "src",
      lockIcon
    );
  }
};

const start = () => {
  const palleteSaved = getPalleteSaved();
  if (palleteSaved) setPalleteSaved();
  else changeBackgroundColors();
  lockColorArea();
};

start();

btnRefresh.addEventListener("click", changeBackgroundColors);

window.addEventListener("keydown", (event) => {
  if (event.key === " ") changeBackgroundColors();
});
