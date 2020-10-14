const mainContainer = document.getElementById('main-container');
const equationField = document.getElementById('equation-field');
const solveButton = document.getElementById('solve-button');
const solutionDisplay = document.getElementById('solution-display');

function removeSpaces(workString) {
  let compactString = '';

  for (let i = 0; i < workString.length; i++) {
    if (workString[i] !== ' ') {
      compactString += workString[i];
    }
  }
  return compactString;
}

function equationToArray(equationString) {
  /*  10+2*3+4-9   or  10 + 3 * 2 + 4 / 10 */

  let numberString = '';
  let compactArray = [];

  for (let char = 0; char < equationString.length; char++) {
    if (
      (equationString.charCodeAt(char) > 47 &&
        equationString.charCodeAt(char) < 58) ||
      equationString.charCodeAt(char) === 46
    ) {
      numberString += equationString[char];
    } else if (
      equationString[char] === '+' ||
      equationString[char] === '-' ||
      equationString[char] === '*' ||
      equationString[char] === '/'
    ) {
      compactArray.push(+numberString);
      numberString = '';
      compactArray.push(equationString[char]);
    } else {
      console.log('Error: Invalid equation character.');
    }
  }
  compactArray.push(+numberString); // last number in string
  return compactArray;
}

function processUserEquation(equationArray) {
  // 80 / 2 * 5 + 25 / 5
  // 10 + 2 * 3 / 2 - 1 = 12

  let workArray = [...equationArray];
  let finished = false; // div or mult previously
  let index = 1;

  // find * or /, calculate, then use workArray.splice(1, 2, 'Feb');
  // *** make this logic a function & reuse for + and - ?
  // resolveExpressions(index, 'md', workArray);

  // resolve all multiplication & division instances
  while (index < workArray.length) {
    if (workArray[index] === '*' || workArray[index] === '/') {
      if (workArray[index] === '*') {
        workArray[index - 1] = workArray[index - 1] * workArray[index + 1];
      } else {
        workArray[index - 1] = workArray[index - 1] / workArray[index + 1];
      }
      workArray.splice(index, 2);
      index--;
    }
    index++;
  }

  // lastly resolve all addition & subtractions
  index = 1;
  while (index < workArray.length) {
    if (workArray[index] === '+' || workArray[index] === '-') {
      if (workArray[index] === '+') {
        workArray[index - 1] = workArray[index - 1] + workArray[index + 1];
      } else {
        workArray[index - 1] = workArray[index - 1] - workArray[index + 1];
      }
      workArray.splice(index, 2);
      index--;
    }
    index++;
  }
  // now the entire array is reduced to one element containing the overall solution!
  return workArray[0];
}

solveButton.addEventListener('click', function () {
  // Clears the solution contents on each click
  solutionDisplay.innerHTML = ``; // Write your code here 👇

  // trim & remove spaces
  let equationString = removeSpaces(equationField.value);

  let equationArray = equationToArray(equationString);

  // 80 + 5 * 16 / 9 - 1
  let solution = processUserEquation(equationArray);

  // Create a div in the DOM & give it a class
  let answerDiv = document.createElement('div');
  answerDiv.classList.add('equation-component');

  // build equation-component divs to show what the user entered
  let userEquation = '';

  for (let i = 0; i < equationArray.length; i++) {
    if (
      equationArray[i] === '+' ||
      equationArray[i] === '-' ||
      equationArray[i] === '*' ||
      equationArray[i] === '/'
    ) {
      userEquation += `<div class="operator">${equationArray[i]}</div>`;
    } else {
      userEquation += `<div>${equationArray[i]}</div>`;
    }
  }
  userEquation += `<div class="equals">=</div>`;
  userEquation += `<div>${solution}</div>`;
  answerDiv.innerHTML = userEquation;

  document.getElementById('solution-display').appendChild(answerDiv);
});

/*
Part 1 (Calculation):
    +Your first goal is to solve a simple text-based
        math problem entered in the input field
    +The problem can be add/sub/multiply/divide
    +Here are few examples:
        "3 + 3" -> 6
        "10 - 3" -> 7
        "44 / 2" -> 22
        "2 * 8" -> 16
    +When the 'Solve' button is clicked
        -Create a new div with the
            class 'equation-component'
            its text value should be the solution
            to the input equation
        -This element should be added as a child of
            the `solutionDisplay` div

    Note: You can assume there will always only be 2 values,
        both whole integers, and always a space between each
        integer and the operator as in the above examples


Part 2 (Flex Display):
    Then, you'll Flex your Flexbox skills!
    + Vertically stack the contents of the mainContainer
    + Center the content horizontally
    + Display all components of the equation
        in the solutionDisplay using a horizontal Flexbox
        with `space around` each component

Skills:
    Event Listeners, String Manipulation, Array Manipulation,
Arithmetic, DOM Manipulation, Flexbox



STRETCH GOALS:
    +Accept and solve more complex problems with more than 2 inputs
    +Signal the different types of components (operator/value/solution) with different colors
    +Accept strings without spaces
    +Can you improve the overall design?
*/
