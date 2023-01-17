import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button');
const timer = document.querySelector('.timer');
const field = document.querySelectorAll('.field');
console.log(field);
const value = document.querySelectorAll('.value');
console.log(value);
const label = document.querySelectorAll('.label');
console.log(value);
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
///////////////////////////////////////////////////////////////
//      ДОДАВАННЯ СТИЛІВ     //
// --------------------------//
function addStyles() {
  input.style.display = 'block';
  input.style.textAlign = 'center';
  input.style.margin = 'auto';
  input.style.backgroundColor = 'rgb(224, 227, 227)';
  btn.style.display = 'block';
  btn.style.margin = '10px auto 10px auto';
  timer.style.display = 'flex';
  timer.style.gap = '20px';
  timer.style.justifyContent = 'center';

  dataDays.style.display = 'flex';
  dataDays.style.justifyContent = 'center';
  dataDays.style.border = `1px solid black`;
  dataDays.style.minWidth = `${70}px`;
  dataDays.style.backgroundColor = 'rgb(224, 227, 227)';
  dataHours.style.display = 'flex';
  dataHours.style.justifyContent = 'center';
  dataHours.style.border = `1px solid black`;
  dataHours.style.minWidth = `${70}px`;
  dataHours.style.backgroundColor = 'rgb(224, 227, 227)';
  dataMinutes.style.display = 'flex';
  dataMinutes.style.justifyContent = 'center';
  dataMinutes.style.border = `1px solid black`;
  dataMinutes.style.minWidth = `${70}px`;
  dataMinutes.style.backgroundColor = 'rgb(224, 227, 227)';
  dataSeconds.style.display = 'flex';
  dataSeconds.style.justifyContent = 'center';
  dataSeconds.style.border = `1px solid black`;
  dataSeconds.style.minWidth = `${70}px`;
  dataSeconds.style.backgroundColor = 'rgb(224, 227, 227)';

  //   field.style.width = '80px';
  //   field.style.height = '80px';
  //   field.style.border = '1px solid black';
  //   field.style.borderRadius = '50%';
  //   field.style.backgroundColor = 'aquamarine';
  //   field.style.display = 'flex';
  //   field.style.justifyContent = 'center';
  //   field.style.alignItems = 'center';
  //   field.style.flexDirection = 'column';
  //   value.style.marginRight = '5px';
}
addStyles();
///////////////////////////////////////////////////////////////
//      ВИБІР ДАТИ     //
// --------------------//
btn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      alert('Please choose a date in the future');
    } else {
      btn.removeAttribute('disabled');
    }
  },
};

const chossedDate = flatpickr(input, options);
//-------------------------------------------------------------------------
// Ключі об'єкту параметрів "option" функції "flatpickr";
// ---------------------------------------------------------------------------
// enableTime	- Boolean	- false	- Вмикає засіб вибору часу

// time_24hr - boolean - false - Відображає засіб вибору часу в 24-годинному режимі без вибору AM/PM, якщо ввімкнено.

// defaultDate	- String - null -  Встановлює початкові вибрані дати.
// Якщо ви використовуєте mode: "multiple"календар діапазону , Arrayнадайте Dateоб’єкти або масив рядків дат, які слідують за вашим dateFormat.
// В іншому випадку ви можете надати один об’єкт Date або рядок дати.

// minuteIncrement	Integer	5 - Регулює крок для введення хвилин (включно з прокручуванням)

// onClose	- Function, [functions]	- null - Функції, які запускаються щоразу, коли календар закривається. Перегляньте  API подій
///////////////////////////////////////////////////////////////////////////////
//     СТАРТ ТАЙМЕРУ    //
// ---------------------//

btn.addEventListener('click', onClickStart);

function onClickStart() {
  const intervalId = setInterval(() => {
    const currentDate = new Date();
    const differentTime = chossedDate.selectedDates[0] - currentDate;
    if (differentTime < 0) {
      clearInterval(intervalId);
      btn.setAttribute('disabled', true);
      return;
    }
    convertMs(differentTime);
  }, 1000);
}
//----------------------------------------------------------------------
//  ФОРМАТУВАННЯ ЧАСУ  //
//---------------------//
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // addLeadingZero(days);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  // addLeadingZero(seconds);

  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);

  return { days, hours, minutes, seconds };
}
//---------------------------------------------------------------------------
//  ДОДАВАННЯ НУЛЯ В ОДНОЦИФРОВИХ ЧИСЛАХ  //
//----------------------------------------//
function addLeadingZero(value) {
  if (String(value).length <= 2) {
    return String(value).padStart(2, '0');
  } else {
    return String(value);
  }
}
////////////////////////////////////////////////////////////////////////////
