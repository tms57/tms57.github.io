/* code / functions for toolbox section */
let fromPrefix = '', toPrefix = '', physicsBaseUnit = '';
let inputError = 0;

// textbox event listener
let numberInput = document.getElementById('metricFrom');
numberInput.addEventListener('change', () => {
  document.getElementById('result').value = '';
}, false);

// button event listeners
let convertBtn = document.getElementById('convert');
convertBtn.addEventListener('click', metricToMetricConvert, false);

let clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', resetForm, false);

// radio button event listeners
let fromChoice = document.querySelectorAll('.From-Form .radio input');
for (let r = 0; r < fromChoice.length; r++) {
  fromChoice[r].addEventListener('click', function() {
    if (fromChoice[r].checked === true) {
      fromPrefix = fromChoice[r].nextElementSibling.innerHTML;
    }
  }, false);
}

let toChoice = document.querySelectorAll('.To-Form .radio input');
for (let r = 0; r < fromChoice.length; r++) {
  toChoice[r].addEventListener('click', function() {
    if (toChoice[r].checked === true) {
      toPrefix = toChoice[r].nextElementSibling.innerHTML;
    }
  }, false);
}

let physicsUnits = document.querySelectorAll('.physicsUnits .radio input');
for (let r = 0; r < physicsUnits.length; r++) {
  physicsUnits[r].addEventListener('click', function() {
    if (physicsUnits[r].checked === true) {
      physicsBaseUnit = physicsUnits[r].value;
    }
  }, false);
}

function metricToMetricConvert() {

  inputError = false;
  let numArray , result = '', decimalPlaces = 0;

  let n = document.getElementById('metricFrom').value;

  // check for valid text box number
	if (isNaN(n) || n.length === 0) {   // make textbox border red
      document.getElementById('metricFrom').style.border = "1px solid red";
      document.getElementById('metricFrom').value = '';
      inputError = true;
	} else {  // (numeric - make textbox border green
      if (n.indexOf('.') >= 0) {
        // if there is a decimal place
        numArray = n.split('.');
        decimalPlaces = numArray[1].length; // dec places from input box
        console.log(decimalPlaces);
      } else {
        decimalPlaces = 0;
      }
      n = parseFloat(n);
      document.getElementById('metricFrom').style.border = "1px solid green";
  }

  if (inputError === true) {
    return;
  }

	let fromVal = 1, toVal = 1, fromExp =0, toExp = 0;

  // get 'from' prefix
  for (let r = 0; r < fromChoice.length; r++) {
    if (fromChoice[r].checked === true) {
      fromExp = +fromChoice[r].value;
      fromVal = Math.pow(10, +fromChoice[r].value);
    }
  }

  // get 'to' prefix
  for (let r = 0; r < fromChoice.length; r++) {
    if (toChoice[r].checked === true) {
      toExp = +toChoice[r].value;
      toVal = Math.pow(10, +toChoice[r].value);
    }
  }

  result = n * fromVal / toVal;
  if (toExp > fromExp) {
    decimalPlaces += Math.abs(fromExp - toExp);
  }

	let conversionResult = `${n} ${fromPrefix}${physicsBaseUnit} = ${result.toFixed(decimalPlaces)} ${toPrefix}${physicsBaseUnit} `;

  document.getElementById('result').innerHTML =        conversionResult;
}

function resetForm() {

  fromPrefix = '';
  toPrefix = '';
  document.getElementById('metricFrom').value = '';
  document.getElementById('metricFrom').style.border = "1px solid #AAA";

  // clear 'from' prefix radio buttons
  for (let r = 0; r < fromChoice.length; r++) {
    fromChoice[r].checked = false;
  }

  // clear 'to' prefix radio buttons
  for (let r = 0; r < toChoice.length; r++) {
    if (toChoice[r].checked === true) {
      toChoice[r].checked = false;
    }
  }

  // clear 'physicsUnits' prefix radio buttons
  for (let r = 0; r < physicsUnits.length; r++) {
    physicsUnits[r].checked = false;
  }

  document.getElementById('metricToMetricResult').innerHTML = '\u00A0';
}


// regEx for metricFrom input box
// let regEx = '/^[0-9]*$/';
// let numberInput = document.getElementById('metricFrom');
// numberInput.addEventListener('keyup', (e) => {
//   validate(e.target, '/^[0-9]*$/');
// });

// //validation
// function validate(field, regEx) {
//   if (regEx.test(field.value)) {
//     field.className = "valid";
//   } else {
//     field.className = "invalid";
//   }
// }

