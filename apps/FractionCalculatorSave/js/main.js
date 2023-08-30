// import { gcf } from './tsMathLib.js'
import { Fraction } from './fraction.js'

const inputs = document.querySelectorAll('input[type="number"]')
// clear result when any input detects a keystroke
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('keyup', (e) => {
    document.getElementById('answer').innerHTML = ''
  })
}

document.querySelector('.fraction1 .integer').focus()

const calc = document.getElementById('calc').addEventListener('click', (e) => {
  // get data from input boxes
  const inputs = document.querySelectorAll('input[type="number"]')
  const f1 = new Fraction(
    inputs[0].value * 1,
    inputs[1].value * 1,
    inputs[2].value * 1
  )
  const f2 = new Fraction(
    inputs[3].value * 1,
    inputs[4].value * 1,
    inputs[5].value * 1
  )

  let result

  switch (document.getElementById('operation').value) {
    case '+':
      result = f1.add(f2).improperToMixed()
      renderFraction(result)
      break
    case '-':
      result = f1.subtract(f2).improperToMixed()
      renderFraction(result)
      break
    case '*':
      result = f1.multiply(f2).improperToMixed()
      renderFraction(result)
      break
    case '/':
      result = f1.divide(f2).improperToMixed()
      renderFraction(result)
      // console.log(f1.divide(f2).improperToMixed())
      break
    default:
      console.log('ERROR')
  }
})

function renderFraction(result) {
  if (result.numerator === 0) {
    // integer answer only
    document.getElementById('answer').style.marginLeft = '0.75rem'
    document.getElementById(
      'answer'
    ).innerHTML = `<div class="centerXY" id="ansInteger">${result.integer}</div>`
  } else if (result.integer === 0 && result.numerator !== 0) {
    // fraction answer only
    document.getElementById('answer').style.marginLeft = '0.25rem'
    document.getElementById('answer').innerHTML = `
      <div class="centerXY" id="ansNumerator">${result.numerator}</div>
      <div class="fractionLine"></div>
      <div class="centerXY" id="ansDenominator">${result.denominator}</div>
    `
  } else {
    // we have a mixed fraction
    document.getElementById('answer').style.marginLeft = '0.75rem'
    document.getElementById('answer').innerHTML = `
      <div class="centerXY" id="ansInteger">${result.integer}</div>
      <div class="centerXY" id="ansNumerator">${result.numerator}</div>
      <div class="fractionLine"></div>
      <div class="centerXY" id="ansDenominator">${result.denominator}</div>
    `
  }
}
