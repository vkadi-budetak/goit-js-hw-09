const switcherColor = document.querySelector('body');

const btnStart = document.querySelector('.button-start');
const btnStop = document.querySelector('.button-stop');

let intervalID;

btnStart.addEventListener('click', () => {
  btnStart.setAttribute('disabled', '');
  intervalID = setInterval(() => {
    switcherColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

btnStop.addEventListener('click', () => {
  btnStart.removeAttribute('disabled');

  clearInterval(intervalID);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
