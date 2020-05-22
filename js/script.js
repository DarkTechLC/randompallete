const colorAreas = document.querySelectorAll('.color-area');
const btnRefresh = document.querySelector('#btn-refresh');

const generateRandomHexadecimal = () => {
  const randomNumber = Math.random() * Math.random();
  const hexadecimal = randomNumber.toString(16).substr(2, 6);
  return `#${hexadecimal}`;
}

const copyToClipboard = (element, value) => {
  element.addEventListener('click', () => {
    const fakeInput = document.createElement('input');
    document.body.appendChild(fakeInput);
    fakeInput.value = value;
    fakeInput.select();
    document.execCommand('copy');
    fakeInput.remove();
  });
}

const changeBackgroundOfEachColorArea = () => {
  colorAreas.forEach(colorArea => {
    const hexadecimal = generateRandomHexadecimal();
    colorArea.style.background = hexadecimal;
    colorArea.children[1].textContent = hexadecimal;
    copyToClipboard(colorArea, hexadecimal);
  });
}

changeBackgroundOfEachColorArea();

btnRefresh.addEventListener('click', changeBackgroundOfEachColorArea);

window.addEventListener('keydown', (event) => {
  if (event.key === ' ') changeBackgroundOfEachColorArea();
});