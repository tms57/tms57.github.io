let number = '', sigFigs = [];

let sigFigBtn = document.getElementById('sigFigBtn');
let numberInput = document.getElementById('number');

// listeners
sigFigBtn.addEventListener('click', () => {
  doSigFigs();
});

numberInput.addEventListener('keyup', (e) => {
  if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      sigFigBtn.click();
  } else {
      document.getElementById('numOfSigFigs').innerHTML = '';
      document.getElementById('sigFigString').innerHTML = '&nbsp;';
  }
});

function doSigFigs() {

  let minSF = -1, maxSF = -1, decPosn = -1;
  sigFigs = [];
  number = numberInput.value;

  // check for input like 0.00..  or .00... ??

  // *** first process non-zero digits
  for (let i = 0; i < number.length; i++) {
   if (number[i] >= '1' && number[i] <= '9') {

    sigFigs.push(true);

    if (minSF < 0) {
      minSF = i;
    }

    if (maxSF < i) {
      maxSF = i;
    }

   } else {
      if (number[i] === '.') {
        decPosn = i;
      }

      sigFigs.push(false);
   }

  }

  // *** now process zero digits

  for (p = 0; p < sigFigs.length; p++) {
    if (sigFigs[p] === false && number[p] !== '.') {
      if (p < decPosn || decPosn < 0) {   // left of . or no dec in number
        if ( (p > minSF && p < decPosn) ||
        (p > minSF && p < maxSF) ) {
          sigFigs[p] = true;
        }
      } else {   // right of .  11002
          if (p > minSF) {
            sigFigs[p] = true
          }
      }
    }
  }

  sigFigsReport(number, sigFigs);
  return;

}

function sigFigsReport(number, sigFigs) {

  let report = '', digitColor = '';

  // get count of sig fig's
  let sum = 0;
  for (let i = 0; i < sigFigs.length; i++) {
    if (sigFigs[i] === true) {
      sum += 1;
    }
  }

  for (d = 0; d < sigFigs.length; d++) {
    digitColor = '';
    if (sigFigs[d] === true) {
      digitColor = ' class="red"';
    }
    report += `<span${digitColor}>${number[d]}</span>`;
  }

  document.getElementById('numOfSigFigs').innerHTML = sum;

  document.getElementById('sigFigString').innerHTML = report;

  // document.getElementById('numOfSigFigs').innerHTML = '';
  // document.getElementById('sigFigString').innerHTML = '';
}
