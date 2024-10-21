export class Fraction {
  constructor(integer, numerator, denominator) {
    this.integer = integer
    this.numerator = numerator
    this.denominator = denominator

    // check for whole number with num & denom of 0
    if (this.integer !== 0 && this.numerator === 0 && this.denominator === 0) {
      this.numerator = this.integer
      this.integer = 0
      this.denominator = 1
    }
  }

  mixedToImproper() {
    /*
      fraction is an object in the form:
      { integer: (integer), numerator: (integer), denominator: (integer) }
    */
    // let { integer, numerator, denominator } = fraction

    let negative = false // need a flag for negative conversions
    let impFrac = new Fraction(0, 0, 0) // impFrac (improper fraction)
    impFrac.integer = 0

    if (this.integer < 0) {
      negative = true
      this.integer *= -1
    }

    impFrac.numerator =
      this.integer !== 0
        ? this.denominator * this.integer + this.numerator
        : (impFrac.numerator = this.numerator)

    impFrac.denominator = this.denominator

    if (negative) {
      impFrac.numerator *= -1
    }
    return impFrac
  }

  improperToMixed() {
    // let { numerator, denominator } = improperFraction
    let mixedFrac = new Fraction(0, 0, 0) // mixedFrac (mixed fraction)

    if (this.numerator < 0) {
      mixedFrac.integer = Math.ceil(this.numerator / this.denominator)
      mixedFrac.numerator = (this.numerator % this.denominator) * -1
    } else {
      mixedFrac.integer = Math.floor(this.numerator / this.denominator)
      mixedFrac.numerator = this.numerator % this.denominator
    }

    mixedFrac.denominator = this.denominator

    return mixedFrac
  }

  multiply(fraction) {
    let result = new Fraction(0, 0, 0)
    const f1 = this.mixedToImproper()
    const f2 = fraction.mixedToImproper()

    result.numerator = f1.numerator * f2.numerator
    result.denominator = f1.denominator * f2.denominator

    result.reduceFraction()
    return result
  }

  divide(fraction) {
    let result = new Fraction(0, 0, 0)
    const f1 = this.mixedToImproper()
    const f2 = fraction.mixedToImproper()

    result.numerator = Math.abs(f1.numerator * f2.denominator)
    // check signs since we cross multiplied
    if (
      (f1.numerator < 0 && f2.numerator > 0) ||
      (f1.numerator > 0 && f2.numerator < 0)
    ) {
      result.numerator *= -1
    }

    result.denominator = Math.abs(f1.denominator * f2.numerator)

    result.reduceFraction()
    return result
  }

  add(fraction) {
    let result = new Fraction(0, 0, 0)
    const f1 = this.mixedToImproper()
    const f2 = fraction.mixedToImproper()

    result.numerator =
      f1.numerator * f2.denominator + f2.numerator * f1.denominator
    result.denominator = f1.denominator * f2.denominator

    result.reduceFraction()
    return result
  }

  subtract(fraction) {
    let result = new Fraction(0, 0, 0)
    const f1 = this.mixedToImproper()
    const f2 = fraction.mixedToImproper()

    result.numerator =
      f1.numerator * f2.denominator - f2.numerator * f1.denominator
    result.denominator = f1.denominator * f2.denominator

    result.reduceFraction()
    return result
  }

  reduceFraction() {
    const largestCommonFactor = gcf(this.numerator, this.denominator)
    this.numerator /= largestCommonFactor
    this.denominator /= largestCommonFactor
  }
}

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
