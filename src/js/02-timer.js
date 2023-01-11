import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
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
// ---------------------------------------------------------------------------
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
    if (differentTime <= 0) {
      clearInterval(intervalId);
    }
    convertMs(differentTime);
    console.log(convertMs(differentTime));
  }, 1000);
}
//------------------------------------------------------------------------------
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  dataDays.textContent = days;
  dataHours.textContent = hours;
  dataMinutes.textContent = minutes;
  dataSeconds.textContent = seconds;

  return { days, hours, minutes, seconds };
}
//------------------------------------------------------------------------------
