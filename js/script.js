const colorAreas = document.querySelectorAll(".color-area");
const btnsLock = document.querySelectorAll(".btn-lock");
const btnRefresh = document.querySelector("#btn-refresh");
const copyAlert = document.querySelector("#copy-alert");

const generateRandomHexadecimal = () => {
  const randomNumber = Math.random() * Math.random();
  const hexadecimal = randomNumber.toString(16).substr(8, 6);
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
    btnLock.addEventListener("click", (event) => {
      event.stopPropagation();

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

const displayCopyAlert = () => {
  copyAlert.classList.toggle("hidden");
  setTimeout(() => copyAlert.classList.toggle("hidden"), 1500);
};

const copyToClipboard = () => {
  colorAreas.forEach((colorArea) => {
    colorArea.addEventListener("click", () => {
      const value = colorArea.children[1].textContent;
      const fakeInput = document.createElement("input");
      document.body.appendChild(fakeInput);
      fakeInput.value = value;
      fakeInput.select();
      document.execCommand("copy");
      fakeInput.remove();
      displayCopyAlert();
    });
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
  });

  copyToClipboard();
  savePallete();
};

const getPalleteSaved = () => {
  const palleteSaved = JSON.parse(localStorage.getItem("pallete-saved"));
  return palleteSaved;
};

const setPalleteSaved = () => {
  const palleteSaved = getPalleteSaved();

  for (let i in palleteSaved) {
    const { color, locked } = palleteSaved[i];
    const lockIcon = locked === "false" ? "img/unlock.svg" : "img/lock.svg";

    colorAreas[i].style.background = color;
    colorAreas[i].children[1].textContent = color;
    colorAreas[i].setAttribute("data-lock-color", locked);
    colorAreas[i].firstElementChild.firstElementChild.setAttribute(
      "src",
      lockIcon
    );
  }

  copyToClipboard();
};

const start = () => {
  const palleteSaved = getPalleteSaved();
  if (palleteSaved) setPalleteSaved();
  else changeBackgroundColors();
  lockColorArea();
};

start();

btnRefresh.addEventListener("click", changeBackgroundColors);

window.addEventListener("keyup", (event) => {
  if (event.key === " ") {
    event.preventDefault();
    changeBackgroundColors();
  }
});
