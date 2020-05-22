const colorAreas = document.querySelectorAll('.color-area');
const btnsLock = document.querySelectorAll('.btn-lock');
const btnRefresh = document.querySelector('#btn-refresh');

const generateRandomHexadecimal = () => {
  const randomNumber = Math.random() * Math.random();
  const hexadecimal = randomNumber.toString(16).substr(6, 6);
  return `#${hexadecimal}`;
}

const lockColorArea = () => {
  btnsLock.forEach(btnLock => {
    btnLock.addEventListener('click', () => {
      let locked = btnLock.parentElement.getAttribute('data-lock-color');
      let lockIcon;

      [locked, lockIcon] = locked === 'false'
        ? [true, 'img/lock.svg']
        : [false, 'img/unlock.svg'];

      btnLock.firstElementChild.setAttribute('src', lockIcon);

      btnLock.parentElement.setAttribute('data-lock-color', locked);
    });
  });
}

const copyToClipboard = (element) => {
  element.addEventListener('click', (event) => {
    event.stopPropagation();
    const value = element.children[1].textContent;
    const fakeInput = document.createElement('input');
    document.body.appendChild(fakeInput);
    fakeInput.value = value;
    fakeInput.select();
    document.execCommand('copy');
    fakeInput.remove();
  });
}

const functionsToColorAreas = () => {  
  colorAreas.forEach(colorArea => {
    const locked = colorArea.getAttribute('data-lock-color');
    
    if (locked === 'false') {
      const hexadecimal = generateRandomHexadecimal();
      colorArea.style.background = hexadecimal;
      colorArea.children[1].textContent = hexadecimal;
    }

    copyToClipboard(colorArea);
  });
}

functionsToColorAreas();
lockColorArea();

btnRefresh.addEventListener('click', functionsToColorAreas);

window.addEventListener('keydown', (event) => {
  if (event.key === ' ') functionsToColorAreas();
});