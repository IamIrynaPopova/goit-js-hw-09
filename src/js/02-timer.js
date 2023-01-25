import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.getElementById('datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  timerEL: document.querySelector('.timer'),
  dayValue: document.querySelector('[data-days]'),
  hourValue: document.querySelector('[data-hours]'),
  minuteValue: document.querySelector('[data-minutes]'),
  secondValue: document.querySelector('[data-seconds]'),
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

Notiflix.Notify.init({
  position: 'center-bottom',
  width: '300px',
  distance: '400px',
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] < new Date()) {
        // window.alert('Please choose a date in the future');
        Notiflix.Notify.failure('Please choose a date in the future');
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
    dayValue.textContent = addLeadingZero(convertDate.days);
    hourValue.textContent = addLeadingZero(convertDate.hours);
    minuteValue.textContent = addLeadingZero(convertDate.minutes);
    secondValue.textContent = addLeadingZero(convertDate.seconds);
          if (diff <= 1000) {
      clearInterval(timerId);
    }
  }, 1000);

};

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
};

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
