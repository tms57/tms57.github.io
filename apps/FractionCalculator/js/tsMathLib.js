// greatest common factor
function gcf(a, b) {
  let aFactors = [],
    bFactors = []
  a = parseInt(a)
  b = parseInt(b)
  let max = a < b ? b : a

  for (let i = 2; i <= max / 2; i++) {
    if (a % i === 0) {
      aFactors.push(i)
    }
    if (b % i === 0) {
      bFactors.push(i)
    }
  }

  // using shallow copy for shorter array
  let smallArray, largeArray
  if (aFactors.length < bFactors.length) {
    smallArray = aFactors
    largeArray = bFactors
  } else {
    largeArray = aFactors
    smallArray = bFactors
  }

  let gcf = 1
  for (let i = 0; i < smallArray.length; i++) {
    if (largeArray.includes(smallArray[i])) {
      gcf = smallArray[i]
    }
  }

  return gcf
}

// least common multiple
function lcm(num1, num2) {
  // Calculate the maximum number between the two inputs
  const max = Math.max(num1, num2)

  // Loop through multiples of the max number until we
  // find a common multiple with the other input
  let lcm = max
  while (lcm % num1 !== 0 || lcm % num2 !== 0) {
    lcm += max
  }

  // Return the LCM
  return lcm
}

function statsAverage(data) {
  console.log(data)
  return 100
}

// *** The regenerated ChapGPT algarithm above is easier to understand
// // Calculate the greatest common divisor (GCD) using the Euclidean algorithm
// // from ChapGPT!
// let a = num1
// let b = num2
// let temp
// while (b !== 0) {
//   temp = b
//   b = a % b
//   a = temp
// }
// const gcd = a

// // Calculate the least common multiple (LCM) using the formula: LCM(a, b) = (a * b) / GCD(a, b)
// const lcm = (num1 * num2) / gcd

// // Return the LCM
// return lcm

/*
  The average is technically all of the mean, median, and mode of a data set.
  the statsAverage function takes an array of numericl data
  and returns a stats object as follows:
    {
      mean: value,
      median: value,
      mode: value,
    }
*/
