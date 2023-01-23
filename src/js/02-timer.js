import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.getElementById('datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  timerEL: document.querySelector('.timer'),
  dayValue: document.querySelector('span[data-days]'),
  hourValue: document.querySelector('span[data-hours]'),
  minuteValue: document.querySelector('span[data-minutes]'),
  secondValue: document.querySelector('span[data-seconds]'),
};
const {
  input,
  btnStart,
  timerEL,
  dayValue,
  hourValue,
  minuteValue,
  secondValue,
} = refs;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
    }
    btnStart.disabled = false;
  },
};

btnStart.disabled = true;

flatpickr(input, options);

btnStart.addEventListener('click', onClickBtnStart);

function onClickBtnStart() {
  const selectedDatе = new Date(input.value).getTime();
  const timerId = setInterval(() => {
    const diff = selectedDatе - new Date();
    const convertDate = convertMs(diff);
    btnStart.disabled = true;
    dayValue.textContent = convertDate.days;
    hourValue.textContent = convertDate.hours;
    minuteValue.textContent = convertDate.minutes;
    secondValue.textContent = convertDate.seconds;
    if (diff <= 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

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

  return { days, hours, minutes, seconds };
}
