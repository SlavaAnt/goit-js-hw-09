import Notiflix from 'notiflix';

const form = document.querySelector('.form');

const data = {};
//----------------------------------------------------------------------
//  ПРОСЛУХОВУВАННЯ  //
//-------------------//
form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  // отримання об'єкту даних форми
  dataFromForm(evt);

  onStart(data);
}
//----------------------------------------------------------------------
//  ОТРИМАННЯ ОБ'ЄКТУ ДАНИХ ФОРМИ  //
//---------------------------------//
function dataFromForm(evt) {
  let formData = new FormData(evt.target);
  formData.forEach((value, name) => {
    // console.log(`Назва поля форми: ${name}, його значення: ${value}`);
    data[name] = Number(value);
  });
  //   console.log(data);
  return data;
}
//----------------------------------------------------------------------
//  СТВОРЕННЯ ОДНОГО ПРОМІСУ  //
//----------------------------//
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
//----------------------------------------------------------------------
//  ОТРИМАННЯ РЕЗУЛЬТАТУ ОДНОГО ПРОМІСУ  //
//---------------------------------------//
function resultOfCreatePromise(position, delay) {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      // console.log(`✅ Fulfilled promise ${position} in ${newDelay}ms`);
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      // console.log(`❌ Rejected promise ${position} in ${newDelay}ms`);
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
//----------------------------------------------------------------------
//  СТВОРЕННЯ ЗАДАНОЇ КІЛЬКОСТІ ПРОМІСІВ  //
//----------------------------------------//
function onStart({ delay, step, amount }) {
  let position = 0;
  position += 1;

  if (position >= amount) {
    return;
  }

  let nextDelay = delay;

  for (let i = 1; i <= amount; i += 1) {
    resultOfCreatePromise(i, nextDelay);

    nextDelay += step;
  }
}
///////////////////////////////////////////////////////////////////////
