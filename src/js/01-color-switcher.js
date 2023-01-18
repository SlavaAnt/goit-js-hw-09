const body = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
b;
// console.log(body);
let intervalId = null;

// btnStop.setAttribute('disabled', true);

btnStart.addEventListener('click', onStart);
function onStart() {
  btnStart.setAttribute('disabled', true);
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    btnStop.removeAttribute('disabled');
    btnStart.setAttribute('disabled', true);
  }, 1000);
}

btnStop.addEventListener('click', onStop);
function onStop() {
  clearInterval(intervalId);
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', true);
  console.log('Stop');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
