// flatpickr
// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector('[data-start]');

const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');

let selectedDate;

btnStart.addEventListener('click', () => {
 const intervalID = setInterval(() => {
    const timeRange = convertMs(selectedDate - new Date());

    if (timeRange.days === 0 && timeRange.hours === 0 && timeRange.minutes === 0 && timeRange.seconds === 0) {
        clearInterval(intervalID);
    }

    spanDays.textContent = addLeadingZero(timeRange.days);
    spanHours.textContent = addLeadingZero(timeRange.hours);
    spanMinutes.textContent = addLeadingZero(timeRange.minutes);
    spanSeconds.textContent = addLeadingZero(timeRange.seconds);
  }, 1000);
});

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
      btnStart.setAttribute('disabled', '');

      return;
    }
    btnStart.removeAttribute('disabled');

    selectedDate = selectedDates[0];
  },
});

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
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
