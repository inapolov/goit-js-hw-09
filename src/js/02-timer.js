import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] < new Date()) {
          return window.alert("Please choose a date in the future");
      } else {
          clearInterval(timer.intervalId);
          startEl.disabled = false;
      }
  },
};

const dateInput = document.querySelector("#datetime-picker");
const startEl = document.querySelector("button[data-start]");
const dataDaysEl = document.querySelector("[data-days]");
const dataHoursEl = document.querySelector("[data-hours]");
const dataMinutesEl = document.querySelector("[data-minutes]");
const dataSecondsEl = document.querySelector("[data-seconds]");

startEl.disabled = true;
startEl.addEventListener("click", () => {
    timer.start();
});

const fp = flatpickr(dateInput, options);

const timer = {
    intervalId: null,
    isActiv: false,
    start() {
        if (this.isActiv) {
            return;
        };
        this.isActiv = true;
        const startTime = fp.selectedDates[0];

        this.intervalId=setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = startTime - currentTime;
            if (deltaTime <0) {                
                clearInterval(this.intervalId);
                return;
            };
            

            const { days, hours, minutes, seconds } = convertMs(deltaTime);

            
            dataDaysEl.textContent = `${days}`;
            dataHoursEl.textContent = `${hours}`;
            dataMinutesEl.textContent = `${minutes}`;
            dataSecondsEl.textContent = `${seconds}`;

        }, 1000);
    },
    
};



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
    return String(value).padStart(2, '0');
};



