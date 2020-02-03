// GLOBAL VARIABLES
let currentMenuItem, menuLink, currentPage, gasData = null;

// END GLOBAL VARIABLES

window.onload = function () {

  gasData = JSON.parse(localStorage.getItem('gasAppTMS'));

  if (!gasData) {   // first time!
    currentMenuItem = 'm-settings';
    currentPage = 'settings';

    document.getElementById(currentMenuItem).classList.add('active');
    document.getElementById('settings').classList.add('menuMargin');
    document.getElementById('firstTime').style.display = "block";

    document.getElementById('btnSettings').style.disabled = true;
    document.getElementById('btnSettings').style.backgroundColor = '#777';
    document.getElementById('btnSettings').style.cursor = 'not-allowed';

    window.location.href = '#settings';

  } else {    // previous fill-up data exists...
    currentMenuItem = 'm-fillUp';
    currentPage = 'fillUp';
    document.getElementById(currentMenuItem).classList.add('active');
    document.getElementById('settings').classList.add('menuMargin');
    document.getElementById('firstTime').classList.remove('show');

    // show settings options
    if (gasData.settings.units === 'met') {
      document.getElementById('metric').checked = true;
    } else {
      document.getElementById('imperial').checked = true;
    }

    window.location.href = '#fillUp';
    // show fillups history (before submit pressed)
    const qsFillAmount = gasData.purchase[gasData.purchase.length - 1].amount;
    const qsPrice = gasData.purchase[gasData.purchase.length - 1].gasPrice;
    const qsOdometer = gasData.purchase[gasData.purchase.length - 1].odometer;
    const qsGasUnits = gasData.purchase[gasData.purchase.length - 1].gasUnits;

    const qsAvgConsumption = qsGasUnits / qsOdometer * 100;

    // 2. show last fill data length - 1 item
    document.getElementById('qs-fillAmount').textContent = qsFillAmount.toFixed(2);
    document.getElementById('qs-price').textContent = qsPrice.toFixed(3);
    document.getElementById('qs-odometer').textContent = qsOdometer.toFixed(1);
    document.getElementById('qs-consumption').textContent = qsAvgConsumption.toFixed(1);

    // 3. show accumulated last 4 fills data
    displayLastFourFills();
  }
}

// *** Navigation ***

menuLink = document.querySelectorAll('.menuItem');

let menu = document.getElementById('menu')
  .addEventListener('click', (e) => {
    let page, element;

    // remove the 'm-' part to get current page
    currentPage = currentMenuItem.substring(2, currentMenuItem.length);

    // remove active class from old previous menu choice
    document.getElementById(currentMenuItem).classList.remove('active');

    // remove menuMargin from page linked to old active menu item
    document.getElementById(currentPage).classList.remove('menuMargin');

    // add active class to clicked menu item

    page = e.target.id;   // this will be m-(page)
    currentMenuItem = page;

    document.getElementById(currentMenuItem).classList.add('active');


    // add spacer to section (page) classlist
    page = page.substring(2, page.length);  // remove the 'm-' part
    // console.log(page);

    element = document.getElementById(page);  // get actual section id
    element.classList.add('menuMargin');


  }, false);



// *** SETTINGS (Global) ***
// Stored in local storage: key is 'gasAppTMS'

const metricBtn = document.getElementById('metric');
metricBtn.addEventListener('change', () => {
  if (metricBtn.checked === true) {
    activateButton();
    document.getElementById('firstTime').style.display = 'none';
  }
});

const imperialBtn = document.getElementById('imperial');
imperialBtn.addEventListener('change', () => {
  if (imperialBtn.checked === true) {
    activateButton();
    document.getElementById('firstTime').style.display = 'none';
  }
});

function activateButton() {
  document.getElementById('btnSettings').style.backgroundColor = 'green';
  document.getElementById('btnSettings').disabled = false;
  document.getElementById('btnSettings').style.cursor = 'pointer';
};

let saveSettings = document.getElementById('btnSettings')
  .addEventListener('click', () => {

    if (!gasData) {  // initial set up...

      // if no option chosen, exit
      if (!document.getElementById('metric').checked && !document.getElementById('imperial').checked) {
        return;
      }

      // set up gasAppTMS object...
      gasData = {};
      gasData.settings = {};
      if (document.getElementById('metric').checked) {
        gasData.settings.units = 'met';
      } else {
        gasData.settings.units = 'imp';
      }

      gasData.total = {};
      gasData.total.distance = 0;
      gasData.total.gasUnits = 0;
      gasData.total.dollars = 0;

      gasData.purchase = [];

      localStorage.setItem('gasAppTMS', JSON.stringify(gasData));

      // tidy up welcome in settings and navigate to fillUp page
      document.getElementById('firstTime').style.display = 'none';
      currentMenuItem = 'm-fillUp';
      currentPage = 'fillUp';
      document.getElementById('m-settings').classList.remove('active');
      document.getElementById('settings').classList.remove('menuMargin');
      document.getElementById('m-fillUp').classList.add('active');
      document.getElementById('fillUp').classList.add('menuMargin');

      window.location.href = '#fillUp';
      // set menu to fillup & menuMargin etc

    }

  });


/* Value is EITHER:
    'r': trip reset used each fillup
    't' = total odometer value entered
          (calculate difference from previous reading)
*/
// let odometerReadingType;

// *** SETTINGS ***
const d = new Date();


Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

// ***


let addTransaction = document.getElementById('submit');
addTransaction.addEventListener('click', () => {

  let totalDollars, totalDistance, totalGasUnits;
  let fill = new Object();

  fill.date = new Date();

  fill.amount = parseFloat(document.getElementById('fillAmount').value);

  fill.gasPrice = parseFloat(document.getElementById('gasPrice').value);

  fill.odometer = parseFloat(document.getElementById('odometer').value);

  fill.gasUnits = fill.amount / fill.gasPrice;



  // accumulate totals
  gasData.total.distance += fill.odometer;
  gasData.total.gasUnits += fill.gasUnits;
  gasData.total.dollars += fill.amount;

  // erase text boxes
  document.getElementById('fillAmount').value = '';
  document.getElementById('gasPrice').value = '';
  document.getElementById('odometer').value = '';

  // write most recent fill table data
  document.getElementById('qs-fillAmount').textContent = fill.amount.toFixed(2);
  document.getElementById('qs-price').textContent = fill.gasPrice.toFixed(1);
  document.getElementById('qs-odometer').textContent = fill.odometer.toFixed(1);
  document.getElementById('qs-consumption').textContent = (fill.gasUnits / fill.odometer * 100).toFixed(1);

  // delete old data
  localStorage.removeItem("gasAppTMS");

  gasData.purchase.push(fill);
  // write new gas data
  localStorage.setItem('gasAppTMS', JSON.stringify(gasData));

  // write cumulative last 4 fill table data
  displayLastFourFills();


});

function getRecentData(gasData) {
  // returns # of recent fills (4 if possible or less)

  let startIndex;
  let recentFills = {};   // object to be returned
  recentFills.number = gasData.purchase.length;
  recentFills.totalDistance = 0;
  recentFills.totalGasUnits = 0;
  recentFills.totalDollars = 0;


  recentFills.number >= 4 ? recentFills.number = 4 : recentFills.number * 1;

  // determine where in the array to start
  startIndex = gasData.purchase.length - recentFills.number;

  for (let i = startIndex; i < gasData.purchase.length; i++) {
    recentFills.totalDistance += gasData.purchase[i].odometer;
    recentFills.totalGasUnits += gasData.purchase[i].gasUnits;
    recentFills.totalDollars += gasData.purchase[i].amount;
  }

  recentFills.avgConsumption = recentFills.totalGasUnits / recentFills.totalDistance * 100;

  recentFills.avgCostPerDistance = recentFills.totalDollars / recentFills.totalDistance;

  return recentFills;
}

function displayLastFourFills() {

  const recentFillsData = getRecentData(gasData);

  document.getElementById('qs-sum').textContent = `Last ${recentFillsData.number} fills`;
  console.log(recentFillsData);

  document.getElementById('qs-TotDistance').textContent = recentFillsData.totalDistance.toFixed(1);

  document.getElementById('qs-TotGasUnits').textContent = recentFillsData.totalGasUnits.toFixed(1);

  document.getElementById('qs-TotConsumption').textContent = (recentFillsData.totalGasUnits / recentFillsData.totalDistance * 100).toFixed(1);

  document.getElementById('qs-TotCostPerUnit').textContent = (recentFillsData.totalDollars / recentFillsData.totalDistance).toFixed(2);
}



// class Transaction {

//   constructor(purchase, gasPrice, odometer) {
//     this.date = function () {
//       return new Date();
//     };

//     this.purchase = purchase;
//     this.gasPrice = gasPrice;
//     this.odometer = odometer;
//     this.gasUnits = function () {
//       return this.purchase / this.gasPrice;

//     };

//     this.liters = getUnits();

//     // sayHi() {
//     //   console.log(this.date);
//     // }

//   }
// }
// const thu = new Transaction(new Date(), 40, 1515);
// console.log(thu);

