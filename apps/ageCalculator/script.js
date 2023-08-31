let validDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let dataArr = document.querySelectorAll(".data input");
for (let i = 0; i < dataArr.length; i++) {
  dataArr[i].addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      if (isValidDate()) {
        calculateTime();
      }
    }
  });
}

function isValidDate() {
  const day = parseInt(document.getElementById("day").value);
  const month = parseInt(document.getElementById("month").value);
  const year = parseInt(document.getElementById("year").value);
  let isValid;

  // check for empty or invalid year values
  if (isNaN(year) || !validYear(year)) {
    document.getElementById("year").style.borderColor = "hsl(0, 100%, 67%)";
    isValid = false;
  } else {
    document.getElementById("year").style.borderColor = "hsl(0, 0%, 86%)";
    isValid = true;
  }

  // check if a leap year
  year % 400 === 0 || year % 4 === 0
    ? (validDays[1] = 29)
    : (validDays[1] = 28);

  // check for empty or invalid month values
  if (isNaN(month) || !validMonth(month)) {
    document.getElementById("month").style.borderColor = "hsl(0, 100%, 67%)";
    isValid = false;
  } else {
    document.getElementById("month").style.borderColor = "hsl(0, 0%, 86%)";
    isValid = true;
  }

  // check for empty or invalid day values
  if (isNaN(day) || !validDay(day, month)) {
    document.getElementById("day").style.borderColor = "hsl(0, 100%, 67%)";
    isValid = false;
  } else {
    document.getElementById("day").style.borderColor = "hsl(0, 0%, 86%)";
    isValid = true;
  }

  return isValid;
}

function validMonth(month) {
  return month >= 1 && month <= 12 ? true : false;
}
function validDay(day, month) {
  return day >= 1 && day <= validDays[month - 1] ? true : false;
}
function validYear(year) {
  const currentYear = new Date().getFullYear();
  return year >= 0 && year <= currentYear ? true : false;
}

function calculateTime() {
  const day = parseInt(document.getElementById("day").value);
  const month = parseInt(document.getElementById("month").value);
  const year = parseInt(document.getElementById("year").value);

  // const secondsPerDay = 60 * 60 * 24 * 1000;
  // const secondsPerYear = secondsPerDay;

  let dayString = "",
    monthString = "";
  day < 10 ? (dayString = "0" + day.toString()) : (dayString = day.toString());
  month < 10
    ? (monthString = "0" + month.toString())
    : (monthString = month.toString());

  const dateString = `${year.toString()}-${monthString}-${dayString}`;

  const birthDay = new Date(dateString);
  const todaysDate = new Date();

  // let totalDays = (todaysDate - birthDay) / secondsPerDay
  let years = todaysDate.getFullYear() - birthDay.getFullYear();
  let months = todaysDate.getMonth() - birthDay.getMonth();
  let days = todaysDate.getDate() - birthDay.getDate() - 1;
  let yearMsg, monthMsg, dayMsg; // for words after amounts

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  if (days < 0) {
    months--;
    days += new Date(
      todaysDate.getFullYear(),
      todaysDate.getMonth(),
      0
    ).getDate();
  }

  yearMsg = years === 1 ? "year" : "years";
  monthMsg = months === 1 ? "month" : "months";
  dayMsg = days === 1 ? "day" : "days";

  document.getElementById(
    "resultYears"
  ).innerHTML = `<span class="number">${years}</span> <span>${yearMsg}<span>`;

  document.getElementById(
    "resultMonths"
  ).innerHTML = `<span class="number">${months}</span> <span>${monthMsg}<span>`;

  document.getElementById(
    "resultDays"
  ).innerHTML = `<span class="number">${days}</span> <span>${dayMsg}<span>`;
}
