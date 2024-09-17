// Select both buttons
const buttons = document.querySelectorAll('.ripple-btn');

// Add ripple effect to each button
buttons.forEach((button) => {
  button.addEventListener('click', function (e) {
    // Create the ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    // Set the ripple position
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    // Append the ripple to the button
    button.appendChild(ripple);

    // Remove the ripple after animation completes
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  });
});

const calendar = document.querySelector('.calendar');
let date = document.querySelector('.month__name');
let days_container = document.querySelector('.days');
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let todaybtn = document.querySelector('.today__btn');
let gobtn = document.querySelector('.go__btn');
let input = document.querySelector('.date__input');

let today = new Date();
let month = today.getMonth(); // Changed from const to let
let year = today.getFullYear(); // Changed from const to let
const months = [
  'January',
  'February', // Fixed typo (Febuary -> February)
  'March',
  'April',
  'May', // Added missing month
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const initCal = () => {
  const firstDay = new Date(year, month, 1); // first day of the month
  const lastDay = new Date(year, month + 1, 0); // last day of this month
  const prevLastDay = new Date(year, month, 0); // last day of the previous month
  const prevDate = prevLastDay.getDate(); // last day of the previous month (e.g., 31)
  const lastDate = lastDay.getDate(); // last date of this month
  const firstDayIndex = firstDay.getDay(); // index of first day in the week (0=Sunday, 1=Monday,...)
  const nextDays = 7 - lastDay.getDay() - 1; // days of next month to display

  date.innerHTML = months[month] + ' ' + year;

  let days = '';

  // Previous month's days
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="day prev-month">${prevDate - x + 1}</div>`;
  }

  // Current month's days
  for (let i = 1; i <= lastDate; i++) {
    if (
      i === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
    ) {
      days += `<div class="day today">${i}</div>`;
    } else {
      days += `<div class="day">${i}</div>`;
    }
  }

  // Next month's days
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-month">${j}</div>`;
  }

  days_container.innerHTML = days;
};

initCal();

function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCal();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCal();
}

prev.addEventListener('click', () => {
  prevMonth();
});

next.addEventListener('click', () => {
  nextMonth();
});

todaybtn.addEventListener('click', () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCal();
});

input.addEventListener('keyup', () => {
  if (input.value.length === 2) {
    input.value += '/';
  }
});

const goBtn = () => {
  const dateArray = input.value.split('/');
  month = Number(dateArray[0]) - 1;
  year = dateArray[1];
  console.log(month);
  initCal();
};

gobtn.addEventListener('click', () => {
  goBtn();
});
