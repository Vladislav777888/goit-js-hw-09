import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  spanDay: document.querySelector('[data-days]'),
  spanHours: document.querySelector('[data-hours]'),
  spanMinutes: document.querySelector('[data-minutes]'),
  spanSeconds: document.querySelector('[data-seconds]'),
};

styleAdd();

refs.startBtn.setAttribute('disabled', true);
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const deadLine = selectedDates[0];
    startTimer(deadLine);
  },
};

flatpickr(refs.input, options);

function startTimer(deadLine) {
  if (deadLine < options.defaultDate) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }
  refs.startBtn.removeAttribute('disabled');
  refs.startBtn.addEventListener('click', onStartBtn);

  function onStartBtn(evt) {
    timerId = setInterval(() => {
      const selectTime = deadLine;
      const startTime = Date.now();
      const deltaTime = selectTime - startTime;

      if (deltaTime < 0) {
        clearInterval(timerId);
        evt.target.setAttribute('disabled', true);
        return;
      }

      const time = convertMs(deltaTime);
      updateTimerInterface(time);
    }, 1000);
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerInterface({ days, hours, minutes, seconds }) {
  refs.spanDay.textContent = `${days}`;
  refs.spanHours.textContent = `${hours}`;
  refs.spanMinutes.textContent = `${minutes}`;
  refs.spanSeconds.textContent = `${seconds}`;
}

function styleAdd() {
  const timerDiv = document.querySelector('.timer');
  timerDiv.style.display = 'flex';
  timerDiv.style.alineItem = 'flex';

  const fieldDiv = document.querySelectorAll('.field');
  fieldDiv.forEach(field => {
    field.style.display = 'flex';
    field.style.flexDirection = 'column';
    field.style.alignItems = 'center';
    field.style.margin = '10px';
  });
}
